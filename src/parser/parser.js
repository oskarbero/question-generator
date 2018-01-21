const fs = require('fs');
// const log4js = require('log4js');
// const initLogger = require('./logger');
const omitBy = require('lodash').omitBy;
const existsSync = require('fs').existsSync;
const convertExcel = require('excel-as-json').processFile;
const getResourcePath = require('./util').getResourcePath;

// const logger = initLogger();

const tryGetBookFile = (fileName) => {
    const path = 'D:\\dev\\question-generator\\resources\\Pharm drug chart.xlsx.json';
    const bookData = fs.readFileSync(path);
      return JSON.parse(bookData);
}

const processSheet = (result) => {
    let categoryRoot,
        subCategoryRoot;
    const workbook = {};

    // TODO: Strip category and subcategory
    const stripNA = (row) => {
        const shouldSkip = val =>
            (val && val.length && val.trim().toLowerCase() === 'n/a');
        return omitBy(row, shouldSkip)
    }; 

    const isValidRow = (row) => {
        // logger.error(`Row category is 'n/a': ${row}`);
        return row && row.CATEGORY !== 'n/a' && !row['n/a'];
    }; 
 
    const isCategoryHeader = (row) => (isValidRow(row) && row.CATEGORY && row.CATEGORY.length);

    const hasSubcategory = (row) =>
        (row.CATEGORY && (row.SUBCATEGORY || row['SUB-CATEGORY']));

    result.forEach((row) => {
        if(!isValidRow(row)) {
            return;
        }

        if(isCategoryHeader(row)) {
            categoryRoot = row;
            workbook[row.CATEGORY] = [stripNA(row)];
        } 
        else if (categoryRoot) {
            const adjustedRow = Object.assign({}, categoryRoot, row);
            workbook[categoryRoot.CATEGORY].push(stripNA(adjustedRow));
        }
    });

    return workbook;
}

// TODO: Use promises not callbacks
/**
 * Processes an excel workbook by column. 
 * @param {function} done callback for when all excell sheets are processed
 */
const processBook = (done, fileName) => {
    const NUM_SHEETS = 39;
    const file = fileName || 'Pharm drug chart.xlsx';
    const filePath = getResourcePath(file);

    let drugs = {};
    let counter = NUM_SHEETS;

    const resultHandler = (err, result) => { 
        if(result) {
            Object.assign(drugs,  processSheet(result));
        }
        else if (err) {
            // logger.error(`Error while parsing ${err}`);
        }

        if(--counter == 0) {
            if(!fs.existsSync(filePath)) {
                fs.writeFileSync(getResourcePath(`parsed${file}.json`), JSON.stringify(drugs));
            }
            done(drugs);
        }
    };

    for (var idx = 0; idx < NUM_SHEETS; idx++) {
        const options = {
            sheet: idx,
            omitEmptyFields: true
        };
        try {
            if(fs.existsSync(filePath)) {
                convertExcel(filePath, null, options, resultHandler);
            }
            else {
                // logger.debug('Path does not exist: ', filePath);
                counter--;
            }
        }
        catch(ex) {
            console.log(ex);
        }
    };
};

module.exports = {
    processBook,
    processSheet,
    tryGetBookFile
};
