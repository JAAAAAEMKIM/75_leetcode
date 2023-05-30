DP의 대표적인 문제다. 두가지 방법으로 풀었다.

1. 수학적 방식으로 접근
2. DP

### 수학적 방식으로 접근

이 문제는 down/right 두 경로를 어떤 순서로 배열해서 끝 지점에 도달하느냐로 환원할 수 있다.
즉 `m - 1`개의 down과 `n - 1`개의 right를 어떻게 배열하는 경우의 수이고, 이는 교과과정에서 나오는 방식을 간단히 이용할 수 있다.

ex) m = 3, n = 7인 경우
ddrrrrrr ~ rrrrrrdd까지 배열하는 경우의 수를 세어야한다.
이는 원소가 8개고, 중복되는 원소가 2개, 6개 있는 경우의 수와 같다.

즉, (m - 1) + (n - 1)! / (m! * n!)

곱셈연산의 중복을 줄이기 위해 첫 부분에 m >= n이 되도록 보정해줬다.
또 while(n) 안에서 나눗셈을 반복해주는 것보다 곱셈을 통해 계산 후 마지막에 한번만 나눠주는 것이 훨씬 빠르다.

var uniquePaths = function(m, n) {
    let res = 1;
    let dividend = 1;
    m = m - 1;
    n = n - 1;

    if (m < n) {
        let tmp = n;
        n = m;
        m = tmp;
    }

    for (let i = m + n; i > m; i--) {
        res *= i;
    }
    while (n) {
        dividend *= n;
        n--;
    }
    return res / dividend;
};

### DP

이 문제의 점화식은 매우 간단하다.

dp[m, n] = dp[m - 1, n] + dp[m, n - 1];

간단히 해석하면 m, n = 3, 4일 때 dp[3, 4]는
1) dp[2, 4]에서 한칸 아래로 내려가는 것
2) dp[3, 3]에서 한칸 우측으로 이동하는 것

두 경우이다.

var uniquePaths = function(m, n) {
    const dp = [...new Array(n)].fill(1);

    for(let i = 1; i < m; i++) {
        for(let j = 1; j < n; j++) {
            dp[j] += dp[j - 1];
        }
    }

    return dp[n - 1];
};
