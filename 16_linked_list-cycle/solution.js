var hasCycle = function(head) {
  let cnt = 0;
  while (head && cnt <= 10000) {
      head = head.next;
      cnt += 1;
  }

  if (!head) return false;
  else return true;
};