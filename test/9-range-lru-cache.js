"use strict";

const XLSX_CALC = require("../src");
const assert = require('assert');
const XLSX = require("xlsx");

describe('LRU caching for Range', () => {
    it('should take advantage of cache when looking up ranges', () => {
        const workbook = XLSX.readFile('test/vlookup_large_range.xlsx');
        const t0 = performance.now();
        XLSX_CALC(workbook);
        const t1 = performance.now();
        const time = t1-t0;

        console.log(time)
    });
})
