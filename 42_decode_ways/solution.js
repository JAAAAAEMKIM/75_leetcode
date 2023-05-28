const NUM_TO_CHAR = {};

for (let i = 1; i <= 26; i++) {
    NUM_TO_CHAR[i] = String.fromCharCode(64 + i);
}

var numDecodings = function(s) {
    const dp = [];
    dp[0] = 1;
    dp[1] = NUM_TO_CHAR[s[0]] ? 1 : 0;

    for(let i = 2; i < s.length + 1; i++) {
        dp[i] = 0;
        if(NUM_TO_CHAR[s[i - 1]]) {
            dp[i] += dp[i - 1];
        }
        if(NUM_TO_CHAR[s.slice(i - 2, i)]) {
            dp[i] += dp[i - 2];
        }
    }

    return dp[s.length];
};