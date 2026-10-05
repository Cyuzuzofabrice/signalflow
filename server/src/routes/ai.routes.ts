import { Router } from "express";
import { authenticate } from "../middleware/auth.middleware.js";
import { analyzeWorkspaceRequest } from "../controllers/ai.controller.js";

const router = Router();

router.use(authenticate);

router.post(
  "/:workspaceId/ai/analyze",
  analyzeWorkspaceRequest,
);

export default router;