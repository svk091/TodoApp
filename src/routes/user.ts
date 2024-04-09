import { Hono } from "hono";
import { z } from "zod";
import { User } from "../db";
const userRoute = new Hono();
const signupBody = z.object({
  email: z.string().email(),
  firstName: z.string(),
  lastName: z.string(),
  password: z.string(),
});

userRoute.post("/signup", async (c) => {
  const body = await c.req.json();
  const { success } = signupBody.safeParse(body);
  if (!success) {
    return c.json({
      msg: "Zod Validation Failed",
    });
  }
  try {
    const isExistingUser = await User.findOne({
      email: body.email,
    });
    if (isExistingUser) {
      return c.json({
        msg: "Email already exist",
      });
    }
    const newUser = await User.create({
      email: body.email,
      firstName: body.firstName,
      lastName: body.lastName,
      password: body.password,
    });
    return c.json({
      newUser,
    });
  } catch (e) {
    return c.json({
      msg: "App  Crashed bro",
      eror: e,
    });
  }
});

export default userRoute;
