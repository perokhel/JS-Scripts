const unitsList = document.querySelector("ul.no-bullet");
const unitsCollection = unitsList.querySelectorAll("li");

const aditUnits = [...unitsCollection]
	.map((unit) => parseUnit(unit.innerText))
	.filter((unit) => (unit ? true : false));

console.log(aditUnits);

function parseUnit(str) {
	const match = str.match(/^([A-Z]{6}\d{3})\s+([A-Z][a-z].+)$/);
	return match ? { unitCode: match[1], unitTitle: match[2].trim() } : null;
}
