# 첫번째 아이디어

뒤에서 부터 시작하여 가장 멀리 닿을 수 있는 곳을 찾는다.

닿을 수 있는곳부터 다시 시작하여 찾기를 반복하여 0에 이르면 0 ~ 끝까지 닿을 수 있다는 것이 된다.

var canJump = function(nums) {
    let idx = nums.length - 1;
    let curIdx = idx;

    while(idx > 0) {
        for(let i = idx - 1; i >= 0; i--) {
            if (nums[i] >= idx - i) {
                curIdx = i;
            }
        }

        if (curIdx === idx) return false;

        idx = curIdx;
    }
    
    return true;
};


# 두번째 아이디어

dp[i] = i번만에 최종에 도착할 수 있는 가장 작은 인덱스

dp를 업데이트 하는 방법:
- i를 맨 뒤부터 앞으로 순회한다.
- 각 순회에서
  - dp에 현재 인덱스에서 닿을 수 있는 곳이 있는지 조사한다.
  - 있다면 그 인덱스의 dp를 업데이트해준다.

마지막에 dp에 0이 있다면 0에서 출발하여 최종에 이를 수 있다는 뜻이된다.

var canJump = function(nums) {
    const dp = [nums.length - 1];
    let dpIdx = 1;
    
    for(let i = nums.length - 2; i >= 0; i--) {
        for(let j = 0; j < dp.length; j++) {
            if (dp[j] - i <= nums[i]) {
                dp[j + 1] = i;
                break;
            }
        }
    }
    
    return dp.includes(0);
};

문제에 비해 너무 복잡하게 생각했던 것 같았다.
그리고 닿을 곳이 없는 경우에 대해 빠른 종료가 불가능했다.


# 최종 아이디어 - 반복문으로 border를 체크하며 순회하기


`마지막 원소까지 가기 위해서는 border를 점점 확장하면서 닿을 수 있어야한다`

라는 생각이 들었다.

j를 순회하며 최대 border를 늘려나간다.
j가 border밖이라면 도달할 수 없으므로 false를 리턴.
끝까지 체크했다면 도달할 수 없는 부분이 없으므로 true를 리턴.


var canJump = function(nums) {
    let border = 0 + nums[0];

    for (let j = 0; j < nums.length; j++) {
        if (j > border) return false;
        border = Math.max(j + nums[j], border);
    }
    return true;
};



성능을 위해 Math.max 호출 대신 if문과 newBorder 변수를 이용해주면 더 빠르다.

var canJump = function(nums) {
    let border = 0 + nums[0];
    let newBorder = 0;

    for (let j = 0; j < nums.length; j++) {
        if (j > border) return false;

        newBorder = j + nums[j];

        if (border < newBorder) {
            border = newBorder;
        }
    }
    return true;
};
