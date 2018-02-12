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

// FAR FAR FAR from done.
export const adrQuestion = drugList => {
    
    if(!drugList || drugList) {
        return new Question();
    }

    const category = getRandomCategory(drugList);
    const splitAdrs = (str) => {
        if(!str) {
            return [];
        }
        const splitAdrs = str.replace(/\n/g, "").split(',');
        return Array.isArray(splitAdrs) ? splitAdrs : [splitAdrs];
    }

    const sideEffects = {};
    category.forEach(drug => {
         splitAdrs(drug.ADRS).forEach(adr => {
            if(!sideEffects[adr]) {
                sideEffects[adr] = [drug];
            }
            else {
                sideEffects[adr].push(drug);
            }
        })
        return drug;
    });

    const values = Object.values(sideEffects)
    let maxLen = values.reduce((prev, cur) => (cur.length > prev ? cur.length : prev), 0);
    let minLen = values.reduce((prev, cur) => (cur.length <= prev ? cur.length : prev), 0);
    
    const hasUnique = maxLen != minLen;
    let unique;
    let idx = 0;
    if(hasUnique) {
        // Unique side effect + drugs in there
        unique = _.find(values, (el) => {
            if(el.length === minLen) { 
                return el;
            }
            idx += 1;
        });
        if(unique.length) {
            console.log('multiple drugs have these side effects')
        }
    }

    unique = unique[_.random(unique.length-1)];

    const remainingDrugs = Object.values(category).reduce((prev, drug) => {
        const name = drug['DRUG NAME'];
        if(name !== unique['DRUG NAME'] && !(name in prev)) {
            prev.push(name);
        }
        return prev;
    }, [])

    let question = new Question(
        `Patient wants to go on a drug in the ${unique.CATEGORY} category but is worried about adverse drug effects such as: ${unique.ADRS}. Which drug from this category would you perscribe to avoid these?`,
        `${remainingDrugs}`,
        category,
        {},
        'ADRs'
    )

    return {
        displayAnswer: false,
        displayPrompt: true,
        displayQuestion: true,
        question: question
    };

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