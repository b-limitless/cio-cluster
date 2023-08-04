import express from "express";
import "express-async-errors";
import { json } from "body-parser";
import cookieSession from "cookie-session";
import { signInRouter } from "./routes/signin";
import { signupRouter } from "./routes/signup";
import { signoutRouter } from "./routes/signout";
import { permissionRouter } from "./routes/permission";
import { resetPasswordRouter } from "./routes/reset-password";
import { errorHandler, NotFoundError, currentUser } from "@pasal/common";
import { currentUserRouter } from "./routes/current-user";
import { verificationRouter } from "./routes/verify";
import { KYCRouter } from "./routes/kyc";
import { userRouter } from "./routes/user";

// 
const app = express();
app.set("trust proxy", true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    // maxAge: 3600000, 
  })
);

app.use(currentUser);
app.use(currentUserRouter);
app.use(signInRouter);
app.use(signupRouter);
app.use(signoutRouter);
app.use(resetPasswordRouter);
app.use(permissionRouter);
app.use(verificationRouter);
app.use(KYCRouter);
app.use(userRouter);
app.all("*", async (req, res) => {
  throw new NotFoundError("Route did not find");
});

app.use(errorHandler);

export { app };
