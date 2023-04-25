간단히 하면, 임의의 a, b (a < b)에 대해 max(prices[b] - prices[a])를 찾는 문제다.

뒤에서부터 순회하여,
1) prices[b]가 현재 최대값보다 큰 경우 현재 최대값을 prices[b]로 설정해준다.
2) 작거나 같은 경우 현재까지의 최대이득과, 현재 최대값 - prices[b]를 비교하여 최대이득을 수정해준다.

뒤에서부터 돌기 때문에 1)에서 현재 최대값을 바꿔줄 수 있다.
이후에 최대값보다 작은값이 나올 때 최대이득을 계산하는데,
바뀐 최대값과의 차이가 기존 최대값과의 차이보다 크기 때문.

```ts
var maxProfit = function(prices) {
    let ret = 0;
    let max = 0;

    for(let i = prices.length - 1; i >= 0; i--) {
        prices[i] <= max
            ? ret = Math.max(ret, max - prices[i])
            : max = prices[i]
    }
    return ret;
};
```