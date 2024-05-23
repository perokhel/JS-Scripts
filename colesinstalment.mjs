import { getDateObjectFromFormattedString } from "./utilities.mjs";

function replaceNonAllowedChars(str) {
	return str.replace(/[^a-zA-Z0-9\$\.\s\n]/g, " ");
}

function parseAmountAndDueDate(str) {
	const lines = str.split("\n");

	console.log(`Lines[1]: ${lines[1]}`);

	// Extract amount
	const amountMatch = lines[0].match(/^\s*\$ (\d+\.\d+)\s*$/);
	const amount = amountMatch ? parseFloat(amountMatch[1]) : null;

	// Extract due date
	const dueDateMatch = lines[1].match(/^Due (\d{2} \w{3} \d{4})$/);
	console.log(`dueDateMatch: ${dueDateMatch}`);
	const dueDateStr = dueDateMatch ? dueDateMatch[1] : null;
	const dueDate = dueDateStr
		? getDateObjectFromFormattedString(dueDateStr)
		: null;

	return { amount, dueDate };
}

function extract_instalments(text) {
	// Extracts paid and total instalments from a string in the format '(5 of 12 paid)'.

	const match = text.match(/\((\d+) of (\d+) paid\)/); // Updated regex to match the new format
	if (!match) {
		throw new Error(`Invalid instalment format: ${text}`);
	}
	const paid = parseInt(match[1]);
	const total = parseInt(match[2]);
	return [paid, total];
}

function getInstalments() {}

let str = "$ 180.21\nDue 12 Feb 2024";
let str2 = "(5 of 12 paid)";

console.log(parseAmountAndDueDate(str));
console.log(extract_instalments(str2));
