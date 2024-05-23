// Calculates the compound annual growth rate or CAGR

let endingValue = 700000;
let beginningValue = 235000;
let numberOfYears = 19;

let cagr = ((endingValue / beginningValue) ** (1 / numberOfYears) - 1) * 100;

console.log(cagr);
