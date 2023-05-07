/**
 * @param {string} s
 * @param {string} t
 * @return {string}
 */
// const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
const MAX_VALUE ='100003';

var minWindow = function(s, t) {
    // t를 일단 맵으로 만들어야함 (중복 제거)
    // window로 해야하는건 맞는 것 같다.
    // start, end로 두고, 
    // end를 순회하며 새로운 elem에 대해 체크
    // start를 어떻게 증가시킬지가 관건 -> 가장 가까운 t에 포함되는 글자로 이동, 근데 언제?

    // 1) init
    let minIdx = 0;
    let maxIdx = 0;
    let minLength = 100003;
    let currentCount = 0;
    const maxCount = t.length;

    const countMap = new Map();
    const cache = new Map();

    for (let i = 0; i < t.length; i++) {
        countMap.set(t[i], (countMap.get(t[i]) || 0) + 1);
        cache.set(t[i], []);
    }

    // 2) loop
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
        }
        
        if (s[start] === s[end]) {
            let min = MAX_VALUE;
            [...cache.values()].forEach(arr => min = (min > arr[0] ?? MAX_VALUE ? arr[0] : min));
            start = min;
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