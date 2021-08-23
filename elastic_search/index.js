const { Client } = require("@elastic/elasticsearch");
const client = new Client({
  node: "http://localhost:9200",
  context: { winter: "is coming" },
});
// const child = client.child({
//   headers: { "x-foo": "bar" },
//   requestTimeout: 1000,
// });
const seriesIndex = "series";

(async () => {
  const response = await client.count({});

  if (!response.body.count) {
    console.log("added data");
    await require("./database/index")(seriesIndex);
  }

  await search2().catch(console.log);
})();

// child.info((_, r) => console.log(r.body));
// client.info((_, r) => console.log(r.body));

// search3().catch((response) =>
//   console.log("search3", response.statusCode, response.body.error.reason)
// );
// search4().catch((response) =>
//   console.log("search4", response.statusCode, response.body.error.reason)
// );
// search5().catch((response) =>
//   console.log("search5", response.statusCode, response.body.error.reason)
// );

// search({ character: "Neo" }).then(console.log).catch(console.log);
// search({ character: "Ned" }).then(console.log).catch(console.log);
// search({ character: "Ned Stark" }).then(console.log).catch(console.log);
// search({ quote: "winter" }).then(console.log).catch(console.log);
// search({ quote: "i cho" }).then(console.log).catch(console.log);
// search({ quote: "Hiya' Fellas." }).then(console.log).catch(console.log);
// search({ character: "Neo", quote: "Because" })
//   .then(console.log)
//   .catch(console.log);
// search({ character: "Neo", quote: "Because I CHOOSE To." })
//   .then(console.log)
//   .catch(console.log);

async function search(match) {
  // { quote: "winter" }
  // { character: "Neo" }
  // { character: "Neo", quote: "I" }

  const { body } = await client.search({
    index: seriesIndex,
    body: {
      query: {
        match,
      },
    },
  });
  return { hits: body.hits.hits.map((e) => e._source), match };
}
async function search2() {
  const { statusCode, body } = await client.search({
    index: seriesIndex,
    body: {
      query: {
        match: { character: "Neo" },
      },
    },
  });
  console.log("search2", statusCode, body.hits.hits[0]._source);
}

async function search3() {
  const { statusCode, body } = await client.search({
    index: "Not exist index",
    body: {
      query: {
        match: { character: "Neo" },
      },
    },
  });
  console.log("search3", statusCode, body.hits);
}
async function search4() {
  const { statusCode, body } = await client.search({
    index: seriesIndex,
    body: {
      query: {
        match: { notExistField: "value" },
      },
    },
  });
  console.log("search4", statusCode, body.hits);
}
async function search5() {
  const { statusCode, body } = await client.search({
    index: seriesIndex,
    body: {
      character: "Neo",
    },
  });
  console.log("search5", statusCode, body.hits);
}

async function context() {
  client.on("response", (err, result) => {
    const { id } = result.meta.request;
    const { winter } = result.meta.context;
    if (err) {
      console.log({ error: err, reqId: id, winter });
    }
  });

  client.search(
    {
      index: "my-index",
      body: { foo: "bar" },
    },
    {
      context: { winter: "has come" },
    },
    (err, result) => {
      if (err) console.log(1);
    }
  );
}

// console.log(body.hits.hits);
