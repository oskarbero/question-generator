import * as _ from 'lodash';

// TODO: Change the whole thing to a class. 
// add constructor that initializes the drug list.
// Maybe this will go to a container object ? 
class Question {
    constructor(question, answer, rawData, answerData, type) {
        this.question = question || "";
        this.answer = answer || "";
        this.fullData = rawData || {};
        this.answerData = answerData || {};
        this.type = type || '';
    }
}

const getRandomCategory = (drugList) => {
    const numDrugCategories = Object.keys(drugList).length;
    const categoryIdx = _.random(0, numDrugCategories - 1);
    const categoryName = Object.keys(drugList)[categoryIdx];
    return drugList[categoryName];
}

const getRandomDrug = category => {
    if(!category) {
        return {}
    }
    const idx = _.random(category.length - 1);
    return category[idx] || {}
};

// We assume that drugList is already filtered according to settings when passed in.
export const categoryQuestion = (drugList, lastQuestionInfo) => {
    if(!drugList) {
        return;
    }
    const categoryData = getRandomCategory(drugList);
    if(!categoryData) {
        return;
    }
    const drug = getRandomDrug(categoryData);
    const drugName = drug["DRUG NAME"];
    const categoryName = drug["CATEGORY"];

    return {
        displayAnswer: false,
        displayPrompt: true,
        displayQuestion: true,
        question: new Question(
            `What category does the drug "${drugName}" belong to?`,
            `${categoryName}`,
            categoryData,
            drug,
            'CATEGORY'
        )
    }
}

export const adrQuestion = drugList => {
    // const specialMap = {
    //     '↓': 'lower'
    // };
    const categoryData = getRandomCategory(drugList);

    const getUniqueSideEffects /* no thanks */ = (category) => {
        const drugs = category.map(drug => {
            const sideEffects = drug["ADRS"] ? (drug.ADRS.replace(/\n/g, "")).split(',') : [];
            return {
                drug,
                sideEffects
            };
        }
        );
        console.log(drugs.map(d => d.sideEffects));
        // const unique = _.uniqBy(category, "ADRs");

    }

    getUniqueSideEffects(categoryData);

    return {
        displayAnswer: false,
        displayQuestion: true,
        displayPrompt: true,
        questionType: 'ADR',        // TODO: switch to using QUESTION_TYPE from ./actions
        prompt: new Question(
            `ADR question..`,
            `Type not implemented yet`,
            categoryData,
            {},
            'ADRs'
        )
    }
    // 1. get random category 
    // 2. go through drugs 
    //      - look at ADR 
    //      - find unique ADR entry 
    //      - will have to split by ',' and strip out '\n'
    // 3. Question format:
    //      `Patient wants to go on ${category} to ${MOA} but is worried about ${SIDE EFFECT}.
    //       Which ${drug || subcategory} would you perscribe.
    //
}