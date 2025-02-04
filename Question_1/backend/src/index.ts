import dotenv from "dotenv";
import express, { Express, Request, Response } from "express";
import { MainRouter } from "./routes";
import Logger from "./utils/logger";
import cors from "cors";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.use("/api", MainRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("Server is running...");
});

app.listen(port, () => {
  Logger(`Server is running on http://localhost:${port}`, "info");
});
