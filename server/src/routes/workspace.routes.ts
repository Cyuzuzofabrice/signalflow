import { Router } from "express";
import {
  listWorkspaces,
  getWorkspace,
  editWorkspace,
} from "../controllers/workspace.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";

const router = Router();

router.use(authenticate);

router.get("/", listWorkspaces);
router.get("/:workspaceId", getWorkspace);
router.patch("/:workspaceId", editWorkspace);

export default router;