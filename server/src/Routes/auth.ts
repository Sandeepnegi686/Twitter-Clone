import express, { Request, Response } from "express";
// import { loginUser, signOut, signUp } from "../Controller/authController";
// import passport from "passport";
import jwt from "jsonwebtoken";
import { loginUser, signUp } from "../Controller/UserController";
// import authenticateUser from "../middleware/authMiddleware";

const router = express.Router();
const CLIENT_URL = process.env.CLIENT_URL || "";
const JWT_SECRET = process.env.JWT_SECRET || "";

router.post("/signup", signUp);
router.post("/login", loginUser);
// router.get("/logout", signOut);

// router.get(
//   "/google",
//   passport.authenticate("google", { scope: ["profile", "email"] }),
// );

// router.get(
//   "/google/callback",
//   passport.authenticate("google", {
//     failureRedirect: `${CLIENT_URL}/auth`,
//     session: false,
//   }),
//   (req: Request, res: Response) => {
//     // Successful authentication, redirect home.
//     const user = req.user as any;

//     const data = { _id: user._id, name: user.name, email: user.email };
//     const token = jwt.sign(data, JWT_SECRET, {
//       expiresIn: 60 * 60 * 24, // 1 day
//     });
//     res.cookie("access-token", token, {
//       maxAge: 1000 * 60 * 60 * 24,
//       httpOnly: true,
//     });
//     return res.redirect(`${CLIENT_URL}/auth-successfull`);
//   },
// );
// router.get("/me", authenticateUser, (req: Request, res: Response) => {
//   return res.status(200).json({ s: true, d: req.user });
// });

export default router;
