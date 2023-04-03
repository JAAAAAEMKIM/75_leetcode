// https://blue-tang.tistory.com/39
function getSumBinaryAdder(na: number, nb: number): number {
  const limit = 1 << 31;

  let carry = 0;
  let result = 0;
  let pos = 1;

  let a = na;
  let b = nb;
  let ai = 0;
  let bi = 0;
  let r = 0;

  while (true) {
      ai = a & 1;
      bi = b & 1;

      r = (carry ? ~(ai ^ bi) & 1 : ai ^ bi);
      carry = carry ? ai | bi : ai & bi;
      result = r ? result | pos : result;

      if (pos === limit) {
          return result;
      }

      a = a >> 1;
      b = b >> 1;
      pos = pos << 1;
  }
};

function getSumLeetCode(a: number, b: number): number {
  while(b !== 0) {
     const carry = a & b;
     a ^= b;
     b = carry << 1;
 }
 return a; 
};