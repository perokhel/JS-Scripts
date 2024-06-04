function getColesFinancialSummary() {
  const availableCreditField = document.getElementById(
    "availCreditLimitBalanceDetail"
  );
  const creditLimitField = document.getElementById("creditLimitBalanceDetail");
  const cardBalanceField = document.getElementById("cardBalanceLink");
  const installmentBalanceField = document
    .getElementById("totalRemainingBalance")
    .querySelector(".header-field-value");

  const availableCredit = extractNumber(availableCreditField.innerText);
  const creditLimit = extractNumber(creditLimitField.innerText);
  const cardBalance = extractNumber(cardBalanceField.innerText);
  const installmentBalance = installmentBalanceField
    ? extractNumber(installmentBalanceField.innerText)
    : 0;

  const dataRows = Array.from(
    document.querySelectorAll(".custom-data-grid-row-identifier")
  );

  const pendingTransactions = dataRows.map((row) => {
    const rowCells = row.querySelectorAll(".cbol-grid-cell");
    const transactionObj = {};
    transactionObj.date = rowCells[0].innerText;
    transactionObj.description = rowCells[1].innerText;
    transactionObj.amount = extractNumber(rowCells[2].innerText);
    return transactionObj;
  });

  const pendingTransactionsTotal = pendingTransactions.reduce(
    (sum, transaction) => sum + transaction.amount,
    0
  );

  const reconciliationTotal =
    cardBalance +
    availableCredit +
    installmentBalance -
    pendingTransactionsTotal;

  return {
    creditLimit,
    cardBalance,
    availableCredit,
    installmentBalance,
    pendingTransactionsTotal,
    reconciliationTotal,
  };
}

function extractNumber(str) {
  const sanitizedStr = str.replace(/[^\d\-\.]/g, "");
  const number = parseFloat(sanitizedStr);
  return number;
}
