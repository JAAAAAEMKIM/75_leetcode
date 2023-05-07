/**
 * @param {number[][]} matrix
 * @return {number[]}
 */
const VISITED = -101;

var spiralOrder = function(matrix) {
    const result = [];
    let height = matrix.length;
    let width = matrix[0].length;
    let maxCount = height * width;
    let cnt = 0;

    const pos = [0, 0];
    const vectors = [[0, 1], [1, 0], [0, -1], [-1, 0]];
    let vectorIdx = 0;

    while (cnt < maxCount) {
        result.push(matrix[pos[0]][pos[1]])
        matrix[pos[0]][pos[1]] = VISITED;
        let nextRow = pos[0] + vectors[vectorIdx][0];
        let nextCol = pos[1] + vectors[vectorIdx][1];

        if (nextRow >= height || nextCol >= width || nextRow < 0 || nextCol < 0 || matrix[nextRow][nextCol] === VISITED) {
            vectorIdx = (vectorIdx + 1) % 4;
            nextRow = pos[0] + vectors[vectorIdx][0];
            nextCol = pos[1] + vectors[vectorIdx][1];
        }

        pos[0] = nextRow;
        pos[1] = nextCol;
        cnt += 1;
    }

    return result
};