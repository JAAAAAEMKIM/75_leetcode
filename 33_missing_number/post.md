합을 이용하여 간단하게 풀 수 있는 문제다.

해당 구간 모든 수의 합에서, nums의 값들을 하나씩 빼면 마지막에 남는 값이 nums에 없는 값이다.

Missing element = Sum([0,n]) - Sum(nums)
= 0 + Sum([1, n]) - Sum(nums)

이 때, Sum을 따로 따로 구한다면 nums 순회를 두 번 하는 것과 마찬가지기 때문에
각 iteration에서 `ret = ret + (i + 1) - nums[i]`를 계산해주면 조금 더 간단히 표현할 수 있다.

var missingNumber = function(nums) {
    let ret = 0;
    for(let i = 0; i < nums.length; i++) {
        ret = ret + i + 1 - nums[i];
    }
    return ret
};

reduce를 사용하면 한 줄로도 쉽게 해결 가능하다.

var missingNumber = function(nums) {
    return nums.reduce((acc, cur, idx) => acc = acc + idx + 1 - cur, 0);
};

Sum([1, n])은 (n + 1) * n / 2 라는 합공식을 통해서 구해도 더 빠른 결과를 얻을 수 있다.