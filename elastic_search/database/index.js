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
}

module.exports = async (index) => {
  await run(index, "films");
  await run(index, "series");
};
