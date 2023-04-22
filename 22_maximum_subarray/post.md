숫자 배열에서 뭔가할 때는 총합을 잘 이용하는 것도 방법인 것 같다.

이번 문제도 그런 예시다.

순회로만 풀려고 하면 도저히 답이 안보여서, 생각을 좀 해봤다.

가장 합이 큰 구간이 [j, i] 라고 하면, 이 값은 이렇게 표현할 수 있다.

sum(j, i) = sum(0, i) - sum(0, j);

즉 0부터 i까지의 합을 저장하는 배열인 sums를 만들면, 문제를 다음 문제로 치환할 수 있다.

배열 sums에서 j < i인 i, j에 대해 sum[i] - sum[j]의 최대값을 구해라.

```ts
var maxSubArray = function(nums) {
    let max = -Infinity;

    // sums 초기화
    const sums = new Array(nums.length + 1);
    sums[0] = 0;
    for (let i = 1; i < nums.length + 1; i++) {
        sums[i] = sums[i - 1] + nums[i - 1];
    }

    // 최대값 구하기
    for (let i = 1, j = 0; i < sums.length; i++) {
        max = Math.max(sums[i] - sums[j], max);
        if (sums[i] < sums[j]) {
            j = i;
        }
    }

    return max;
};
```
최대값을 구할때는 현재까지 순회의 최소값을 j에 저장하여 투포인터처럼 사용했다.