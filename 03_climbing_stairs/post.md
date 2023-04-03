풀이 1. 수학을 사용

중고등학교 쯤 배운 내용 중에 "같은 것이 있는 경우의 배열"에 대한 공식이 있었다.
총 n개 중, A가 a개, B가 b개, ... C가 c개라면,
n! / (a!b!c!)
으로 계산할 수 있다.

이 공식이 떠올라서 바로 적용해보았다.

input이 2n인 경우:
ex) 2n = 6 (n = 3)
가능한 2와 1의 조합
222
2211
21111
111111
여기서 2가 하나씩 줄어들며 1이 두개씩 늘어나는 것을 볼 수 있다.

이를 수식으로 나타내면 다음과 같다.

S(k = 0 ~ n) { (n + k)! / (n - k)!(2k)! }

n-k를 2의 개수라고 생각하면 쉽다.
k가 증가하면서 2의 개수는 1씩 줄어들고, 총 개수(분자)는 1씩 늘어난다. 1의 개수는 2씩 늘어난다.

input이 2n - 1인 경우:
즉, 홀수에 대해서도 마찬가지로 계산해줬다.
S(k = 0 ~ n) { (n + k + 1)! / (n - k)!(2k + 1)! }

그럼 얘를 코드로 표현만 해주면 끝난다.

```ts
function climbStairs(n: number): number {
    const isOdd = Boolean(n % 2);
    const num = isOdd ? (n - 1) / 2 : n / 2; 

        let res = 0;
        for(let k = 0; k <= num; k ++) {
            let dividend = 1;
            let divisor = 1;

            for(let j = 0; j < (isOdd ? 2 * k + 1 : 2 * k); j++) {
                dividend *= num - k + j + 1;
                divisor *= j + 1;
            }

            res += dividend / divisor;
        }
        return res;
    
};
```

사실 식이 답과 거리가 멀어 보였는데, 해보니 실행속도가 약 상위 10%로 생각보다 나쁘지 않았다.  

하지만 얘는 단순 DP문제라 DP로 푸는게 더 빠르다.

계산해보면 `A(n + 1) = A(n) + A(n - 1)` 의 익숙한 피보나치 수열이 나오는 것을 볼 수 있다.

n+1칸으로 가는 경우의 수: n번째 칸에서 1칸더 가는 경우 + n-1번째 칸에서 2칸 더 가는 경우

A(n)을 계산하기 위해 이전 값을 계속 사용하니, cache를 두고 dp로 개선할 수 있다.

```ts
let cache = { 1: 1, 2: 2 };

function climbStairs(n: number): number {
    !cache[n] &&
        (cache[n] = climbStairs(n - 1) + climbStairs(n - 2));
    
    return cache[n];

};
```