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

const getRandomDrug = category => (category[_.random(0, category)] || {});

// We assume that drugList is already filtered according to settings when passed in.
export const categoryQuestion = (drugList) => {
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
            drug,
            'Drug Category'
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