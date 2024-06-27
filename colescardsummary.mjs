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

  const pendingTransactions = getPendingTransactions();

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

function getPendingTransactions() {
  const dataRows = Array.from(
    document.querySelectorAll(".custom-data-grid-row-identifier")
  );

  return dataRows.map((row) => {
    const rowCells = row.querySelectorAll(".cbol-grid-cell");
    const transactionObj = {};
    transactionObj.date = rowCells[0].innerText;
    transactionObj.description = rowCells[1].innerText;
    transactionObj.amount = extractNumber(rowCells[2].innerText);
    return transactionObj;
  });
}

function getTransactions() {
  let transactions, transactionsArray, transMap;
  transactions = document.querySelectorAll(".custom-data-grid-row-identifier");
  transactionsArray = Array.from(transactions);
  transMap = transactionsArray.map((trans) => {
    let dataPivot = trans.attributes["data-pivot"].value;
    let date = trans.querySelector(".ui-float-left").innerText;
    let description = trans.querySelector(".cbol-trans-desc").innerText;
    let amount = trans.querySelector(".format-amount-holder").innerText;
    return { dataPivot, date, description, amount };
  });

  return transMap;
}

async function sendData(transactions) {
  let apiUrl = "http://localhost:3100/api";
  let apiUrlCyclic = "https://gardenia.cyclic.app/api";
  let postOptions = {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(transactions), // body data type must match "Content-Type" header
  };
  let res = await fetch(apiUrl, postOptions);
  let jsonData = await res.json();
  console.log(jsonData);
}

function getTransactionsTotal(transactions) {
  return transactions.reduce(
    (sum, transaction) =>
      extractNumber(transaction.amount) < 0
        ? sum + extractNumber(transaction.amount)
        : sum,
    0
  );
}

function extractNumber(str) {
  const sanitizedStr = str.replace(/[^\d\-\.]/g, "");
  const number = parseFloat(sanitizedStr);
  return number;
}
