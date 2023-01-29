/* 
Kleisli Composition관점에서의 Promise
오류가 있을 수 있는 함수 합성 상황에서의 안전함을 보장하는 규칙

항상 안전한 계산만이 보장되는 수학에서의 함수와 달리 
현대 프로그래밍에서는 외부의 요소에 의존할 수 밖에 없는 상황이 반드시 생긴다.
따라서 원하는대로 프로그래밍 되지 않을 수 있는 가능성이 존재하게 된다.

Kleisli Composition
1. 함수의 인자가 부적절하게 들어온 상황
2. 어떤 함수가 의존하고 있는 외부의 상태에 의해서 결과를 정확히 전달할 수 없는 상황
위와 같은 에러 상황에서의 해결을 제공하기 위한 방법이다.

예시
f(g(x)) = f(g(x)) 수학에서 다음 등식은 생각할 필요도 없이 당연히 좌변 우변 값이 같다.
하지만 프로그래밍에서는 예를들어 f가 바라보고 있는 값 g(x)가 상황에 따라서 달라질 수 있는데
이럴경우에 위의 등식은 타이밍에 따라서 자칫 성립이 안될 수 있다는 오류 상황을 생각할 수 있다.

그렇다면 위의 상황에서 만일 g(x)에서 에러가 났다고 가정했을때
에러가 난 경우에 한정해서는 f(g(x))의 값이 g(x)와 같게, 즉 f를 씌웠지만 안씌운 것 처럼 동작하게 하면 어떨까?
이러한 합성 방법을 Kleisli Composition이라고 한다
*/

import { find } from "./fx.js";

const users = [
  { id: 1, name: "aa" },
  { id: 2, name: "bb" },
  { id: 3, name: "cc" },
];

const getUserById = (id) =>
  find((u) => u.id === id, users) || Promise.reject("nothing!!");

// '유저 데이터 받아옴 -> 이름만 추출' 을 하려고 다음과 같은 함수 두개를 준비함.
const f = ({ name }) => name;
const g = getUserById;

// const fg = id => f(g(id))
// f(g(2))이렇게 했을때 당연히 문제없이 되지만 만약에 users의 값이 pop된다면? 에러가 발생하게 된다.

const fg = (id) =>
  Promise.resolve(id)
    .then(g)
    .then(f)
    .catch((a) => a); // 에러시에는 reject상태의 Promise를 반환할 수 있게 함수를 구성하여 catch에서 걸릴 수 있게 구성
// g에서 에러가 났을때 f(g(2)) 값과 g(2)는 nothing!!으로 같을 수 있게 된다

fg(2).then(console.log);
