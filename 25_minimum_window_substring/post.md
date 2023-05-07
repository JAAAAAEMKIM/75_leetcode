딱 봐도 window 느낌인 문제이긴 한데 확신이 생기는 알고리즘이 떠오르지는 않았다.

start, end를 이용하는데, start를 어떻게 해야 적절히 증가시킬 수 있을까?

처음에 철자 개수는 고려하지 않는 줄 알았는데 예시를 자세히 보니 철자 개수 카운팅까지 필요해서 조금 시간이 많이 걸렸다.

생각한 방식

각 낱말별로 인덱스들의 배열을 캐싱하는 cache map을 만든다.
start, end로 두고 window를 순회.
end로 새로운 elem에 대해 체크한다.
  새로운 낱말이 아직 다 안 찾은 상태인 경우, 캐시의 배열에 인덱스를 추가해준다.
  새로운 낱말이 이미 다 찾은 상태의 낱말인 경우, 캐시의 배열에서 맨 앞을 빼고, 새로운 낱말을 추가해준다.

이후 모든 낱말을 개수에 맞게 찾았다면 현재 길이와 기존 최소 길이를 비교하여 다시 저장해준다.

순회가 끝난 후, 카운팅이 다 된 경우가 한 번이라도 있었다면, 해당하는 substring을 반환한다.
그렇지 않은 경우 ''륿 반환한다.

```js
/**
 * @param {string} s
 * @param {string} t
 * @return {string}
 */
const MAX_VALUE ='100003';

var minWindow = function(s, t) {
    let minIdx = 0;
    let maxIdx = 0;
    let minLength = MAX_VALUE;
    let currentCount = 0;

    const maxCount = t.length;

    const countMap = new Map();
    const cache = new Map();

    for (let i = 0; i < t.length; i++) {
        countMap.set(t[i], (countMap.get(t[i]) || 0) + 1);
        cache.set(t[i], []);
    }

    for (let end = 0, start = 0; end < s.length; end++) {
        const cacheIndices = cache.get(s[end]);

        if (cacheIndices === undefined) {
            continue;
        }

        if (currentCount === 0) {
            start = end;
        }

        cacheIndices.push(end);
        currentCount += 1;

        if (cacheIndices.length > countMap.get(s[end])) {
            cacheIndices.splice(0, 1);
            currentCount -= 1;

            if (s[start] === s[end]) {  
                let min = MAX_VALUE;
                [...cache.values()].forEach(arr => min = (min > arr[0] ?? MAX_VALUE ? arr[0] : min));
                start = min;
            }
        }
        


        if (currentCount === maxCount) {
            const currentLength = end - start + 1;

            if (minLength > currentLength) {
                minLength = currentLength;
                minIdx = start;
                maxIdx = end;
            }
        }
    }

    return currentCount === maxCount ? s.subString(minIdx, maxIdx + 1) : "";
};
```

해결되긴 했지만, 느린편에 속했다. 시간 복잡도는 O(n)이겠지만, n의 상수가 큰 것으로 보인다. (`[...cache.values()].forEach(arr => min = (min > arr[0] ?? MAX_VALUE ? arr[0] : min))`에서의 최소값 체크로 인해서 cache.values만큼의 복잡도 추가)

또한 인덱스 캐싱 관련 로직에서 비효율적으로 많은 정보를 캐싱해두고 있는데, 실제 풀이를 보면 이 정보들이 필요 없는 것으로 보인다.
여기에 대한 관리들을 제거한 알고리즘을 보면 더 빠른 결과를 보여주는것을 알 수 있다.

정석적으로 보이는 풀이법

```ts
var minWindow = function(s, t) {
    
    let arr = new Array(128).fill(0); // Ascii charSet array to store count
    let result = [-Infinity, Infinity] // result not yet known
    let missing = t.length; // missing words initially
    
    for(let i=0; i < t.length; i++){ // increase the count in arr
        arr[t.charCodeAt(i)]++
    }
     
    let start = 0;
    
    for(let end = 0; end < s.length; end++){ // start from 0 and then expand
        if(arr[s.charCodeAt(end)] > 0){ // element present in t then decrese missing
            missing--
        }
        
        arr[s.charCodeAt(end)]-- // if not present in t then make it negative
        
        while(missing == 0){ // start decrementing start to check the best option
             if(result[1]-result[0] > end - start){ // store the best answer always
                result[1] = end; result[0] = start
            }
            
           
            arr[s.charCodeAt(start)]++ 
            if(arr[s.charCodeAt(start)] > 0){ // if the char is present in t
                missing++
            }
          
            start++ 
        }
        
        
    }
    
    return result[1] == Infinity ? "" : s.slice(result[0], result[1]+1);
    
};
```