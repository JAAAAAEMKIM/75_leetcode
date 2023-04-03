// https://blue-tang.tistory.com/37
function twoSumBruteForce(nums: number[], target: number): number[] {
  for (let i = 0; i < nums.length - 1; i++) {
    let a = nums[i];
    for (let j = i + 1; j < nums.length; j++) {
      let b = nums[j];

      if (a + b === target) {
        return [i, j];
      }
    }
  }
}

function twoSumInitIndexMap(nums: number[], target: number): number[] {
  const indexMap: Record<number, number> = {};

  nums.forEach((num, i) => (indexMap[num] = i));

  for (let i = 0; i < nums.length - 1; i++) {
    let a = nums[i];
    let operand = target - a;

    let targetIndex = indexMap[operand];

    if (!targetIndex || targetIndex === i) {
      continue;
    }
    if (targetIndex) {
      return [i, targetIndex];
    }
  }
}

function twoSumLeetCode(nums: number[], target: number): number[] {
  const indexMap: Record<number, number> = {};
  let a, operand, targetIndex;

  for (let i = 0; i < nums.length; i++ ) {
      a = nums[i];
      operand = target - a;

      if (operand in indexMap) {
          return [i, indexMap[operand]];
      }

      indexMap[a] = i;
  }
};
