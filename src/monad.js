/* 
-- Promise에 대하여 --
콜백지옥을 해결하기 위해 만들어진게 Promise인데 
Promise의 핵심 포인트는 then을 사용하여 순차적인 처리를 하는 컨셉이 아니라 
비동기 상황을 일급 값으로 다룬다는 점에서 특별하다고 봐야 한다! (비동기 상황을 코드로서 다루는게 아니고 값으로서 다룬다.)
일급 -> 변수에 담길 수도 있고, 함수의 인자로 전달될수도 있고, 반환될 수도 있는 상황을 생각해야 함.
*/

function add20(a) {
  return new Promise((resolve) => setTimeout(() => resolve(a + 20), 1000));
}

// const ex1 = add20(5).then(add20).then(add20);
// 이렇게 비동기 상황을 값으로 받아놓고,
// ex1.then((a) => a * 10);
// 이렇게 then을 통해서 이어서 무언가를 할 수 있다.

const delay100 = (a) =>
  new Promise((resolve) => setTimeout(() => resolve(a), 100));

// a가 Promise면 기다렸다가 f실행, 아니면 그냥 f실행
const go1 = (a, f) => (a instanceof Promise ? a.then(f) : f(a));

const add5 = (a) => a + 5;

const n1 = 10;
go1(go1(n1, add5), console.log);

const n2 = delay100(10);
go1(go1(n2, add5), console.log);
// 이렇게 하니까 완전히 동일한 pipe line에 대해서
// 일반 값, 비동기 상황 값을 넣었을때 완전히 결과가 같음을 보장되는 함수를 만들었다.

// 모나드 : 함수 합성을 안전하게 도와주는 도구
// 비동기 상황에선 이게 Promise이다

const g = (a) => a + 1;
const f = (a) => a * a;

// 함수의 합성 방법
console.log(f(g(1))); // case1
[1] // 여기서는 모나드에서 말하는 박스가 배열이다. 배열이 곧 모나드라고 볼 수 있다 (안전한 합성을 보장하기 때문)
  .map(g) // 배열은 map을 이용해서 함수를 합성한다.
  .map(f) // 여기까지는 배열. 계속 이어서 무언가를 할 수 있다.
  .forEach((r) => console.log(r)); // case2 안전한 합성 방법 (계속해서 상태가 배열임을 보장한다.)
// 이렇게 함으로써 박스(배열)안의 값이 몇개이던 안전하게, 중간에 함수를 추가로 사용해도 안전하게 합성됨을 보장받는다.

// 위의 Array와 같이 Promise는 함수 합성에서 어떤 성질을 띄고 있을까?
// Array.of(1) => [1] 배열 객체를 만듬
// Promise.resolve(1) => Promise { <resolved>: 1 } 프로미스 객체를 만듬
// Promise는 then을 이용해서 함수를 합성한다.

// 모나드에서 말하는 박스가 Promise이다. Promise가 곧 모나드이며 안전한 합성을 보장하기 때문이다.
Promise.resolve(1) // 함수를 합성하는 시점을 안전하게 만든다.
  .then(g)
  .then(f)
  .then((r) => console.log(r)); // 비동기 상황에서의 안전한 합성을 Promise를 통해서 구현. (계속해서 상태가 Promise임을 보장한다.)
// 즉 모나드의 뜻이 중요한게 아니라 안전한 합성을 하기 위해서 어떤 상황을 만들어야 하는가? 가 중요한 포인트이다.
