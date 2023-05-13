var eraseOverlapIntervals = function(intervals) {
    intervals.sort((a, b) => a[1] - b[1]);
    const res = [intervals[0]];
    
    for (let i = 1; i < intervals.length; i++) {      
        if (res[res.length - 1][1] > intervals[i][0]) continue;

        res.push(intervals[i]);
    }
    return intervals.length - res.length;

};