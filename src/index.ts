import "reflect-metadata";
import express, { Request, Response } from "express";
import * as dotenv from "dotenv";
import bodyParser from "body-parser";
import { AppDataSource } from "./data-source";
import quizRoute from "./routes/quiz.route";

dotenv.config();
const app = express();
const port = process.env.PORT || 4000;

/** Parse the body of the request */
app.use(bodyParser.urlencoded({ limit: "1000mb", extended: true }));
app.use(bodyParser.json({ limit: "1000mb" }));
app.use(bodyParser.raw());
app.use(express.json());

/** Rules of our API */
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );

  if (req.method == "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }

  next();
});

/** Set the routes of our API */
app.use('/api/v1/quizs', quizRoute);


/** Error handling */
app.use((req:Request, res:Response,) => {
  const error = new Error("Not found");

  res.status(404).json({
    message: error.message,
  });
});

AppDataSource.initialize()
  .then(async () => {
    console.log("Database Connected");
  })
  .catch((error) => console.log(error));

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
