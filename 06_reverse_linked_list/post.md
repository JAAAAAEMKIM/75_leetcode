
풀이
난이도 Easy에서 알 수 있듯, 단순히 Linked List를 순회하며 앞 뒤 가리키는 순서만 뒤집어주면 되는 간단한 문제다.

```ts
function reverseList(head: ListNode | null): ListNode | null {
  let prev: ListNode | null = null;
  let cur = head;
  
  while (cur) {
      const next = cur.next;
      cur.next = prev;
      prev = cur;
      cur = next;
  }

  return prev;
};
```

TIL을 해보려 했는데 로컬 깃 email 주소가 다른 email로 돼있어서 며칠간의 성과를 날렸다ㅜㅜ
또 불미스러운 야근으로 인해 퀄리티가 좋지 않은 날도 생기는 것 같다.
