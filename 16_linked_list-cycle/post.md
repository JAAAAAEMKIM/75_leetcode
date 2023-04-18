가장 먼저 생각이 든 방법
head부터 LL의 길이만큼 next를 했을 때, head는 null이 된다.

LL의 최대 길이는 10000이므로 다음과 같이 표현할 수 있다.

```ts
var hasCycle = function(head) {
    let cnt = 0;
    while (head && cnt <= 10000) {
        head = head.next;
        cnt += 1;
    }

    if (!head) return false;
    else return true;
};
```

사이클이 없는 경우: next를 LL의 길이만큼 하고 종료된다.
사이클이 있는 경우: next를 10001번 돌다가 true로 종료된다.

time complexity: O(n)
space : O(1);
사이클이 있는 경우를 조금 더 빠르게 캐치하려면 캐싱만 추가해주면 된다.

풀이에서 사용하는 알고리즘은 fast slow 알고리즘이었다.
fast는 두칸씩, slow는 한칸씩 전진하다보면, fast가 null이 되는 순간 cycle은 없다.
그렇지 않은 경우 fast와 slow는 만나게 된다.

```ts
var hasCycle = function(head) {
    let slow = head;

    while (head) {
        head = head.next?.next;
        slow = slow.next;

        if (head === slow) break;
    }   

    if (!head) return false;
    else return true;
};
```
