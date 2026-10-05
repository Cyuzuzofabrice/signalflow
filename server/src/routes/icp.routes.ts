
import { Router } from "express";
import {
  createWorkspaceIcp,
  editWorkspaceIcp,
  getWorkspaceIcp,
  removeWorkspaceIcp,
} from "../controllers/icp.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";

const router = Router();

router.use(authenticate);

router.get(
  "/:workspaceId/icp",
  getWorkspaceIcp,
);

router.post(
  "/:workspaceId/icp",
  createWorkspaceIcp,
);

router.patch(
  "/:workspaceId/icp",
  editWorkspaceIcp,
);

router.delete(
  "/:workspaceId/icp",
  removeWorkspaceIcp,
);

export default router;
