const courseTableNum = 4;
const providerRegex = /:\s*([^(]+)\s*\((\d+)\)/;
const courseTables = document.querySelectorAll("table.mobile");

const usiCourses = [...courseTables].map((table, tableIndex) => {
	if (tableIndex == 0) return;
	try {
		const [, providerName, codeCRICOS] =
			courseTables[courseTableNum].previousElementSibling.innerText.match(
				providerRegex
			);
		const providerDetails = {
			providerName,
			codeCRICOS,
		};
		const unitsDetails = [...table.rows].map((row, index) => {
			if (index == 0) return;
			try {
				return extractCourseInfo(row);
			} catch (error) {
				return { error, rowNum: index };
			}
		});

		return {
			providerDetails,
			unitsDetails,
		};
	} catch (error) {
		return { tableIndex, error };
	}
});

console.log(usiCourses);

function extractCourseInfo(row) {
	const cells = row.querySelectorAll("td");
	const courseText = cells[1].innerText;
	const status = cells[2].innerText.trim();
	const dateText = cells[3].innerText;

	// Updated regex with better naming
	const courseRegex = /^([\s\S]+?)\n\(([A-Z0-9]+)\)\s*-\s*\((\d+)\)/;
	const courseMatch = courseText.match(courseRegex);

	const dateRegex = /(\d{2}\/\d{2}\/\d{4})/g;
	const dates = dateText.match(dateRegex);

	if (!courseMatch || !dates || dates.length < 2) {
		throw new Error("Failed to parse course information");
	}

	return {
		courseTitle: courseMatch[1].trim(),
		courseCode: courseMatch[2],
		fundingIdentifier: parseInt(courseMatch[3], 10), // Changed from hours
		status: status,
		startDate: dates[0],
		endDate: dates[1],
	};
}
