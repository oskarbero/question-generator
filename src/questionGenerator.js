import * as _ from 'lodash';

// TODO: Change the whole thing to a class. 
// add constructor that initializes the drug list.
// Maybe this will go to a container object ? 
class Question {
    constructor(question, answer, rawData, answerData) {
        this.question = question || "";
        this.answer = answer || "";
        this.fullData = rawData || {};
        this.answerData = answerData || {};
    }
}

const getRandomCategory = (drugList) => { 
    const numDrugCategories = Object.keys(drugList).length;
    const categoryIdx = _.random(0, numDrugCategories - 1);
    const categoryName = Object.keys(drugList)[categoryIdx];
    return drugList[categoryName];
}

const getRandomDrug = category => (category[_.random(0, category)] || {});

// We assume that drugList is already filtered according to settings when passed in.
export const randomCategoryQuestion = (drugList) => {
    const categoryData = getRandomCategory(drugList);
    const drug = getRandomDrug(categoryData);
    const drugName = drug["DRUG NAME"];
    const categoryName = drug["CATEGORY"];

    if (!drugName || !categoryName) {
        return null;
    }

    return {
        displayAnswer: false,
        displayQuestion: true,
        prompt: new Question(
            `What category does the drug "${drugName}" belong to?`,
            `${categoryName}`,
            categoryData,
            drug
        )
    }
}


export const ADRQuestion = drugList => {
    // Go through list of adrs for a category 
    // see if they are not all the same
    // pick the drugs that differ
    // ask which drug would you switch patient to
    // if he/she experienced the unique ADR
    // List options without that ADR 

    // BONUS: add rating ^ v for questions that were good / bad ...
    // potential for machine learning ?? 

    const categoryData = getRandomCategory(drugList);

    
    const getUniqueSideEffects /* no thanks */ = (category) => {
        const unique = _.uniqBy(category, "ADR's");
        console.log(unique);
    }
    getUniqueSideEffects(categoryData);

    // 1. get random category 
    // 2. go through drugs 
    //      - look at ADR 
    //      - find unique ADR entry 
    //      - will have to split by ',' and strip out '\n'
    // 3. Question format:
    //      `Patient wants to go on ${category} to ${MOA} but is worried about ${SIDE EFFECT}.
    //       Which ${drug || subcategory} would you perscribe.
    //


    const a = categoryData.map(c => c.ADRS);
    
}