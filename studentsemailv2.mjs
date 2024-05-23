(function processStudentRecords() {
  let sendButton = document.createElement("button");
  sendButton.innerHTML = "Send";
  sendButton.style.width = "100%";
  sendButton.style.fontSize = "1.5rem";
  sendButton.style.padding = "50x";
  sendButton.style.backgroundColor = "#79F6B2";
  sendButton.addEventListener("click", sendRecordsToAPI);
  document.body.prepend(sendButton);

  function extractStudentRecords() {
    let tableDiv = document.querySelector("div.a3s.aiL");
    let selector = tableDiv
      ? "div.a3s.aiL colgroup ~ tbody"
      : "colgroup ~ tbody";
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
  }

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

  function sendRecordsToAPI() {
    let apiUrl = "http://localhost:3100/students";
    let apiUrlCyclic = "https://gardenia.cyclic.app/students";
    let timeStamp = getDateTime();
    let studentsData = {
      date: timeStamp,
      records: extractStudentRecords(),
    };
    let postOptions = {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(studentsData), // body data type must match "Content-Type" header
    };

    sendData(apiUrl, postOptions);

    async function sendData(apiUrl, postOptions) {
      let res = await fetch(apiUrl, postOptions);
      let jsonData = await res.json();
      console.log(jsonData);
    }
  }
})();
