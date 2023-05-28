얼마전에 풀었던 break word라는 문제와 굉장히 비슷하게 느껴졌다.

생각해낸 dp는 다음과 같다.
dp[i]는 s[i]까지 사용해서 만들 수 있는 경우의 수

이 때 dp[i]는
dp[i - 1]에 `s[i]`이 붙거나 (1 <= s[i] < 10)
dp[i - 2]에 `s[i - 1]s[i]`이 붙는 (10 <= s[i - 1]s[i] < 27)
두 경우 중 하나이다.

식으로 표현하면 다음과 같다.


dp[i] = (dp[i - 2] if s[i-1]s[i] is valid else 0) + (dp[i - 1] if s[i] is valid)

위 점화식을 활용하여 풀어줬다.

const NUM_TO_CHAR = {};

for (let i = 1; i <= 26; i++) {
    NUM_TO_CHAR[i] = String.fromCharCode(64 + i);
}

var numDecodings = function(s) {
    let first = 1;
    let second = NUM_TO_CHAR[s[0]] ? 1 : 0;
    let cur = second;

    for(let i = 2; i < s.length + 1; i++) {
        cur = 0;
        cur += NUM_TO_CHAR[s[i - 1]] ? second : 0;
        cur += NUM_TO_CHAR[s.slice(i - 2, i)] ? first : 0;

        first = second;
        second = cur;
    }

    return cur;
};