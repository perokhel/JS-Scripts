import lcmAndHcf, { getGCD } from "./lcmhcf.mjs";

// All the amounts are in cents
let initialBalance = -115;
let cardDepositMultiple = 100;
let coinDepositMultiple = 10;
let targetBalance = 0;
let recommendedDeposit = 0;
let zone1Fare = 265;

calculateDeposit();

function calculateDeposit() {
  let totalDeposit = 0;
  let currentBalance = initialBalance;
  for (let i = 0; i < 1000; i++) {
    if (currentBalance % zone1Fare == 0) break;
    totalDeposit += coinDepositMultiple;
    currentBalance += coinDepositMultiple;
  }
  console.log(totalDeposit);
}
