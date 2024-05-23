function doesContainSpaces(str = "234234") {
  return /\s/.test(str.trim());
}

let myStr = "Provider Student ID	";

console.log(doesContainSpaces(myStr));
