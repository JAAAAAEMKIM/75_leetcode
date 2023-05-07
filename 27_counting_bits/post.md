n까지의 각 숫자를 이진법으로 표현했을 때 1이 몇개 있는지 찾는 문제이다.

O(n * log n) 풀이

```ts
/**
 * @param {number} n
 * @return {number[]}
 */
var countBits = function(n) {
    const ans = [];

    for(let j = 0; j <= n; j++) {
        let cnt = 0;
        let i = j;

        while (i > 0) {
            const r = i % 2;
            i = r ? (i - 1) / 2 : i / 2;
            cnt += r;
        }

        ans.push(cnt);
    }

    return ans;
};
```

O(n)풀이는 조금 다른 아이디어가 필요하다.

n과 (n // 2)의 관계를 생각해본다.

1) n이 홀수인 경우

ex) 15 (1111)인 경우 n//2 == 111

즉 15의 1의 개수는 n//2 + 1

2) n이 짝수인 경우

ex) 14 (1110)인 경우 n//2 == 111

즉 14의 1의 개수는 n//2와 같다.


즉, 마지막 1의 유무에 따라 n은 n//2의 비트 뒤에 1이 오냐 안오냐이기 때문에

dp[n] = dp[n//2] + n%2를 통해 dp로 계산해줄 수 있다.

n // 2는 `>>`를 통해 bit shift로 계산해줄 수 있다.


```ts
var countBits = function(n) {
    const ans = [0];

    for(let j = 1; j <= n; j++) {
        ans.push(ans[j >> 1] + (j % 2))
    }

    return ans;
};
```

이렇게 간단히 풀린다.