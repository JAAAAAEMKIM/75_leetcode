n 비트를 읽어와서 ret에 거꾸로 써주기만 하면 되는 쉬운 문제다.

하지만 JS에서 숫자타입은 uint가 아니기 때문에 bitwise 연산으로 했을 때 계속 음수로 답이 나오는 경우가 있었다.

그래서 곱하기와 더하기로 바꿔줬고 통과할 수 있었다.

JS에 존재하는 Uint32Array 타입을 이용해서도 해봤지만, solution에서 .toString()을 사용하기 때문에 제대로 동작하지 않았다.

var reverseBits = function(n) {
    let ret = 0b0000_0000_0000_0000_0000_0000_0000_0000;

    for(let i = 0; i < 32; i++) {
        ret *= 2;
        ret += n >> i & 1;
    }

    return ret;
};
