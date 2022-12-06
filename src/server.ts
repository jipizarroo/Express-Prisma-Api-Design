import express from "express";

import cors from "cors";
import morgan from "morgan";

import { createNewUser, signIn } from "./handlers/user";
import { protect } from "./modules/auth";
import router from "./router";

const app = express();

const customLogger = (message) => (req, res, next) => {
  console.log(`Hello from ${message}`);
  next();
};

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(customLogger("custom logger"));

app.use((req, res, next) => {
  req.shhhh_secret = "doggy";
  next();
});

app.get("/", (req, res, next) => {
  res.json({ message: "hello" });
});

app.use("/api", protect, router);

app.post("/user", createNewUser);
app.post("/signin", signIn);

app.use((err, req, res, next) => {
  if (err.type === "auth") {
    res.status("403");
    res.json({ message: "no autorizado" });
  } else if (err.type === "input") {
    res.status("400").json({ message: "invalid input" });
  } else {
    res.status("500").json({ message: "oops thats on us." });
  }
});

export default app;
