const fs = require('fs');
const log4js = require('log4js');
const initLogger = require('./logger');
const omitBy = require('lodash').omitBy;
const existsSync = require('fs').existsSync;
const convertExcel = require('excel-as-json').processFile;
const getResourcePath = require('./util').getResourcePath;

const logger = initLogger();

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
        logger.error(`Row category is 'n/a': ${row}`);
        return row && row.CATEGORY !== 'n/a' && !row['n/a'];
    }; 
 
    const isCategoryHeader = (row) => (isValidRow(row) && row.CATEGORY && row.CATEGORY.length);

    const hasSubcategory = (row) =>
        (hasCatgeory(row) && (row.SUBCATEGORY || row['SUB-CATEGORY']));

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
            logger.error(`Error while parsing ${err}`);
        }

        if(--counter == 0) {
            if(!fs.existsSync(filePath)) {
                fs.writeFileSync(getResourcePath(`parsed${file}.json`), JSON.stringify(drugs));
            }
            done(drugs);
        }
    };

    for (idx = 0; idx < NUM_SHEETS; idx++) {
        const options = {
            sheet: idx,
            omitEmptyFields: true
        };
        try {
            if(fs.existsSync(filePath)) {
                convertExcel(filePath, null, options, resultHandler);
            }
            else {
                logger.debug('Path does not exist: ', filePath);
                counter--;
            }
        }
        catch(ex) {
            console.log(ex);
        }
    };
};

// processBook((result) => {
//     console.log('result ' + JSON.stringify(result, null, 2));
//     console.log('finished');
// });

module.exports = {
    processBook,
    processSheet
};

//region

// const buildWorkbook = (num) => {
//     const workbook = [];
//     for(i = 0; i < num; i++) {
//         const sheet = {};
//         sheet["DRUG NAME"] = `drug #${i}`;
//         workbook.push(sheet);
//     };
    
//     return workbook;
// }
// const buildSheet = (category,  subcategory) => {
//     const sheet = {
//         "CATEGORY": "",
//         "DRUG NAME": "",
//         "SPECIFIC USES/FACTS": "",
//         "ACTIONS": "",
//         "ADR's": "" 
//     };

//     if(subcategory) {
//         sheet["SUBCATEGORY"] = "";
//     }
    
//     return sheet;
// }
// const test = () => {
//     const workbook = [];
//     for(i = 0; i < 5; i++) {
//         const sheet = buildSheet()
//         sheet["DRUG NAME"] = `drug #${i}`;
//         workbook.push(sheet);
//     };
    
//     workbook[0]["CATEGORY"] = "Category #1";
//     workbook[0]["DRUG NAME"] = "some name";
//     workbook[0]["ADR's"] = "some adrs";
//     workbook[0]["ACTIONS"] = "actions!";

//     const result = processSheet(workbook);

//     console.log('result: ', JSON.stringify(result, null, 2));
// }
// const test2 =  () => {
//     const workbook = buildWorkbook(5);        
//     workbook[0]["CATEGORY"] = "#1 Category #1";
//     workbook[0]["ADR's"] = "adrs 1";
//     workbook[0]["ACTIONS"] = "actions 1";

//     const workbook2 = buildWorkbook(5);        
//     workbook2[0]["CATEGORY"] = "#2 Category #2";
//     workbook2[0]["ADR's"] = "adrs 2";
//     workbook2[0]["ACTIONS"] = "actions 2";

//     const result = processSheet(workbook.concat(workbook2));

//     const root1 = result['#1 Category #1'];
//     const root2 = result['#2 Category #1'];
// };
// // test2();
// // test();

//endregion
