const processBook = require('../src/parser').processBook;
const getResourcePath = require('./util').getResourcePath;
const fs = require('fs');
const _ = require('lodash');
const initLogger = require('./logger');
const logger = initLogger();

function Question(question, answer, rawData, answerData) {
    this.question = question || "";
    this.answer = answer || "";
    this.fullData = rawData || {};
    this.answerData = answerData || {};
}

/**
 * Gets a random category with at least N drugs 
 * @param {Object} drugData drug data
 * @param {number} n min num drugs
 */
const getRandomCategory = (drugData, n) => {
    const categoryNames = _.keys(drugData);
    const numDrugs = n || 5;

    if(!categoryNames) {
        logger.error('No categories present in drug list');
        return;
    }

    const categories = _.filter(_.values(drugData), cat => {
        if(cat && cat.length >= numDrugs) {
            return true;
        }
        return false;
    });
    return categories[_.random(0, categories.length)];
}

// Generates a question from a drugList asking what category is a drug in
const whatCategoryIsThisDrug = (categoryData) => { 
    const drug = categoryData[_.random(0, categoryData.length)] || {};
    const drugName = drug["DRUG NAME"];
    const category = drug["CATEGORY"];

    if(!drugName || !category) {
        logger.error(`${JSON.stringify(drug,null,2)} does not seem to have a name?`);
        return null;
    } 

    return new Question(
        `What category does the drug "${drugName}" belong to?`,
        `Answer: ${category}`,
        categoryData,
        drug
    );
};

const tryGetBookFile = (bookCb,fileName) => {
    const path = 'C:\\dev\\repositories\\examples\\generate_quizlet\\resources\\parsedPharm drug chart.xlsx.json';

    if(fs.existsSync(path)){
        const bookData = fs.readFileSync(path);
        bookCb(JSON.parse(bookData));
    } else {
        processBook(bookCb);
    }
}

const generateQuestion = () => {

    const bookCb = (drugList) => {
        // Find category with 5 drugs
        const category = getRandomCategory(drugList);                
        const q = whatCategoryIsThisDrug(category);
        console.log(q.question);
        console.log(q.answer);
    }


    tryGetBookFile(bookCb, 'Pharm drug chart.xslx');
}


const questionScripts = {

}




generateQuestion();