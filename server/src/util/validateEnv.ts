import { cleanEnv, port, str } from "envalid";

export default cleanEnv(process.env, {
  MONGO_URL: str(),
  PORT: port(),
  SECRET: str(),
});
