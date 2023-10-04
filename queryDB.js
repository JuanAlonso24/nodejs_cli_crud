import fs from "fs";

export default async function queryDB(externalFunction) {
  try {
    let info = [];

    if (fs.existsSync("db.json")) {
      await fs.readFile("db.json", function (err, data) {
        info = JSON.parse(data.toString());
        console.log(info);

        if (err) {
          console.log("Reading File Failed", err);
          return;
        }

        if (externalFunction && !err) {
          externalFunction(info);
          return;
        }
      });
    } else {
      if (externalFunction) {
        externalFunction(info);
        return;
      }
    }
  } catch (error) {
    console.log(`Something Happened ${error.message}`);
  }
}
