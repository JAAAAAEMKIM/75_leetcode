
쉬운 문제다. 내가 생각한 아이디어는 전체 곱을 구해놓고 리스트를 순회하며 전체 곱에서 현재 숫자를 나눠주는 것이다.

두 번 순회만으로 끝낼 수 있다.

이 때, 0이 있는 경우에 예외 케이스가 생길 수 있으므로 해당 경우에 대해 체크해준다.

처음엔 reduce, map으로 짰는데 속도가 안나와서 일반 for문으로 바꿔줬다.

```ts
var productExceptSelf = function(nums) {
    let zeroCount = 0;
    let allProduct = 1;

    for (let i = 0; i < nums.length; i++) {
        if (!nums[i]) {
            zeroCount += 1;
            continue;
        }
        allProduct *= nums[i];
    }

    if (zeroCount > 1) return nums.fill(0);

    for (let i = 0; i < nums.length; i++) {
        if (!nums[i]) {
            nums[i] = allProduct;
            continue;
        }

        nums[i] = zeroCount ? 0 : allProduct / nums[i];
    }

    return nums;
};
```


솔루션에는 다음과 같은 알고리즘을 제시하고 있었다.
왼쪽에서부터 하나씩 곱하고, 오른쪽에서부터 하나씩 곱해준다.

left, right가 누적되면서 곱해지기 때문에 자기 위치에 왔을 때
left값 = 현재 숫자 전까지의 곱
right값 = 현재 숫자 이후의 곱

이므로 그 둘을 곱하면 자신 빼고 나머지에 대한 곱이 된다.
근데 곱셈연산이 4n회 발생하기 때문에 이게 더 느릴 것 같았는데 결과는 비슷했다.

내가 작성한 방식은 곱셈 n회 나눗셈 n회이지만 아무래도 나눗셈이 더 느린 연산이라 그런 것 같다.
(0의 예외케이스에서 n회 곱셈 추가로 발생하지만, 0이 둘 이상인 경우는 나눗셈 0회로 끝남.)


```ts
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var productExceptSelf = function(nums) {
  const n = nums.length;
  const result = new Array(n).fill(1);

  let left = 1;
  for (let i = 0; i < n; i++) {
    result[i] *= left;
    left *= nums[i];
  }
  let right = 1;
  for (let i = n - 1; i >= 0; i--) {
    result[i] *= right;
    right *= nums[i];
  }


  return result;
}
```
