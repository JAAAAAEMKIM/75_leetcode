/**
 Do not return anything, modify matrix in-place instead.
 */
 function setZeroes(matrix: number[][]): void {
  const rowVisited = new Map();
  const colVisited = new Map();

  for(let i = 0; i < matrix.length; i++) {
      
      for( let j = 0; j < matrix[0].length; j ++) {

          if (matrix[i][j] === 0) {
              rowVisited.set(i, true)
              colVisited.set(j, true)
          }
      }
  }

  for (let i of rowVisited.keys()) {
      for( let j = 0; j < matrix[0].length; j ++) {
          matrix[i][j] = 0;
      }
  }
  for (let i of colVisited.keys()) {
      for( let j = 0; j < matrix.length; j ++) {
          matrix[j][i] = 0;
      }
  }
};