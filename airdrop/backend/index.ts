require("dotenv").config();
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import helmet from "helmet";
import hpp from "hpp";
import mongoSanitize from "express-mongo-sanitize";
import Session from "express-session";
import { corsOrigin } from "./config/cors";
import { eligibleRouter, registerRouter, siweRouter } from "./routes";

const app = express();

mongoose
  .connect("mongodb://localhost:27017/hbt-airdrop")
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("FAILED to connect to MongoDB: " + err));

// Middleware
app.use(cors({ origin: corsOrigin, credentials: true }));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(mongoSanitize());
app.use(hpp());
app.use(
  Session({
    name: "hbt-airdrop-example",
    // CHANGE ME
    secret: "hbt-airdrop-example-secret",
    resave: true,
    saveUninitialized: true,
    cookie: { secure: false, sameSite: true },
  })
);

const port = process.env.PORT || 5000;

app.use("/eligible", eligibleRouter);
app.use("/siwe", siweRouter);
app.use("/registration", registerRouter);

app.listen(port, () =>
  console.log(
    `Backend server started on port ${port} with environment: ${process.env?.NODE_ENV}.`
  )
);
