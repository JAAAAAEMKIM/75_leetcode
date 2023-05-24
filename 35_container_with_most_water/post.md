풀이가 바로 떠올라서 풀 수 있었던 문제다. 확신은 없었는데 성공했다.

왼쪽, 오른쪽 끝에서부터 시작하여 더 작은 막대를 한칸씩 옮긴다.
옮기면서 최대값을 갱신해주면 마지막까지 계산한 후 남은 결과가 최대값이 된다.

예외가 있을 가능성이 있을 것 같은데, 왜 이 알고리즘이 작동하는지 파악해봤다.

안그래도 이 솔루션이 왜 작동하는지 의문을 품는 사람들이 많아서 자료들이 꽤 있었다.

글로 설명하면 잘 이해가 되지 않는 케이스들이 있어서 그림으로 예시를 보는게 낫다.

https://leetcode.com/problems/container-with-most-water/solutions/6099/yet-another-way-to-see-what-happens-in-the-on-algorithm/


l, r = 1, 6 부터 시작한다. x는 체크할 필요가 없는 지점, o는 체크한 지점이다.

              r
    1 2 3 4 5 6
l 1 x
  2 x x
  3 x x x 
  4 x x x x
  5 x x x x x
  6 x x x x x x


만약 h(1) < h(6)이라 하자. 이 때, S(1, n)의 값은 S(1, 6)보다 클 수 없다.
S(1, 6) - S(1, n) (1 <= n <= 6)
=> h(1) * (6 - 1) - (h(1) * (n - 1))
=> h(1) * (6 - n) >= 0

그러므로 S(1, 6) >= S(1, n)

즉 Max(S(1, n)) === S(1, 6)이고, 다른 n들에 대해 더 이상 체크하지 않아도 된다.

              r
    1 2 3 4 5 6
l 1 x ------- o   (l이 1일 경우는 더 이상 체크할 필요가 없다.)
  2 x x
  3 x x x 
  4 x x x x
  5 x x x x x
  6 x x x x x x



같은 방식으로 이번에는 l, r = 2, 6이고 h(l) > h(r)이라고 하자.
이번에는 반대로 S(2, 6)을 체크하는 걸로 S(n, 6)의 최대값이 S(2, 6)이라는 것을 알 수 있다. (2 <= n <= 6)

              r
    1 2 3 4 5 6
  1 x ------- o   
l 2 x x       o  (r이 6일 경우는 더 이상 체크할 필요가 없다.)
  3 x x x     |
  4 x x x x   |
  5 x x x x x |
  6 x x x x x x


한번 더 해본다. 이번에는 다시 h(l) < h(r)이라고 하자.
S(2, n)의 최대값은 S(2, 5)임을 알 수 있다. (2 <= n <= 5)
여기서, n 범위 밖인 S(2, 6)같은 경우는 위 단계에서 이미 계산이 되어서 계산할 필요가 없다.

            r
    1 2 3 4 5 6
  1 x ------- o   
l 2 x x --- o o  (l이 2일 경우는 더 이상 체크할 필요가 없다.)
  3 x x x     |
  4 x x x x   |
  5 x x x x x |
  6 x x x x x x

  ...
          r          
    1 2 3 4 5 6
  1 x ------- o
  2 x x - o o o
l 3 x x x o | |
  4 x x x x | |
  5 x x x x x |
  6 x x x x x x

계속 반복하다보면 마지막 결과값은 계산해야하는 값들을 모두 계산하면서 거쳐왔음을 알 수 있고, 그 중에 최대값이기 때문에 원하는 결과값이 나온다.


```ts
var maxArea = function(height) {
  let max = 0;
  let l= 0, r = height.length - 1;

  while (l < r) {
    max = Math.max(max, (r - l) * Math.min(height[l], height[r]));

    if (height[l] > height[r]) {
        r -= 1;
    } else {
        l += 1;
    } 
  }
  return max;
};
```