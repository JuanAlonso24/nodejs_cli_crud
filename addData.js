import inquirer from "inquirer";
import fs from "fs";
import { v4 as uuidv4 } from "uuid";
import queryDB from "./queryDB.js";

export default async function addData(info) {
  try {
    const answer = await inquirer.prompt([
      { type: "input", name: "name", message: "Please Enter Your  Name: " },
      { type: "number", name: "phone", message: "Please Enter Your  Number: " },
      {
        type: "list",
        name: "age",
        message: "Please Are you An Adult: ",
        choices: [
          { name: "Y", value: "Adult" },
          { name: "N", value: "Minor" },
        ],
      },
    ]);
    const data = {
      id: uuidv4(),
      name: answer.name,
      phone: answer.phone,
      age: answer.age,
    };
    info.push(data);

    if (fs.existsSync("db.json")) {
      addDetails(info);
    } else {
      fs.appendFile("db.json", "[]", (err) => {
        if (err) {
          console.log("Could not create db.json", err);
          return;
        }
        addDetails(info);
      });
    }
  } catch (err) {
    console.log("Something went wrong!", err);
  }
}

async function addDetails(info) {
  await fs.writeFile("db.json", JSON.stringify(info), function (err) {
    if (err) {
      console.log("Error Writing To The Database", err);
    }
    console.log("Data Addedd successfully");
  });
}

queryDB(addData);
