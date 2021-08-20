let a = setInterval(() => console.log("tick"));

catchTest();
thenTest();

tick();
immediate();
test(0);

function thenTest() {
  new Promise((resolve) => {
    resolve();
    console.log("promise body");
  }).then(() => console.log("then"));
}

function catchTest() {
  new Promise((_, reject) => {
    reject();
    console.log("promise body 2");
  }).catch(() => console.log("catch"));
}

function tick() {
  process.nextTick(() => {
    console.log("nextTick");
  });
}

function immediate() {
  setImmediate(() => {
    console.log("setImmediate");
  });
}
function test(i) {
  immediate();
  tick();
  if (i) setTimeout(() => test(--i));
  else clearInterval(a);
}
