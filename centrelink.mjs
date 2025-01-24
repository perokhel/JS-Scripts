let paymentsReceived;

function getCRN() {
    return document.querySelector(".cl-crn")?.innerText.replaceAll(/\s/g, "");
}

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

async function sendData(username, payments) {
    let apiUrl = "http://localhost:3100/api/payments";
    let postOptions = {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify({ username, payments }), // body data type must match "Content-Type" header
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
