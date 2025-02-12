import { Hono } from "hono";
import * as os from "os";
import { calculator } from "./routes/calculator";

const app = new Hono();

app.get("/", (c) => {
  return c.text(`Hello from ${os.hostname()}!`);
});

//cinnect routes
app.route("/calc", calculator);

app.post("/stateless-add?x=1&y=2");

export default {
  fetch: app.fetch,
  port: 8080,
};
