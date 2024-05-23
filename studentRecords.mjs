(function getStudentRecords() {
  let tableDiv = document.querySelector("div.a3s.aiL");
  let selector = tableDiv ? "div.a3s.aiL colgroup ~ tbody" : "colgroup ~ tbody";
  let tableElements = Array.from(document.querySelectorAll(selector));

  let tableRows = [];

  tableElements.forEach((table) => {
    let rows = Array.from(table.rows);
    tableRows = tableRows.concat(rows);
  });

  let tableData = tableRows.map((row) => {
    let dataObject = {};
    let rowCells = Array.from(row.cells);
    rowCells.forEach((cell, index) => {
      dataObject["prop" + index] = cell.innerText;
    });
    return dataObject;
  });
  return tableData;
})();

function getDateTime() {
  let date;
  let dateTime = document.querySelector("span.g3");
  if (dateTime) {
    date = new Date(dateTime.title);
    return date;
  }
  //else find another element with date
  dateTime = document.querySelectorAll("table.message td > font")[1];
  date = new Date(dateTime.innerText.replace(/at/, ""));
  return date;
}
