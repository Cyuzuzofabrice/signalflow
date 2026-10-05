import { Router } from "express";
import {
  createWorkspaceLead,
  editWorkspaceLead,
  getWorkspaceLead,
  listWorkspaceLeads,
  removeWorkspaceLead,
} from "../controllers/lead.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";

const router = Router();

router.use(authenticate);

router.get(
  "/:workspaceId/leads",
  listWorkspaceLeads,
);

router.post(
  "/:workspaceId/leads",
  createWorkspaceLead,
);

router.get(
  "/:workspaceId/leads/:leadId",
  getWorkspaceLead,
);

router.patch(
  "/:workspaceId/leads/:leadId",
  editWorkspaceLead,
);

router.delete(
  "/:workspaceId/leads/:leadId",
  removeWorkspaceLead,
);

export default router;