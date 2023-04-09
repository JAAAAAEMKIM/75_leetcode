class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

class Heap {
  instance = Array(5000001);
  size: number = 0;

  push(val: ListNode) {
    this.size += 1;
    this.instance[this.size] = val;
    let index = this.size;

    while (index > 1) {
      const parent = Math.floor(index / 2);
      if (this.instance[index].val < this.instance[parent].val) {
        const tmp = this.instance[index];
        this.instance[index] = this.instance[parent];
        this.instance[parent] = tmp;

        index = parent;
      } else {
        return;
      }
    }
  }

  pop() {
    const ret = this.instance[1];
    const last = this.instance[this.size];
    this.size -= 1;
    this.instance[1] = last;

    if (this.size) this.minHeapify(1);

    return ret;
  }

  minHeapify(root: number) {
    let min = this.instance[root]?.val;
    let minIdx = root;
    let left = root * 2;
    let right = root * 2 + 1;

    if (right <= this.size && this.instance[right].val < min) {
      min = this.instance[right].val;
      minIdx = right;
    }

    if (left <= this.size && this.instance[left].val < min) {
      min = this.instance[left].val;
      minIdx = left;
    }

    if (minIdx !== root) {
      const tmp = this.instance[minIdx];
      this.instance[minIdx] = this.instance[root];
      this.instance[root] = tmp;

      return this.minHeapify(minIdx);
    }
  }

  isEmpty() {
    return this.size === 0;
  }
}

function mergeKLists(lists: Array<ListNode | null>): ListNode | null {
  if (!lists.length) return null;

  const heap = new Heap();
  let prev: null | ListNode = null;
  let head: null | ListNode = null;

  lists.forEach((node) => {
    node && heap.push(node);
  });

  while (!heap.isEmpty()) {
    const node = heap.pop();
    console.log(heap.size, node);

    if (node.next) heap.push({ ...node.next });

    const newNode = { val: node.val, next: null };
    if (prev) {
      prev.next = newNode;
    }
    prev = newNode;

    if (!head) {
      head = prev;
    }
  }

  return head;
}
