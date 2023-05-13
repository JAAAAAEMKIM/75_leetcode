정렬된 array를 rotate 시킨 array가 있다.

여기서 가장 작은 원소를 찾는 O(n) 풀이를 생각해보자면, 처음으로 값이 이전값보다 작아지는 지점을 찾으면 된다.

쉽게 풀리지만 문제에서 O(logn)풀이를 요구하고 있으므로 이진탐색과 유사하게 풀릴 것 같다는 힌트를 얻었다.

이 문제의 경우 구간을 두 개로 나눌 수 있는데, 첫 원소보다 크거나 같은 구간, 첫 원소보다 작은 구간이 있다.

ex)
[1, 2, 3, 4, 5, 6] => [5, 6, 1, 2, 3, 4]

1) [5, 6]
2) [1, 2, 3, 4]

2)번 구간의 left bound를 찾으면 된다.

mid값이 첫 값보다 크면 1)번 구간이고, l을 오른쪽으로 보낸다.
mid값이 더 작으면 2)번 구간이고, r을 왼쪽으로 보낸다.

```ts
var findMin = function(nums) {
    if (nums[0] < nums[nums.length - 1]) return nums[0];

    let l = 0, r = nums.length, mid = 0;
    const t = nums[0];

    while (l < r) {
      const mid = Math.floor((l + r) / 2);

      if (t <= nums[mid]) {
          l = mid + 1;
      } 
      if (t > nums[mid]) {
          r = mid;
      }
    }

    return nums[r] ?? t
;};
```

등호조건은 nums[0] === nums[mid] 즉 mid가 0인 경우이다.

이는 현재 l과 r이 각각 0, 1을 의미하는데, nums[0]이 최소값이 되는 경우는 첫줄에서 제거했다. 
즉, l = mid + 1로 설정 후 r을 그대로 반환해줘도 문제없다.

만약 첫 줄이 없다면, 2)구간의 시작은 없기 때문에 nums[r] === undefined (r === nums.length)가 된다.
이 경우를 확인하여 nums[r] ?? nums[0]으로 리턴해줘도 된다.