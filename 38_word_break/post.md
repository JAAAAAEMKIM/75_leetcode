네 가지 방법을 시도했다.

1. DFS - 실패

var wordBreak = function(s, wordDict) {
    let res = false;

    const dfs = (cur) => {
        if (cur.length === 0) return true;

        let res = false;

        for(let word of wordDict) {
            if (!cur.startsWith(word)) continue;

            res |= dfs(cur.slice(word.length));
            if (res) break;
        }

        return res;
    }

    return dfs(s);
};

1. 현재 스트링을
   1. wordDict의 각 단어들로 시작하는지 확인한다.
   2. 시작하는 단어가 있다면 그 단어 뒤로부터 dfs를 계속함.
   3. 하나라도 true면 true. (DFS가 단어 끝에 도달했다.)
   4. 하나도 없으면 false.

시간복잡도 -

같은 cur을 만나게 되더라도 캐싱처리가 안되어있어서 그 부분을 추가해줘봤지만
마찬가지로 실패였다.



2. 단어 트리(Trie)를 만들어서 DFS

꽤 괜찮았던 풀이인 것 같은데 겨우 통과하는 수준이었다.
solution의 DP 방법과 같은 정도의 시간이 소요된다.

ex)
["cats","dog","sand","and","cat"]로 예를 들면, 다음과 같은 자료구조를 만들 수 있다.

wordTree

c - a - t - 'end'
        ㄴ s - 'end'

d - o - g - 'end'

s - a - n - d - 'end'

a - n - d - 'end'

이제 유사하게 DFS를 하는데, 현재 문자열에서 모든 단어에 대해 startsWith을 사용하는 대신
한 글자씩 순회하며 tree를 체크한다. tree는 객체로 만들어져 있으므로 탐색에 실행되는 반복이 줄어든다.
모든 단어에 대해 체크 -> c가 있는지 -> a가 있는지 -> t가 있는지 하나씩 체크

체크 시, 'end'를 찾으면 해당 단어가 완성됐다는 뜻이므로 그 뒤로 DFS를 실행해준다.
DFS 이후에 뒷글자까지도 체크해줄 수 있다.
cat - 'end' -> DFS -> cat - s -'end' -> DFS -> 그 뒤로 가능한 케이스가 없으므로 중지


var wordBreak = function(s, wordDict) {
    const dp = [];
    const wordMap = {};
    for(let word of wordDict) {
        let cur = wordMap;
        for(let i = 0; i < word.length; i++){
            if (!cur[word[i]]) {
                cur[word[i]] = {};
            }
            cur = cur[word[i]];
        }
        cur['end'] = true;
    }

    const dfs = (idx) => {
        if (idx === s.length) return true;
        if (dp[idx] !== undefined) return dp[idx];

        let cur = wordMap;
        let ret = false;
        while(cur[s[idx]]) {
            cur = cur[s[idx]];
            if (cur['end']) {
                dp[idx + 1] = dfs(idx + 1);
                ret ||= dp[idx + 1];
                if (ret) return true;
            }
            idx += 1;
        }
        return false;
    }

    return dfs(0);
};

이때 DP 배열을 둬서 반복했던 곳에 대해 재연산을 방지해줄 수 있다.

> 이런 자료구조를 예전에 봤던 것 같아서 검색해봤다.
> Trie(트라이)라고 부른다. -
> 
> 공부한 적이 있어서 이런 방식이 떠올랐던 것 같다.


3. solution의 DP 방법

solution에 있는 방식이라 엄청 빠른가? 했는데 아니었다.

var wordBreak = function(s, wordDict) {
    const wordMap = wordDict.reduce((acc, word) => {
        acc[word] = true;
        return acc;
    }, {})

    const dp = [true];

    for(let i = 1; i <= s.length; i++) {
        for(let j = 0; j < i; j++) {
            if(!dp[j]) continue;
            if(!wordMap[s.slice(j, i)]) continue;
            dp[i] = true;
            break;
        }
    }

    return !!dp[s.length];

};

dp[i]의 의미: s[0, i]를 wordDict의 단어로 만들 수 있다.
이 때 점화식은 다음과 같이 세울 수 있다.
dp[i] = dp[j] && s[j, i] in wordMap
s[0, i]가 조건을 만족하려면,
0 < j < i인 어떤 j에 대해 s[0, j]가 조건을 만족하고 s[j, i]가 wordDict에 존재해야한다.

dp[0]은 ''이므로 wordDict의 단어를 아무것도 선택하지 않을 때 만들 수 있다.
그러므로 true로 둔 후 다음과 같이 반복을 시작한다.

s[0, 1]
s[0, 2] s[1, 2]
s[0, 3] s[1, 3] s[2, 3]
...

다음 예시를 통해 구체적으로 보자.
Input: s = "catsandog", wordDict = ["cats","dog","sand","and","cat"]

i = 1 c
i = 2 ca - a
i = 3 cat(!) - at - t
i = 4 cats(!) - ats - ts - s
...
i = m catsand - atsand - tsand - sand - ... 

위처럼 모든 substring의 경우에 대해 체크하는데,
dp[j]를 확인하여 앞까지의 string이 조건에 맞는지 확인하고,
s[j, i] 중에 wordMap에 해당하는 내용이 있는지 확인한다.

i = m 일 때의 sand에 도착한 경우, dp[j] = true (cat)이므로 sand에 대한 체크도 할 수 있다.
sand도 성공이므로 dp[i] = dp[j] && s[j, i] in wordMap
가 만족된다.




1. solution의 개선 DP 방법


var wordBreak = function(s, wordDict) {
    const words = new Set(wordDict);
    const wordLens = new Set(wordDict.map((word) => word.length))
    const starts = new Set([0])

    for (let start of starts) { 
        for (let len of wordLens) {
            if (words.has(s.slice(start, start + len))) {
                starts.add(start + len) 
            }
        }
    }
    return starts.has(s.length)
};

단어의 길이를 활용하는 아이디어이다.
단어의 set, 단어길이의 set, starts의 set 세가지를 두고 시작한다.
starts는 위의 dp와 같은 역할이다.
starts[i]가 있다 = s[0, i]까지는 wordDict의 단어로 만들 수 있다.

만들 수 있는 단어들에 대해서 체크하면 되기 때문에 let start of starts를 통해서 반복문을 돌아준다.
만들 수 있는 단어들은 starts.add(start + len)을 통해 동적으로 추가되기 때문에 계속해서 체크할 수 있다.

특이한 점은 for문내에서 한글자씩 순회하는 대신 wordDict에 있을 수 있는 단어 길이에 대해서 체크해준다.
불필요한 순회를 많이 줄일 수 있다.

그 후 해당 단어가 있다면 starts에 추가해준다.

dp에 대한 아이디어는 비슷한데, length를 사용한다는 점, for ... of 를 통해 동적으로 반복문을 이용했다는 점을 기억해둬야겠다.
