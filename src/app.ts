import express from "express";
import cors from "cors";
import transcribeRoute from "./routes/transcribe";
import translateRoute from "./routes/translate";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/transcribe", transcribeRoute);
app.use("/translate", translateRoute);

export default app;
