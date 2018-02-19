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

export const usesQuestion = (drugList) => {
    if(!drugList) {
        return;
    }
    const categoryData = getRandomCategory(drugList);
    if(!categoryData) {
        return;
    }
    const drug = getRandomDrug(categoryData);
    const drugName = drug["DRUG NAME"];
    const uses = drug['SPECIFIC USES'] || drug['SPECIFIC USES/FACTS'] || 'Uses is not listed in drug data';
    const categoryName = drug["CATEGORY"];

    return {
        displayAnswer: false,
        displayPrompt: true,
        displayQuestion: true,
        question: new Question(
            `What is the drug: "${drugName}" used for?`,
            `${uses}`,
            categoryData,
            drug,
            'Drug Uses'
        )
    }
}

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
    
    if(!drugList) {
        return new Question();
    }

    const adrIdx = uniqueAdrIndexByCategory(drugList);
    const adrCategory = getRandomCategory(adrIdx);
    if(!adrCategory) {
        return new Question();
    }
    const uniqueIdx = _.random(Object.keys(adrCategory).length - 1);
    const unique = adrCategory[Object.keys(adrCategory)[uniqueIdx]];
 

    const answerList = unique.restInCategory.map(r => r['DRUG NAME']);
    const answer = `Do Use: ${answerList ? answerList.join(',') : ''}\nDo NOT USE: ${unique.uniqueAdrDrug['DRUG NAME']}`;
    let question = new Question(
        `Patient wants to go on a drug in the ${unique.uniqueAdrDrug.CATEGORY} category but is worried about adverse drug effects such as: ${Object.keys(adrCategory)[uniqueIdx]}. Which drug from this category would you perscribe to avoid these?`,
        answer,
        adrCategory,
        {},
        'ADRs'
    )

    return {
        displayAnswer: false,
        displayPrompt: true,
        displayQuestion: true,
        question: question
    };

}

// Indexes the active drug list by individual split adr. 
// Then takes lists where only one drug has a particular ADR
// indexes by category and sends back to question generator
const uniqueAdrIndexByCategory = (drugList) => {
    // get all ADRs
    const drugListByDrug = (drugList) => (
        Object.values(drugList).reduce((prev, category) => {
            return prev.concat(...Object.values(category));
        }, [])
    )

    const splitAdrs = (str) => {
        if (!str) { return []; }
        const splitAdrs = str.replace(/\n/g, "").split(',');
        return Array.isArray(splitAdrs) ? splitAdrs : [splitAdrs];
    }

    // Returns list of all ADRs 
    const drugsByAdr = (drugList) => {
        return drugListByDrug(drugList).reduce((prev, drug) => {
            splitAdrs(drug.ADRS).forEach(adr => {
                if (!prev[adr]) {            // Haven't seen the adr yet.
                    prev[adr] = [drug];     // Keep an array of drugs for the given adr
                } else if (prev[adr].indexOf(drug) < 0) {
                    prev[adr].push(drug);
                }
            })
            return prev;
        }, {});
    }

    const adrs = drugsByAdr(drugList);

    const exists = obj => !_.isNull(obj) && !_.isUndefined(obj);
    // This needs to be a reduce because we need to preserve the actual name of the ADR.
    const singleDrugAdrs = Object.keys(adrs).reduce((memo, val) => {
        if (adrs[val] && adrs[val].length == 1) {
            memo[val] = adrs[val];
        }
        return memo;
    }, {});


    // BUILD INDEX
    const adrIdx = Object.keys(singleDrugAdrs).reduce((memo, key) => {
        const adr = singleDrugAdrs[key][0];
        const category = drugList[adr.CATEGORY] || {};
        const restInCategory = Object.values(category).filter(drug => {
            return drug['DRUG NAME'] != adr['DRUG NAME'] && exists(drug.ADRS);
        });

        if (restInCategory.length) {
            if (memo[adr.CATEGORY]) {
                memo[adr.CATEGORY][key] = {
                    uniqueAdrDrug: adr,
                    restInCategory
                };
            }
            else {
                memo[adr.CATEGORY] = {
                    [key]: {
                        uniqueAdrDrug: adr,
                        restInCategory
                    }
                }

            }
        }
        return memo;
    }, {})

    return adrIdx;
}