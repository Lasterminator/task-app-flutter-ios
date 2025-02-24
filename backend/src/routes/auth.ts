import { Router, Request, Response } from "express";
import { eq } from "drizzle-orm";
import { db } from "../db";
import { users } from "../db/schema";

const authRouter = Router();

interface SignUpBody {
  name: string;
  email: string;
  password: string;
}

authRouter.post(
  "/signup",
  async (req: Request<{}, {}, SignUpBody>, res: Response) => {
    try {
      // get req body
      const { name, email, password } = req.body;
      // check if user exists
      const existingUser = await db
        .select()
        .from(users)
        .where(eq(users.email, email));

      if (existingUser.length > 0) {
        res.status(400).json({ error: "User already exists" });
        return;
      }

      // hash password
      // create user
    } catch (e) {
      res.status(500).json({ error: e });
    }
  }
);

authRouter.get("/", (req, res) => {
  res.send("Welcome to my page");
});

export default authRouter;
