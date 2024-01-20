import express from "express";
import "dotenv/config";
import env from "./util/validateEnv";
import connectDB from "./config/db";
import noteRoutes from "./routes/noteRoute";
import morgan from "morgan";
import cors from "cors";

const app = express();
const port = env.PORT;
connectDB();

app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

app.use("/api/v1/notes", noteRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
