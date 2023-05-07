역시나 dp 못풀었다.

몇년전에 공부할 때 접한 적 있는 문제임에도, DP는 마땅한 풀이법이 생각나지 않으면 못풀게 된다.

가장 단순한 방식의 DP는 O(n^2)이라 사용하지 않으려했는데, 그거로라도 풀린다니 풀어볼 걸 그랬다.

풀이에서 알려주는 가장 빠른 방식은 O(nlogn)까지 가능하다고 한다.

solution 일부

1. Let pick the first element, sub1 = [2].
2. 6 is greater than previous number, sub1 = [2, 6]
3. 8 is greater than previous number, sub1 = [2, 6, 8]
4. 3 is less than previous number, we can't extend the subsequence sub1, but we must keep 3 because in the future there may have the.
5. longest subsequence start with [2, 3], sub1 = [2, 6, 8], sub2 = [2, 3].
6. With 4, we can't extend sub1, but we can extend sub2, so sub1 = [2, 6, 8], sub2 = [2, 3, 4].
7. With 5, we can't extend sub1, but we can extend sub2, so sub1 = [2, 6, 8], sub2 = [2, 3, 4, 5].
8. With 1, we can't extend neighter sub1 nor sub2, but we need to keep 1, so sub1 = [2, 6, 8], sub2 = [2, 3, 4, 5], sub3 = [1].
9. Finally, length of longest increase subsequence = len(sub2) = 4.

위 아이디어까지는 떠올랐는데, 구체적으로 실행할 방법이 떠오르지 않았다.
sub들을 어떻게 관리해야하고 어떻게 새 element와 각 sub와 비교를 해야 가장 효율적일까?

여기서 binary search를 사용한다고 한다.
"왜 갑자기 이진트리를 쓰지?" 하는 생각이 드는데, 기억해둬야하는 예시인 것 같다.

subArray를 하나만 두고, 여기에서 새로운 엘리먼트가 들어갈 위치를 이진탐색으로 찾는다.

```js


```



추가 1. BIT


추가 2. 세그먼트 트리