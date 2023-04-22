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

추가로 더 빠른 solution을 찾아보니, kadane's algorithm이라는 방법이 나왔다.

n + 1번째 아이템을 마지막으로 하는 subArray의 최대값은,
n번째 아이템을 마지막으로 하는 subArray의 최대값 + n + 1번째 아이템
n + 1번째 아이템

두 가지 경우밖에 없다.
연속돼야하기 때문에 바로 이전 아이템을 끝으로 하는 최대값이 0보다 크다면 거기에 붙이는 것이 최선이기 때문.

이 원리를 이용하여 DP를해준다.

```ts
var maxSubArray = function(nums) {
    let maxSum = nums[0]; // initialize maximum sum as the first element
    let currentSum = nums[0]; // initialize current sum as the first element
    
    for (let i = 1; i < nums.length; i++) {
        currentSum = Math.max(nums[i], currentSum + nums[i]);
        maxSum = Math.max(maxSum, currentSum);
    }
    
    return maxSum;
};
```

더 직관적인 코드로는 다음이 있다. nums가 dp 배열의 역할을 함.

```ts
var maxSubArray = function(nums) {  
    for(let i =1; i<nums.length;i++){
        nums[i] = Math.max(nums[i],nums[i]+nums[i-1])
    }
    return Math.max(...nums)
};
```