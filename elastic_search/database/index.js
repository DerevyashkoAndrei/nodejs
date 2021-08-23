const fs = require("fs");
const path = require("path");
const { Client } = require("@elastic/elasticsearch");
const client = new Client({ node: "http://localhost:9200" });

async function run(index, folder) {
  const files = fs.readdirSync(path.join(__dirname, folder));
  for (let file of files) {
    const personsJSON = fs.readFileSync(path.join(__dirname, folder, file));
    const persons = JSON.parse(personsJSON);
    for (let person of persons) {
      await client
        .index({
          index: index,
          body: person,
        })
        .catch(() => {
          console.log(`error add ${body}`);
        });
    }
  }

  // await new Promise((resolve) => {
  //   files.forEach((file) => {
  //     const personsJSON = fs.readFileSync(path.join(__dirname, folder, file));
  //     const persons = JSON.parse(personsJSON);
  //     persons.forEach(async (body, i, arr) => {
  //       await client
  //         .index({
  //           index: index,
  //           body,
  //         })
  //         .catch(() => {
  //           console.log(`error add ${body}`);
  //         })
  //         .finally(() => {
  //           if (i + 1 === arr.length) resolve();
  //         });
  //     });
  // fs.writeFileSync(path.join(__dirname, "cash_films", file), personsJSON);
  // fs.unlinkSync(path.join(__dirname, "films", file));
  //   });
  // });
}

module.exports = async (index) => {
  await run(index, "films");
  await run(index, "series");
};
