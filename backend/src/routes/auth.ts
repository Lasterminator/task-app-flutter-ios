import { Router, Request, Response } from "express";
import { db } from "../db";
import { NewUser, users } from "../db/schema";
import { eq } from "drizzle-orm";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

const authRouter = Router();

interface SignUpBody {
  name: string;
  email: string;
  password: string;
}

interface LoginBody {
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
      const [existingUser] = await db
        .select()
        .from(users)
        .where(eq(users.email, email));

      if (existingUser) {
        res
          .status(400)
          .json({ error: "A User already exists with same email" });
        return;
      }

      // hash password
      const hashedPassword = await bcryptjs.hash(password, 8);

      // create user
      const newUser: NewUser = {
        name,
        email,
        password: hashedPassword,
      };

      const [user] = await db.insert(users).values(newUser).returning();
      res.status(201).json(user);
    } catch (e) {
      res.status(500).json({ error: e });
    }
  }
);

authRouter.post(
  "/login",
  async (req: Request<{}, {}, LoginBody>, res: Response) => {
    try {
      // get req body
      const { email, password } = req.body;
      // check if user exists
      const [existingUser] = await db
        .select()
        .from(users)
        .where(eq(users.email, email));

      if (!existingUser) {
        res.status(400).json({ error: "User with this email does not exist" });
        return;
      }

      // match password
      const isMatch = await bcryptjs.compare(password, existingUser.password);
      if (!isMatch) {
        res.status(400).json({ error: "Invalid password" });
        return;
      }

      const token = jwt.sign({ id: existingUser.id }, "passwordKey");

      res.json({ token, ...existingUser });
    } catch (e) {
      res.status(500).json({ error: e });
    }
  }
);

authRouter.post("/tokenIsValid", async (req, res) => {
  try {
    // get the header
    const token = req.header("x-auth-token");
    if (!token)  {res.json(false); return;}

    //verify token
    const verified = jwt.verify(token, "passwordKey");
    if (!verified) {res.json(false); return;}

    //get user data if token is verified
    const verifiedToken = verified as { id: string };

    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.id, verifiedToken.id));

      if (!user) {res.json(false); return;}
      res.json(true);
  } catch (e) {
    res.json(false);
  }
});

authRouter.get("/", (req, res) => {
  res.send("Welcome to my page");
});

export default authRouter;
