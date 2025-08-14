import express from "express";
import cors from "cors";
import transcribeRoute from "./routes/transcribe";
import translateRoute from "./routes/translate";
import transcriptionRoute from "./routes/trancription";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/transcribe", transcribeRoute);
app.use("/translate", translateRoute);
app.use("/transcriptions", transcriptionRoute)

export default app;
