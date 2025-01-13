const cssToInject =
	".control {border: 2px solid black; border-radius: 5px;background-color: #f3f3f1;border-color: #2196f3;color: dodgerblue;padding: 14px 28px;font-size: 16px;}.control:hover {background: #2196f3;color: white;}";

(function initialize() {
	createUI();
})();

function createUI() {
	createControlPanel();
	injectCSS(cssToInject);

	function createControlPanel() {
		const controlPanel = document.createElement("nav");
		styleNavbar(controlPanel);
		createButton("Send Transactions", controlPanel, sendTransactions);
		createButton("print summary", controlPanel, printSummary);
		createButton("print Transactions", controlPanel, printTransactions);
		createButton("transactions Total", controlPanel, transactionsTotal);
		document.body.prepend(controlPanel);
	}

	function createButton(label, parent, evListener) {
		let btn = document.createElement("button");
		btn.innerHTML = label;
		btn.addEventListener("click", evListener);
		styleButton(btn);
		parent.appendChild(btn);
	}

	function styleNavbar(navBar) {
		navBar.style.display = "flex";
		navBar.classList.add("control-bar");
	}

	function styleButton(btn) {
		btn.classList.add("control");
		btn.style.float = "left";
		btn.style.display = "inline";
	}
}

function injectCSS(css) {
	let el = document.createElement("style");
	el.type = "text/css";
	el.innerText = css;
	document.body.appendChild(el);
	return el;
}

function sendTransactions() {
	const cardHolder = getCardHolderName();
	const transactions = getTransactions();
	console.info(`Sending transactions for ${cardHolder}`);
	console.info(transactions);
	sendData(cardHolder, transactions);
}

function printSummary() {
	console.info(getColesFinancialSummary());
}

function printTransactions() {
	console.info(getTransactions());
}

function transactionsTotal() {
	const transactions = getPendingTransactions();
	const total = transactions.reduce(
		(sum, transaction) => sum + transaction.amount,
		0
	);
	console.info(`Sum of all transactions is: ${total}`);
}

async function sendData(username, transactions) {
	let apiUrl = "http://localhost:3100/api";
	let postOptions = {
		method: "POST", // *GET, POST, PUT, DELETE, etc.
		cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
		headers: {
			"Content-Type": "application/json",
			// 'Content-Type': 'application/x-www-form-urlencoded',
		},
		redirect: "follow", // manual, *follow, error
		referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
		body: JSON.stringify({ username, transactions }), // body data type must match "Content-Type" header
	};

	try {
		let response = await fetch(apiUrl, postOptions);
		if (!response.ok) {
			throw new Error(`Response status: ${response.status}`);
		}
		let serverMessage = await response.json();
		console.info(serverMessage);
	} catch (error) {
		console.info(error.message);
	}
}

function getCardHolderName() {
	const msgPanel = document.querySelector(".action-msg-panel");
	const cardHolderName = msgPanel.querySelector("a").innerText;
	return cardHolderName;
}

function getColesFinancialSummary() {
	const availableCreditField = document.getElementById(
		"availCreditLimitBalanceDetail"
	);
	const creditLimitField = document.getElementById(
		"creditLimitBalanceDetail"
	);
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
	transactions = document.querySelectorAll(
		".custom-data-grid-row-identifier"
	);
	transactionsArray = Array.from(transactions);
	transMap = transactionsArray.map((trans) => {
		let dataPivot = trans.attributes["data-pivot"].value;
		let date = trans.querySelector(".ui-float-left").innerText;
		let description = trans.querySelector(".cbol-trans-desc").innerText;
		let amount = extractNumber(
			trans.querySelector(".format-amount-holder").innerText
		);
		return { dataPivot, date, description, amount };
	});

	return transMap;
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
	if (!(typeof str === "string")) return str;
	const sanitizedStr = str.replace(/[^\d\-\.]/g, "");
	const number = parseFloat(sanitizedStr);
	return number;
}

function mergeTransactions(existingTransactions, newTransactions) {
	// Create a Set to efficiently check for duplicate dataPivot values
	const dataPivotSet = new Set(
		existingTransactions.map((obj) => obj.dataPivot)
	);

	// Filter the newTransactions to include only objects with unique dataPivot values
	const uniqueNewTransactions = newTransactions.filter(
		(obj) => !dataPivotSet.has(obj.dataPivot)
	);

	// Add the unique new transactions to the existing transactions
	return [...existingTransactions, ...uniqueNewTransactions];
}
