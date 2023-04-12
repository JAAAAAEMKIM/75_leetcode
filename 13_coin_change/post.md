몇년전에 비슷한 유형을 분명 풀어봤었는데, 안 보다 보니 결국 원했던 방식의 답을 찾지 못했다.

처음엔 너무 그리디처럼 보여서 그리디로 풀었는데 정답이 아니었다.

생각해보니 바로 반례가 떠올랐다.

그래서 탐색을 해야하는구나 싶어 dfs를 사용해봤다.

dfs로 풀면 다음과 같다.

푸는 내내 점화식이 떠올랐는데, dfs외의 구현이 떠오르지를 않았다.

https://leetcode.com/problems/coin-change/editorial/
위 에디토리얼을 좀 학습할 필요가 있다.

1. Brute Force

2. DP (Top-down) (내 구현)

3. DP (Bottom-up)

amount가 k일 때 가능한 최소값을 dp(k)라 하면, dp(1) ~ dp(amount) 값을 아래부터 위로 계산해 나간다.

첫 번째 coin을 사용하는 경우부터 코인을 하나씩 늘려가며 dp를 최신화해주는 방법이다.

Top-down 방식과 시간복잡도는 같은데, (O(S*n)) (S: amount, n: coin의 개수)
iteration을 통해 문제를 해결해서 훨씬 빠른 결과가 나오는 것 같다.
