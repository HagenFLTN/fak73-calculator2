import { error } from "console";
import { Hono } from "hono";

export const calculator = new Hono();

let state = 0;

calculator.get("/add", (c) => {
  const { y } = c.req.query();
  if (!y || isNaN(parseInt(y)))
    return c.json({ error: "No y provided!" }, 400);
  state = state + parseInt(y);

  return c.json({
    result: state,
  });
});

calculator.get("/reset", (c) => {
  state = 0;
  return c.json({
    message: "state succesfully resettet",
    result: state,
  });
});

calculator.get("/stateless-add", (c) => {
  const { x, y } = c.req.query();
  if (!y || isNaN(parseInt(y)) || !x || isNaN(parseInt(x)))
    return c.json({ error: "No y provided" }, 400);

  state = parseInt(y) + parseInt(x);

  return c.json({
    result: state,
  });
});

calculator.get("/crash", (c) => {
  console.log({ message: "Shutdown Bra" });
  process.exit();
});

calculator.get("/stress", (c) => {
  function stressCPU() {
    while (true) {
      Math.pow(Math.random(), Math.random());
    }
  }

  return c.json({ message: "stressing CPU" });
});
