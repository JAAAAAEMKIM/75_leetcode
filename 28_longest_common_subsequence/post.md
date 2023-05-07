단순반복을 통해 구현하면 TLE가 발생한다.

```ts
var longestCommonSubsequence = function(text1, text2) {
    const lcs = (text1, text2) => {
        let max = 0;

        for(let i = 0; i < text1.length; i++) {
            const char = text1[i];
            const idx = text2.indexOf(char);
            if (idx === -1) continue;

            max = Math.max(max, lcs(text1.slice(i + 1), text2.slice(idx + 1)) + 1);
        }

        return max;
    }

    return lcs(text1, text2);
};
```

개선이 필요한데, 아이디어는 Longest Increasing Subsequence랑 비슷한 것 같지만 정확한 구현이 쉽게 떠오르지 않는다.
간단히 text1, text2에 대한 캐시만 추가하는 것으로는 TLE가 해결되지 않는다.
또한 연산 비용이 많이 드는 slice 연산을 indexing으로 줄여봤지만 45번 케이스부터 TLE가 발생한다.
내부 for문에서 visited까지 추가해주고 나서야 겨우 통과하는 정도가 되었다.

```ts
var longestCommonSubsequence = function(text1, text2) {
    const cache = new Map();
    const indexMap = {};
    for(let c of 'abcdefghijklmnopqrstuvwxyz') {
        indexMap[c] = [];
    }
    for (let i = 0; i < text2.length; i++) {
        indexMap[text2[i]].push(i);
    }

    const lcs = (text1Idx, text2Idx) => {
        const cachedValue = cache.get(`${text1Idx}_${text2Idx}`);
        if (cachedValue) return cachedValue;

        let max = 0;
        const vis = {}

        for(let i = text1Idx; i < text1.length; i++) {
            const indices = indexMap[text1[i]];
            if (vis[text1[i]]) continue;

            vis[text1[i]] = true;

            const idx = indices.find(x => x >= text2Idx);
            if (idx === undefined) continue;

            max = Math.max(max, lcs(i + 1, idx + 1) + 1);
        }

        cache.set(`${text1Idx}_${text2Idx}`, max);
        return max;
    }

    return lcs(0, 0);
};
```

시간 복잡도 자체가 더 낮은 풀이법이 있다고 짐작해볼 수 있다.

정답은 2차원 배열을 이용한 DP이다. DP문제들은 항상 아이디어가 조금씩 달라서 떠올리는게 쉽지 않다.

해당 풀이법은 다음과 같다.

```ts
var longestCommonSubsequence = function(text1, text2) {
    let dp = new Array(text1.length+1).fill(null).map(() => new Array(text2.length+1).fill(0));

    for (let i = 1; i <= text1.length; i++) {
        for (let j = 1; j <= text2.length; j++) {
            if (text1[i-1] === text2[j-1]) {
                dp[i][j] = dp[i-1][j-1] + 1;
            } else {
                dp[i][j] = Math.max(dp[i-1][j], dp[i][j-1]);
            }
        }
    }
    
    return dp[text1.length][text2.length];
};
```

아이디어: 2차원 배열 dp를 둔다. dp[i][j]의 의미는 LCS(text1[0..i], text2[0..j])이다.
(위 풀이에서 인덱스는 1-base)

bottom-up 방식으로 다음 값을 구하는데, 위 DP배열은 다음과 같은 규칙을 찾을 수 있다.

1) text1[i] === text2[j]인 경우 dp[i][j]는 dp[i-1][j-1] + 1
  ex) abcde, ace에서 dp[3][2]를 구한다고 하자. 
      즉, LCS('abc', 'ac')를 구해야하는데,
      text1[2] == text2[1] == 'c'로 같은 문자이다.
      이는 LCS('ab', 'a')의 뒤에 'c'를 하나 붙이는 것과 같다.

1) text1[i] !== text2[j]인 경우 dp[i][j]는 MAX(dp[i-1][j], dp[i][j-1])
  ex) 마찬가지로 dp[4][2]를 구한다고 하자.
      즉 LCS('abcd', 'ac')를 구해야한다.
      이는 LCS('abcd', 'a') LCS('abc', 'ac') 중 큰 값이라고 할 수 있다.
      'd'와 'c'는 겹치지 않으므로 LCS는 그전까지의 값들에서 늘어나지 않고, 앞의 값들 중 큰 값을 비교한다.
      LCS('abcd', 'a')의 'a'를 'ac'로 늘리거나, [1]
      LCS('abc', 'ac')의 'abc'를 'abcd'로 늘리는데, [2]
      [1]의 경우는 LCS('abc', 'ac')에 해당하기 때문에 추가적인 계산이 필요 없음을 알 수 있다.
      
풀이 참고: https://leetcode.com/problems/longest-common-subsequence/solutions/1680148/javascript-dp-solution-with-written-intuition/?languageTags=javascript

추가로, 1d array를 통해서도 풀 수 있는데, 0 ~ n까지 각 i마다 dp 배열을 새롭게 저장할 필요 없이 한 배열로 덮어 쓰도록 수정하면 된다.

```ts
var longestCommonSubsequence = function(text1, text2) {
  let dp = new Array(text2.length+1).fill(0);

  for (let i = 1; i <= text1.length; i++) {
    let prevValue = 0;
    for (let j = 1; j <= text2.length; j++) {
      let tmp = prevValue;
      prevValue = dp[j];
      if (text1[i-1] === text2[j-1]) {
        // 여기서의 dp[j]의 계산에는 i - 1번째 순회의 dp[j - 1]값이 필요하다.
        // prevValue를 통해 이전 j 순회에서 임시로 저장해둔 (덮어씌워지기전의) dp값을 꺼내 사용한다.
        dp[j] = tmp + 1;
      } else {
        // 여기서의 dp[j]는 i - 1번째 순회의 값, dp[j - 1]은 i번째 순회의 값이 필요하다.
        // dp[j - 1]은 이 전 j 순회에서 실행되었으므로 그대로 쓰면 된다.
        dp[j] = Math.max(dp[j], dp[j-1]);
      }
    }
  }
  
  return dp[text1.length][text2.length];
};
```