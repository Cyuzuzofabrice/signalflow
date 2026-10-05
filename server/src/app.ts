import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import authRoutes from "./routes/auth.routes.js";
import protectedRoutes from "./routes/protected.routes.js";
import workspaceRoutes from "./routes/workspace.routes.js";
import icpRoutes from "./routes/icp.routes.js";
import leadRoutes from "./routes/lead.routes.js";
import signalRoutes from "./routes/signal.routes.js";
import qualificationRoutes from "./routes/qualification.routes.js";
import aiRoutes from "./routes/ai.routes.js";
const app = express();

app.use(helmet());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV !== "test") {
  app.use(morgan("dev"));
}

app.get("/api/health", (_req, res) => {
  res.status(200).json({
    status: "ok",
    service: "SignalFlow API",
    timestamp: new Date().toISOString(),
  });
});
app.use("/api/auth", authRoutes);
app.use("/api/protected", protectedRoutes);
app.use("/api/workspaces", workspaceRoutes);
app.use("/api/workspaces", icpRoutes);
app.use("/api/workspaces", leadRoutes);
app.use("/api/workspaces", signalRoutes);
app.use("/api/workspaces", qualificationRoutes);
app.use("/api/workspaces", aiRoutes);
export default app;