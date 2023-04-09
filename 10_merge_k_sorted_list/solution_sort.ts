
function mergeKLists(lists: Array<ListNode | null>): ListNode | null {
  if (!lists.length) return null;

  const arr: number[] = [];
  let cur: null | ListNode = null;

  lists.forEach(node => {
      while (node) {
          arr.push(node.val);
          node = node.next;
      }
  });

  arr.sort((a, b) => a - b);

  for( let i = arr.length - 1; i >= 0; i--) {
      const newNode = { val: arr[i], next: cur };
      cur = newNode;
  }

  return cur;
};