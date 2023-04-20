못푼 문제.

sliding window를 사용하여 O(n) 시간에 풀 수 있다.
substring 관련 문제들에 sliding window를 적용할 수 있는 문제가 많다고 한다.

```js

var characterReplacement = function(s, k) {
  // 현재 윈도우에서 각 알파벳의 개수를 카운트
  let count = {};

  // 시작 포인터, 최대값, 윈도우 내의 최빈값의 개수
  let start = 0;
  let max = 0;
  let maxEl = 0;

  // end를 한칸 씩 전진시키며 window를 키움.
  for (let end = 0; end < s.length; end++) {
    count[s[end]] = (count[s[end]] || 0) + 1;

    // 윈도우 내의 최빈값의 개수는 새로 추가된 el에 의해서만 바뀌기 때문에,
    // 윈도우 내에서 새로운 end의 개수와 기존 maxEl만 비교해주면 됨.
    maxEl = Math.max(maxEl, count[s[end]]);

    // window 내의 바꿔야할 값들의 개수보다 k가 작으면 그 윈도우는 최대값이 될 수 없음. 
    // start를 한칸 이동. 윈도우 길이 유지
    if (end - start + 1 - maxEl > k) {
      count[s[start]] -= 1;
      start += 1;
    }

    // 가장 큰 윈도우의 길이를 기록함.
    max = Math.max(max, end - start + 1);
  }

  return max;
}

```