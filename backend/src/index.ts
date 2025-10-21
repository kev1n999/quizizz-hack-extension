import "dotenv/config";
import express from "express";
import router from "./routes/routes";
import { constants } from "./constants";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());

app.use(
  cors({
    origin: [
      "https://wayground.com",
      "chrome-extension://",
    ],
  })
);

app.use("/api", router);

app.listen(Number(constants.port), () => {
  console.log(`http://localhost:${constants.port}`);
});
