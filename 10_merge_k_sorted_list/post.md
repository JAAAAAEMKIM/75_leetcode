k개의 정렬된 Linked List를 입력받아, 정렬된 하나의 Linked List로 만드는 문제다.

처음에는 그냥 item을 다 뽑아서 sort 후 Linked List로 만들어줬다.
(O(N + Nlog(N) + N) = O(N*log(N)) (N개의 리스트노드를 정렬하는 것과 같다.)

그 후 문제 분류가 힙이길래 힙으로 시도해봤는데, 힙이 오히려 더 느렸다.

solution에 있는 방식의 heap 알고리즘을 사용했다.

1. 각 Linked List의 현재 head를 heap에 넣는다.
2. heap이 빌 때 까지
   1. heap에서 하나를 뽑아 새 Linked List에 붙여주고
   2. heap에 뽑은 노드의 다음 노드가 있다면 넣어준다.

O(k + N*(logk)) = O(Nlogk)
Comparison cost가 heap을 사용했기 때문에 logk까지 줄어든 것을 알 수 있다.

하지만 실제로는 구현상의 문제나 GC가 오래 걸려 이게 더 느린 것 같다.

chat gpt에게 부탁해봐도 느린건 마찬가지였다.