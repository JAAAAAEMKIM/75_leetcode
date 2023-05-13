대표적인 greedy 문제인데, 생각해내지 못해서 틀렸다.

greedy임을 알 때 구현난이도는 굉장히 낮다.

end 순으로 정렬 후 순회하며 겹치지 않는 경우에 결과 배열에 넣어주면 된다.

```ts
var eraseOverlapIntervals = function(intervals) {
    intervals.sort((a, b) => a[1] - b[1]);
    const res = [intervals[0]];
    
    for (let i = 1; i < intervals.length; i++) {      
        if (res[res.length - 1][1] > intervals[i][0]) continue;

        res.push(intervals[i]);
    }
    return intervals.length - res.length;

};
```