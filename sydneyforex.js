(function getForexRates() {
	let dataTable = document.getElementById("ctl00_CPHBody_Frate1_gvRateHistory");
	let recordsArray = Array.from(dataTable.rows);
	let recordObjects = recordsArray.map((record) => {
		return {
			timestamp: record.cells[0].innerHTML,
			country: record.cells[1].innerHTML,
			currency: record.cells[2].innerHTML,
			code: record.cells[3].innerHTML,
			accDeposit: record.cells[4].innerHTML,
			cashMeezan: record.cells[5].innerHTML,
			cashUBL: record.cells[6].innerHTML,
		};
	});
	console.log(recordObjects);
})();
