import { log, map, reduce, filter, go, pipe, join, L } from "./fx.js";

// 데이터 객체를 쿼리 스트링으로 만들어보는 예제
const data = {
  limit: 10,
  offset: 10,
  type: "notice",
};

const queryStr = pipe(
  L.entries,
  L.map(([k, v]) => `${k}=${v}`),
  join("&")
);

log(queryStr(data));
