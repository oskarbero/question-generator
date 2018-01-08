const { assert } = require('chai');
const { processSheet, getSheets } = require('../src/parser');

describe('parser test', () => {

    const buildWorkbook = (num) => {
        const workbook = [];
        for (i = 0; i < num; i++) {
            const sheet = {};
            sheet["DRUG NAME"] = `drug #${i}`;
            workbook.push(sheet);
        };

        return workbook;
    }

    it('Should return a full category with all common fields populated, and unique fields intact', () => {
        const workbook = buildWorkbook(5);
        workbook[0]["CATEGORY"] = "Category #1";
        workbook[0]["ADR's"] = "some adrs";
        workbook[0]["ACTIONS"] = "actions!";

        const result = processSheet(workbook);

        assert.exists(result['Category #1']);
        const root = result['Category #1'];
        for (i = 0; i < 5; i++) {
            assert.deepEqual(root[i]["DRUG NAME"], `drug #${i}`);
            assert.deepEqual(root[i]["ADR's"], "some adrs");
            assert.deepEqual(root[i]["CATEGORY"], "Category #1");
            assert.deepEqual(root[i]["ACTIONS"], 'actions!');
        };

    });

    it('Should return 2 categories with all common fields populated, and unique fields intact', () => {
        const workbook = buildWorkbook(5);
        workbook[0]["CATEGORY"] = "#1 Category #1";
        workbook[0]["ADR's"] = "adrs 1";
        workbook[0]["ACTIONS"] = "actions 1";

        const workbook2 = buildWorkbook(5);
        workbook2[0]["CATEGORY"] = "#2 Category #2";
        // workbook2[0]["ADR's"] = "adrs 2";
        workbook2[0]["ACTIONS"] = "actions 2";

        const result = processSheet(workbook.concat(workbook2));

        assert.exists(result['#1 Category #1']);
        const r1 = result['#1 Category #1'];

        assert.exists(result['#2 Category #2']);
        const r2 = result['#2 Category #2'];
        for (i = 0; i < 5; i++) {
            assert.deepEqual(r1[i]["DRUG NAME"], `drug #${i}`);
            assert.deepEqual(r1[i]["ADR's"], `adrs 1`);
            assert.deepEqual(r1[i]["ACTIONS"], 'actions 1');

            assert.deepEqual(r2[i]["DRUG NAME"], `drug #${i}`);
            assert.deepEqual(r2[i]["ADR's"], undefined);
            assert.deepEqual(r2[i]["ACTIONS"], 'actions 2');
        };
    });

});