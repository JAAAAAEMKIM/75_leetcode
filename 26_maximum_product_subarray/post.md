
첫 시도에 풀지 못했다. maximum subarray와 비슷한 방식일거라 생각하여 sum array를 도입해보려 했는데 음수 때문에 좀 더 복잡해진 느낌이었다.

다음에 다시 시도하면서 힌트를 봤고, kadane's algorithm으로 풀 수 있다고 했다.

maximum subarray에서 봤던 kadane's algorithm 기억을 살려서 dp를 적용해보았다.

이 때 주의할 점은, 최소값에 대한 array도 계속 계산해주어야한다는 점이다.

최대값은 (음수 최소값) * (음수 현재값) 또는 (양수 최대값) * (양수 현재값) 두 경우 중 하나이기 때문에, 최소값이 필요하다.

이를 위해 min, max에 대한 배열을 따로 두고 하나씩 저장해줬다.

```js
/**
 * @param {number[]} nums
 * @return {number}
 */
var maxProduct = function(nums) {
    const dpMin = [nums[0]];
    const dpMax = [nums[0]];

    nums.forEach((num, i) => {
        if (i === 0) return;

        const minProduct = dpMin[i - 1] * num;
        const maxProduct = dpMax[i - 1] * num;

        dpMin.push(Math.min(num, minProduct, maxProduct));
        dpMax.push(Math.max(num, minProduct, maxProduct));
    })

    return Math.max(...dpMax)
};
```