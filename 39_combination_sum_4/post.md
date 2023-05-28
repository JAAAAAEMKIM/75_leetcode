주어진 예시는 다음과 같았다.

```
Input: nums = [1,2,3], target = 4
Output: 7
Explanation:
The possible combination ways are:
(1, 1, 1, 1)
(1, 1, 2)
(1, 2, 1)
(1, 3)
(2, 1, 1)
(2, 2)
(3, 1)
Note that different sequences are counted as different combinations.
```

처음에 고민하다 위 예시를 보고 실마리를 찾았다.

4를 만드는 경우의 수가 나열되어 있는데, 맨 앞자리와 나머지 자리를 분리해서 살펴보면

```
1 - 1, 1, 1
1 - 1, 2
1 - 2, 1
1 - 3

2 - 1, 1
2 - 2

3 - 1
```

위와 같다.

위 예제에서는 다음과 같은 규칙을 찾을 수 있다.

1) 4를 만들기 위해 맨 앞자리에 1을 쓰는 경우의 수는 맨 앞자리에 1을 넣고 나머지로 3을 만드는 경우의 수와 같다.
2) 2와 3의 경우도 마찬가지이다.
3) 즉, 4를 만들기 위해선
    (맨 앞자리가 1인 경우 3을 만드는 경우의 수)
    + (맨 앞자리가 2인 경우 2를 만드는 경우의 수)
    + (맨 앞자리가 3인 경우 1을 만드는 경우의 수)
    만큼의 경우의 수가 필요하다.

조금 더 일반화하면 다음과 같다.

nums의 원소로 t을 만드는 경우의 수를 f(t)라 하자.

f(t) = Sum(for num in nums; f(t - num))

위 공식을 통해 dp를 시도해보면 다음과 같다.

```js
var combinationSum4 = function(nums, target) {
    const dp = [...Array(target + 1)].fill(0);
    dp[0] = 1;
    nums.sort((a, b) => Number(a) - Number(b));
    
    for (let i = 1; i <= target; i++) {
        for(let j = 0; i - nums[j] >= 0; j++) {
            dp[i] += dp[i - nums[j]];
        }
    }

    return dp[target];
};
```