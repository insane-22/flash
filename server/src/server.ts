import express from "express";
import "dotenv/config";
import env from "./util/validateEnv";
import connectDB from "./config/db";
import noteRoutes from "./routes/noteRoute";
import authRoutes from "./routes/authRoute";
import morgan from "morgan";
import cors from "cors";
import { requireSignIn } from "./middleware/authMiddleware";

const app = express();
const port = env.PORT;
connectDB();

app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/notes", noteRoutes,requireSignIn);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
