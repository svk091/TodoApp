import { Hono } from "hono";
import userRoute from "./user";

const rootRouter = new Hono();

rootRouter.route("/user", userRoute);
export default rootRouter;
