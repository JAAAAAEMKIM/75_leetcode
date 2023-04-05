function insert(intervals: number[][], newInterval: number[]): number[][] {
  let insertIndex = -1;
  let mergeStart = -1;
  let mergeEnd = -1;


  for (let i=0; i < intervals.length; i++) {
      const interval = intervals[i];

      if (interval[1] < newInterval[0]) {
          insertIndex = i;
          continue;
      };

      if (interval[0] > newInterval[1]) continue;

      mergeStart < 0 && (mergeStart = i);
      mergeEnd = i;
  }

  if (mergeStart < 0 && mergeEnd < 0) {
      console.log(mergeStart, mergeEnd, insertIndex);

      intervals.splice(insertIndex + 1, 0, newInterval);
      return intervals;
  }

  const startInterval = intervals[mergeStart];
  const endInterval = intervals[mergeEnd];
  const mergedInterval = [Math.min(startInterval[0], newInterval[0]), Math.max(endInterval[1], newInterval[1])];

  intervals.splice(mergeStart, mergeEnd - mergeStart + 1, mergedInterval);
  return intervals;
};