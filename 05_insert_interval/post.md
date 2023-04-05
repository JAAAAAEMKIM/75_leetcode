풀이

현재 인터벌들과 새 인터벌을 입력받았을 때, 새 인터벌은 크게 두 가지 경우로 나눌 수 있다.
1. 기존 인터벌들과 겹치지 않는 경우 - 새 인터벌이 들어갈 위치의 인덱스를 찾아 삽입
2. 하나라도 겹치는 경우 - merge가 발생

intervals을 순회하며 새 interval의 start, end와 비교했다. 이를 통해 현재 인터벌이 새 인터벌의 앞인지, 뒤인지, 겹치는 중인지 판별할 수 있다.

```ts
function insert(intervals: number[][], newInterval: number[]): number[][] {
    let insertIndex = 0;
    let mergeStart = -1;
    let mergeEnd = -1;


    for (let i=0; i < intervals.length; i++) {
        const interval = intervals[i];

        if (interval[1] < newInterval[0]) {
            insertIndex = i  + 1;
            continue;
        };

        if (interval[0] > newInterval[1]) continue;

        mergeStart < 0 && (mergeStart = i);
        mergeEnd = i;
    }

    if (mergeStart < 0 && mergeEnd < 0) {
        intervals.splice(insertIndex, 0, newInterval);
        return intervals;
    }

    const startInterval = intervals[mergeStart];
    const endInterval = intervals[mergeEnd];
    const mergedInterval = [Math.min(startInterval[0], newInterval[0]), Math.max(endInterval[1], newInterval[1])];

    intervals.splice(mergeStart, mergeEnd - mergeStart + 1, mergedInterval);
    return intervals;
};
```

1) 현재 interval의 end가 newInterval의 start보다 앞인 경우
   새 인터벌의 삽입 위치를 현재 interval의 index로 기록한다.
   뒤에 나오는 인터벌도 새 인터벌보다 앞일 수 있기 때문에 이 조건에 해당하면 항상 삽입 위치를 기록해둔다.

2) 현재 interval의 start가 newInterval의 end보다 뒤인 경우
   새 인터벌의 삽입 위치는 1)에서 계산 되기 때문에 여기에 해당하는 경우에는 따로 기록을 하지 않아도 된다.

3) 그 외의 경우 - merge가 필요하다.
   merge 시작노드의 index는 처음 이 경우가 등장했을 때 한 번 기록해두면 된다.
   merge 끝노드는 이 경우가 더 이상 발생하지 않을 떄 까지 기록해준다.

이렇게 삽입, merge 시작, merge 끝의 인덱스를 구했다.

merge 시작/끝 인덱스가 안구해진 경우는 겹치는게 없음을 뜻한다.
바로 삽입해주면 된다.

merge해야하는 경우는
[min(시작 인터벌의 앞부분, 새 인터벌의 앞부분), max(끝 인터벌의 끝부분, 새 인터벌의 끝부분)]
으로 배열을 만들어주면 해당 범위를 모두 커버하는 새 인터벌이 나온다.
이 인터벌을 splice 하여 리턴한다.