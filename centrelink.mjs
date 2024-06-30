const dataRows = [...document.querySelectorAll("tr.dhs-table-accordion-title")];

const paymentsReceived = dataRows.map((row) => {
	const cells = row.cells;
	return {
		date: cells[1].innerText,
		description: cells[0].innerText,
		amount: cells[2].innerText,
	};
});

let totalAmount = paymentsReceived.reduce(
	(sum, payment) => sum + extractNumber(payment.amount),
	0
);

function extractNumber(str) {
	const sanitizedStr = str.replace(/[^\d\-\.]/g, "");
	const number = parseFloat(sanitizedStr);
	return number;
}
