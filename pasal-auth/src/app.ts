import express from "express";
import "express-async-errors";
import cors from "cors";
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
import { profileRouter } from "./routes/profile";
import { teamRouter } from "./routes/team";

// process.env.ALLOWED_ORIGINS
const allowedOrigins =  process.env.ALLOWED_ORIGINS|| "*";

//
const app = express();

// Enbling CORS only for the development purpose

const isProd = () => {
  return process.env.NODE_ENV === "production";
}

app.use(json());
app.use(
  cors({
    origin: allowedOrigins,
  })
);
app.set("trust proxy", true);
app.use(
  cookieSession({
    signed: isProd(),
    secure: isProd(),
    httpOnly: isProd(),
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
app.use(profileRouter);
app.use(teamRouter);
app.all("*", async (req, res) => {
  throw new NotFoundError("Route did not find");
});

console.log("well this is working")
app.use(errorHandler);

export { app };
