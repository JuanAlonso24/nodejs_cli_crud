import inquirer from "inquirer";
import fs from "fs";
import queryDB from "./queryDB.js";
import dbFileCheck from "./dbFileCheck.js";

export default async function updateData(info) {
  dbFileCheck();

  try {
    const answers = await inquirer.prompt([
      { type: "input", name: "recordID", message: "Please Enter Record ID: " },
    ]);

    let current;
    info.forEach((element) => {
      if (element.id === answers.recordID) {
        current = element;

        updateDetails(current, info);
      }
    });
  } catch (err) {
    console.log("Something went wrong!", err);
  }
}

async function updateDetails(current, info) {
  try {
    const feedback = await inquirer.prompt([
      {
        type: "input",
        default: current.name,
        name: "name",
        message: "Please Enter Your  Name: ",
      },
      {
        type: "number",
        default: current.phone,
        name: "phone",
        message: "Please Enter Your  Number: ",
      },
      {
        type: "list",
        default: current.age,
        name: "age",
        message: "Please Are you An Adult: ",
        choices: [
          { name: "Y", value: "Adult" },
          { name: "N", value: "Minor" },
        ],
      },
    ]);

    current.name = feedback.name;
    current.phone = feedback.phone;
    current.age = feedback.age;

    await fs.writeFile("db.json", JSON.stringify(info), function (err) {
      if (err) {
        console.log("Error Updating File DataBase", err);
      }
      console.log("User Updating Successfuly");
    });
  } catch (err) {
    console.log("Something went wrong!", err);
  }
}

queryDB(updateData);
