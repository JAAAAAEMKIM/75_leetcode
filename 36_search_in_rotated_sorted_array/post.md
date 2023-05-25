이전에 풀었던 
https://leetcode.com/problems/search-in-rotated-sorted-array/submissions/957017518/

33. Search in Rotated Sorted Array

Find minimum in rotated sorted Array와 유사하다.

1. 섞였는지 안섞였는지 판단한다.
   1. 만약 섞였다면 섞인 지점을 찾는다.
   2. target이 첫 숫자보다 크거나 같으면 크면 섞인 곳으로부터 왼쪽, 그렇지 않은 경우 오른쪽에 속한다.
2. l과 r을 구간에 맞게 설정해준다.
3. 이진탐색으로 target을 찾는다.
4. 못찾으면 -1을 리턴한다.

var search = function(nums, target) {
    let l = 0, r = nums.length;
    let leftBound = 0;
    let ans = -1;
    let mid = 0;

    const isRotated = nums[0] > nums[nums.length - 1];

    if (isRotated) {

        while (l < r) {
            mid = Math.floor((l + r) / 2);

            if (nums[mid] === target) return mid;

            if (nums[mid] > nums[nums.length - 1]) {
                l = mid + 1;
            } else {
                r = mid;
            }
        }
        leftBound = l;

        if (target >= nums[0]) {
            l = 0;
            r = leftBound;
        } else {
            l = leftBound;
            r = nums.length;
        }

    }

    while (l < r) {
        mid = Math.floor((l + r) / 2);

        if (nums[mid] < target) {
            l = mid + 1;
        } else {
            r = mid;
        }
    }

    if (nums[l] === target) ans = l;

    return ans;
};