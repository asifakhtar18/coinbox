import dotenv from "dotenv";
dotenv.config();

import cors from "cors";
import express, { Request, Response, NextFunction } from "express";

import { connectToDb } from "./utils/dbConfig";
import { PORT } from "./utils/contanst";

//routes
import authRoutes from "./routes/authRoutes";
import connectionRoutes from "./routes/connectionRoutes";
import groupRoutes from "./routes/groupRoutes";
import payementRoutes from "./routes/paymentRoutes";
const app = express();

app.use(express.json());
app.use(cors({ origin: "*" }));

app.use("/api", authRoutes);
app.use("/api", groupRoutes);
app.use("/api", connectionRoutes);
app.use("/api", payementRoutes);

app.get("/hello-world", (req, res) => {
  console.log("Hello World from server");
  res.send("Hello World");
});

const startServer = async () => {
  try {
    await connectToDb();
    app.listen(PORT, () => {
      console.log(`Example app listening on port ${PORT}`);
    });
  } catch (err) {
    console.error("Failed to start server", err);
    process.exit(1);
  }
};

const handleErrors = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err);
  res.status(500).send({ message: "Internal Server Error" });
};

app.use(handleErrors);

startServer();
