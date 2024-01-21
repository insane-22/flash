import express from "express";
import "dotenv/config";
import env from "./util/validateEnv";
import connectDB from "./config/db";
import noteRoutes from "./routes/noteRoute";
import authRoutes from "./routes/authRoute";
import morgan from "morgan";
import cors from "cors";
import session from "express-session";
import MongoStore from "connect-mongo";

const app = express();
const port = env.PORT;
connectDB();

app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

app.use(
  session({
    secret: env.SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 3 * 60 * 60 * 1000,
    },
    rolling: true,
    store: MongoStore.create({
      mongoUrl: env.MONGO_URL,
    }),
  })
);

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/notes", noteRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
