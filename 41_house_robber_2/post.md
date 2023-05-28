기존 house robber와 거의 같으나, 원순열이라는 점만 다르다.

즉 같은 조건에 맨 첫 집과 마지막 집이 인접해있다는 것이다.

이를 어떻게 체크해줄까 고민하다가, 그냥 house robber의 솔루션을 fn이라 할 때
MAX(fn(0, n - 1), fn(1, n))해주는게 간단하겠다고 생각해서 그렇게 구현했다.

속도도 준수하게 나왔다.

var rob = function(nums) {
    if (nums.length === 1 || nums.length === 2) return Math.max(...nums);

    const fn = (nums) => {
        let pprev = 0;
        let prev = nums[0];
        let cur = 0;

        for(let i = 1; i < nums.length; i++ ) {
            cur = Math.max(pprev + nums[i], prev);

            pprev = prev;
            prev = cur;
        }
        return cur;
    }

    return Math.max(fn(nums.slice(1)), fn(nums.slice(0, nums.length - 1)));
};