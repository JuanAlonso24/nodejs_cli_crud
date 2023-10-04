import inquirer from "inquirer";
import fs from "fs";
import queryDB from "./queryDB.js";
import dbFileCheck from "./dbFileCheck.js";

export default async function removeData(info) {
  dbFileCheck();

  try {
    const answer = await inquirer.prompt([
      { type: "input", name: "recordId", message: "Please Enter Record ID: " },
    ]);

    let remnantData = [];
    info.forEach((element) => {
      if (element.id !== answer.recordId) {
        remnantData.push(element);
      }
    });

    fs.writeFile("db.json", JSON.stringify(remnantData), function (err) {
      if (err) {
        console.log("Error while updating database", err);
      }
      console.log("Record delete successufly! DELETE");
    });
  } catch (err) {
    console.log("Something went wrong!", err);
  }
}

queryDB(removeData);
