만만하게 봤다가 오래 걸린 문제다. 꽤 유명한 문제인 것 같다.

처음 생각한 방식은 중복 처리에 애를 먹었다. O(n^2)이지만 마지막 case에서 TLE가 떠서, 조금씩 계속 고쳐가며 겨우 통과시켰다.

1. 카운터로 숫자들을 카운팅한다.
2. 카운터의 키들이 keys, 키들의 index가 keyIndexMap에 저장된다.
3. key를 순회하며 모든 세가지 숫자의 조합을 찾는다.
4. 이때 중복을 피하기 위해 index는 i < j < k 순서여야한다.
5. k는 새로운 for문을 순회할 필요 없이 keys[k] = - keys[j] - keys[i]라는 점을 이용하여 인덱스맵에서 찾을 수 있다.

```ts
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function(nums) {
    const res = [];
    const counter = {};
    const keyIndexMap = {};
    const keys = [];
    let i, j, k, sum, num, keyIndex = 0;

    for(num of nums) {
        if (counter[num]) {
            counter[num] += 1;
            continue;    
        }
        counter[num] = 1;
        keys.push(num);
        keyIndexMap[num] = keyIndex++;
    }


    for(i = 0; i < keys.length; i++) {
        counter[keys[i]] -= 1;
        for(j = i; j < keys.length; j++) {
            if (counter[keys[j]] === 0) continue;
            counter[keys[j]] -= 1;

            sum = - keys[j] - keys[i];
            if (counter[sum] !== 0) {
                if (keyIndexMap[sum] >= j) {
                    res.push([keys[i], keys[j], sum]);
                }
            }
            counter[keys[j]] += 1;
        }
        counter[keys[i]] += 1;
    }

    return res;
};
```

뒤에 나올 정석 풀이와 복잡도는 O(n^2)로 같지만, 포문 내에서 계속해서 맵에 접근하는 부분이 발생하고 거기서 오버헤드가 많이 발생한 것 같다.

정석 풀이는 다음과 같다.

1. 배열을 정렬한다.
2. 배열을 순회한다. 이 때 같은 값이 나오면 중복을 피하기 위해 넘어간다.
   1. l, r을 끝값으로 설정 후
   2. nums[i] + nums[l] + nums[r]가
      1. 0보다 크면 줄여야하므로 r을 감소시킨다.
      2. 0보다 작으면 늘려야하므로 l을 증가시킨다.
      3. 0이면 원하는 답이므로, result에 기록 후 l과 r이 다른 값이 되도록 변경해준다.

```ts
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function (nums) {
    nums.sort((a, b) => a - b);
    let result = [];
    
    for (let i = 0; i < nums.length - 2; i++) {
        // Skip duplicate numbers
        if (i > 0 && nums[i] === nums[i-1]) {
            continue;
        }
            
        let l = i+1;
        let r = nums.length - 1;
        while (l < r) {
            const s = nums[i] + nums[l] + nums[r];
            if (s < 0) {
                l += 1;
            } else if (s > 0) {
                r -= 1;
            } else {
                // Found three numbers whose sum is zero
                result.push([nums[i], nums[l], nums[r]]);
                
                // Skip duplicate numbers
                while (l < r && nums[l] === nums[l+1]) {
                    l += 1;
                }
                while (l < r && nums[r] === nums[r-1]) {
                    r -= 1;
                }
                
                l += 1;
                r -= 1;
            }
        }
    }
    
    return result;
}
```