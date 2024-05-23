let randomArray = [];

for (let i = 0; i < 10; i++) {
	let randomDay = Math.floor(Math.random() * 31) + 1;
	randomDay = randomDay.toString().padStart(2, "0");
	let date = new Date(`2024-01-${randomDay}`);

	randomArray.push({
		date,
	});
}

console.log(randomArray);
randomArray.sort((a, b) => (a.date > b.date ? 1 : -1));
console.log(randomArray);
