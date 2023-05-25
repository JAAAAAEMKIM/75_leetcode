var reverseBits = function(n) {
  let ret = 0b0000_0000_0000_0000_0000_0000_0000_0000;

  for(let i = 0; i < 32; i++) {
      ret *= 2;
      ret += n >> i & 1;
  }

  return ret;
};