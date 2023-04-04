const { performance } = require("perf_hooks");

const testObj = [...Array(500)].reduce((acc, __, i) => {acc[i] = i; return acc;}, {});
const keys = Object.keys(testObj);

let avg = 0;


[...Array(100)].forEach(() => {
  const start = performance.now();
  [...Array(500)].forEach(() => {
    let res = 0;
  
    for(let i of keys) {
      res += testObj[i];
    }
  })
  const t = performance.now() - start;

  avg += t;
})

console.log(t / 1)