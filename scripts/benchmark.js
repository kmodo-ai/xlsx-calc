const XLSX = require('xlsx')
const XLSX_CALC = require("../src");
const fs = require('fs');
const formulajs = require('@formulajs/formulajs');
const cliProgress = require('cli-progress');

const bar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);


XLSX_CALC.import_functions(
    {
        ...formulajs,
        TEXTSPLIT: (value, col_del, row_del) => {
            return typeof value === 'string' && typeof row_del === 'string'
                ? value.split(row_del)
                : new Error('#VALUE!');
        },
        VALUE: (text) => {
            // The VALUE function casts empty string to 0: https://github.com/formulajs/formulajs/blob/master/src/text.js#L742
            return text === '' ? '' : formulajs.VALUE(text);
        },
    },
    { override: true },
);


const file = fs.readFileSync(`${__dirname}/custom_term_pricing.xlsx`);
const wb = XLSX.read(file);

const times = []
const n = 1;

bar.start(n, 0);
for (let i = 0; i < n; i++) {
    const t0 = performance.now();
    XLSX_CALC(wb, { continue_after_error: true });
    const t1 = performance.now();
    const previous = t1-t0;
    times.push(previous)
    bar.increment();
}

bar.stop();

const average = (times.reduce((sum, t) => sum +t, 0))/n;
console.log(`\n\nAverage time for ${n} executions: ${average}`)
