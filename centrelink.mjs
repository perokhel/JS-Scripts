let paymentsReceived;

function getPaymentTransactions() {
	const dataRows = [
		...document.querySelectorAll("tr.dhs-table-accordion-title"),
	];

	return dataRows.map((row) => {
		const cells = row.cells;
		return {
			date: cells[1].innerText,
			description: cells[0].innerText,
			amount: cells[2].innerText,
		};
	});
}

function getPaymentsTotal(payments) {
	return payments.reduce(
		(sum, payment) => sum + extractNumber(payment.amount),
		0
	);
}

function extractNumber(str) {
	const sanitizedStr = str.replace(/[^\d\-\.]/g, "");
	const number = parseFloat(sanitizedStr);
	return number;
}

function mergeTransactions(arr1, arr2) {
	const uniqueTransactions = new Map();

	const addTransaction = (transaction) => {
		const key = `${transaction.amount}-${transaction.date}`;
		if (!uniqueTransactions.has(key)) {
			uniqueTransactions.set(key, transaction);
		}
	};

	arr1.forEach(addTransaction);
	arr2.forEach(addTransaction);

	return Array.from(uniqueTransactions.values());
}
