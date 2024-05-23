import { readFileSync, writeFile } from "fs";

saveToFile({ name: "Anyone" });

function saveToFile(obj) {
  const jsonFile = "test.json";
  let data;
  // Read json file
  try {
    data = readFileSync(jsonFile);
    if (isJSON(data)) data = JSON.parse(data);
    else {
      console.log(
        "File is invalid json, it will be erased and new valid json will be saved into it."
      );
      data = [];
    }
    data.push(obj);
    writeFile(jsonFile, JSON.stringify(data), (err) => {
      // Checking for errors
      if (err) throw err;

      // Success
      console.log({ message: "Successfully saved!" });
    });
  } catch (e) {
    console.log(e.message);
  }
}

function isJSON(str) {
  try {
    return JSON.parse(str) && !!str;
  } catch (e) {
    return false;
  }
}
