인터벌을 정렬 후 순회하게되면 현재 interval이 다음 interval과 연결된 경우 바로 연결해줄 수 있기 때문에 모든 노드에 대해 모든 노드를 순회할 필요가 없다. 
즉, O(n^2)의 탐색을 할 필요가 없다.

시간복잡도 O(n * logn)으로 해결할 수 있다. (정렬 = n * logn)

```ts
/**
 * @param {number[][]} intervals
 * @return {number[][]}
 */
var merge = function(intervals) {
  intervals.sort((a,b) => (a[0] - b[0]));
  const res = [];
  let s = null;
  let e = null;

  
  for (let i = 0; i < intervals.length; i++) {
      //병신같은 자바스크립트는 e가 null일 때 intervals[i][0]이 0이면  true를 반환한다.
      if (e !== null && e >= intervals[i][0]) {
          e = Math.max(intervals[i][1], e);
      } else {
          if (s !== null && e !== null) {
              res.push([s, e]);
          }
          s = intervals[i][0];
          e = intervals[i][1];
      }
  }

  if (s !== null && e !== null) {
      res.push([s, e]);
  }

  return res;
};
```

중간에 잠시 헤맸던게, `e >= intervals[i][0]` 부분이었다.
첫 start와 end를 `null`, `null로` 놓고 진행한게 원인이었다.
end가 null일 때 `intervals[i][0]`가 0이면 `e >= intervals[i][0]`이 true가 된다.
(`(null >= 0) === true`)

부등호는 일치비교가 아닌 동등비교이기 때문이다.

==이나 !=의 경우 주의해서 거의 사용하지 않는데, 부등식에서 함부로 null을 사용하면 안된다는 것을 다시 생각하게 됐다.
