# 내 풀이

1. nums에 대해 순회하며
   1. num - 1, num + 1을 각각 l, r이라 할 때,
      1. l을 최대값으로 가지는 그룹이 있으면 그 그룹에 현재 수를 넣는다.
      2. r을 최소값으로 가지는 그룹이 있으면 그 그룹에 현재 수를 넣는다.
      3. 둘 다인 경우는 두 그룹의 병합을 해준다.
2. 만들어진 그룹들 중에서 가장 사이즈가 큰 그룹의 크기가 답이된다.

구현에는 실제로 각각의 그룹을 배열로 만드는 것보단, 각 그룹의 min max를 기록해두고 업데이트만 해주면 되기 때문에 그렇게 했다.
또한 어떤 값을 최소값으로 갖는 그룹 mins와 최대값으로 갖는 그룹 maxs를 통해 키값으로 바로 접근하도록했다.

```ts
var longestConsecutive = function(nums) {
    if (!nums.length) return 0;

    const mins = new Map();
    const maxs = {};
    let num = 0, l = 0, r = 0, max = 1;

    for (let i = 0; i < nums.length; i++) {
        num = nums[i];
        l = num - 1;
        r = num + 1;

        // 중복에 대한 처리 (num이 이미 최대/최소값으로 들어있으면 병합연산이 필요하지가 않다.)
        if (maxs[num] || mins[num]) continue;

        // 새로운 그룹 생성
        if (!mins[r] && !maxs[l]) {
            const newGroup = {
                min: num,
                max: num,
            };
            mins[num] = newGroup;
            maxs[num] = newGroup;
        }

        // 오른쪽 그룹과 병합
        else if(mins[r] && !maxs[l]) {
            mins[r].min = num;
            mins[num] = mins[r];
            delete mins[r];

            max = Math.max(max, mins[num].max - mins[num].min + 1);
        }

        // 왼쪽그룹과 병합
        else if (!mins[r] && maxs[l]) { 
            maxs[l].max = num;
            maxs[num] = maxs[l];
            delete maxs[l];

            max = Math.max(max, maxs[num].max - maxs[num].min + 1);
        }

        // 좌 우 병합
        else {
            const newGroup = {
                min: maxs[l].min,
                max: mins[r].max,
            }
            mins[newGroup.min] = newGroup;
            maxs[newGroup.max] = newGroup;

            delete mins[r];
            delete maxs[l];

            max = Math.max(max, newGroup.max - newGroup.min + 1);
        }
    }

    return max;
};
```


sort가 nlogn이기 때문에 시도해보지 않았는데 해보니 이게 더 빨랐다.

내부 연산과 가비지컬렉션 등으로 시간이 많이 소요되기 때문인 것 같다.

var longestConsecutive = function(nums) {
    if (nums.length === 0) return 0;
    if (nums.length === 1) return 1;
    
    nums.sort((a, b) => a - b);
    let max = 0, i = 1, j = 0, len = 1;

    for(i = 1; i < nums.length; i++) {
        if (nums[i] === nums[i - 1]) continue;
        if (nums[i] === nums[i - 1] + 1) {
            len += 1;
            continue;
        }

        max = Math.max(len, max);
        len = 1;
        j = i;
    }

    return Math.max(len, max);
};

# 마지막 방식

sort까지 해보고 객체를 안쓸 수 있는 방법이 떠올라서 첫번째 풀이를 수정해서 시도했는데 꽤나 괜찮은 성능이 나왔다.

min max도 객체로 저장할 필요가없다. 있으면 생각할때 편하긴 한데, 길이값만 가지고 있어도 계산하는데에 문제가 없다.
연산이 많이 드는 방식인 객체생성을 피하고 길이로 연산해주면 60퍼센트 이상 괜찮은 답을 얻을 수 있다.

var longestConsecutive = function(nums) {
  if (!nums.length) return 0;

  const mins = new Map();
  const maxs = new Map();
  let num = 0, l = 0, r = 0, max = 1, newLen = 0;
  let leftGroup = undefined, rightGroup = undefined;

  for (let i = 0; i < nums.length; i++) {
    num = nums[i];
    l = num - 1;
    r = num + 1;

    if (maxs.get(num) || mins.get(num)) continue;

    leftGroup = maxs.get(l);
    rightGroup = mins.get(r);

    if (!rightGroup && !leftGroup) {
        mins.set(num, 1);
        maxs.set(num, 1);
        continue;
    }

    else if (rightGroup && !leftGroup) {
        newLen = rightGroup + 1;
        mins.set(num, newLen);
        maxs.set(num + rightGroup, newLen);
        mins.delete(r);
    }

    else if (!rightGroup && leftGroup) {
        newLen = leftGroup + 1;
        maxs.set(num, newLen);
        mins.set(num - leftGroup, newLen);
        maxs.delete(l);
    }

    else {
        newLen = leftGroup + rightGroup + 1
        mins.set(num - leftGroup, newLen);
        maxs.set(num + rightGroup, newLen);

        mins.delete(r);
        maxs.delete(l);
    }
    max = Math.max(max, newLen);
  }

  return max;
};



# 정석 풀이
정석풀이는 아래와 같다.

var longestConsecutive = function(nums) {
   let set=new Set(nums);
   let maxlen=0;
   for(let num of set){
        // 아래 조건문을 통해서 중복으로 탐색될 수 있는 num에 대해서는 넘어가준다.
       if(!set.has(num-1)){
            let len=0;
            while(set.has(num++)){
                len++;
            }
            maxlen=Math.max(maxlen,len)

       }
   }
   return maxlen
};
