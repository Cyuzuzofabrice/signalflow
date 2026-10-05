import { Router } from "express";
import {
  createWorkspaceSignal,
  editWorkspaceSignal,
  getWorkspaceSignal,
  listWorkspaceSignals,
  removeWorkspaceSignal,
} from "../controllers/signal.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";

const router = Router();

router.use(authenticate);

router.get(
  "/:workspaceId/signals",
  listWorkspaceSignals,
);

router.post(
  "/:workspaceId/signals",
  createWorkspaceSignal,
);

router.get(
  "/:workspaceId/signals/:signalId",
  getWorkspaceSignal,
);

router.patch(
  "/:workspaceId/signals/:signalId",
  editWorkspaceSignal,
);

router.delete(
  "/:workspaceId/signals/:signalId",
  removeWorkspaceSignal,
);

export default router;