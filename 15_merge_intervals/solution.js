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