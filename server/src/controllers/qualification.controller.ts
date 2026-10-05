
import type { Response } from "express";
import type { AuthRequest } from "../middleware/auth.middleware.js";
import { qualifyLeadSchema } from "../validators/qualification.validator.js";
import { qualifyLead } from "../services/qualification.service.js";

function getWorkspaceId(req: AuthRequest) {
  const workspaceId = req.params.workspaceId;

  if (
    typeof workspaceId !== "string" ||
    !workspaceId
  ) {
    return null;
  }

  return workspaceId;
}

function getLeadId(req: AuthRequest) {
  const leadId = req.params.leadId;

  if (
    typeof leadId !== "string" ||
    !leadId
  ) {
    return null;
  }

  return leadId;
}

export async function qualifyWorkspaceLead(
  req: AuthRequest,
  res: Response,
) {
  try {
    if (!req.userId) {
      res.status(401).json({
        success: false,
        message: "Authentication required",
      });
      return;
    }

    const workspaceId = getWorkspaceId(req);
    const leadId = getLeadId(req);

    if (!workspaceId) {
      res.status(400).json({
        success: false,
        message: "Workspace ID is required",
      });
      return;
    }

    if (!leadId) {
      res.status(400).json({
        success: false,
        message: "Lead ID is required",
      });
      return;
    }

    qualifyLeadSchema.parse(req.body ?? {});

    const result = await qualifyLead(
      req.userId,
      workspaceId,
      leadId,
    );

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    if (error instanceof Error) {
      if (
        error.message === "Workspace not found" ||
        error.message === "Lead not found" ||
        error.message ===
          "ICP is not configured for this workspace"
      ) {
        res.status(404).json({
          success: false,
          message: error.message,
        });
        return;
      }

      if (error.name === "ZodError") {
        res.status(400).json({
          success: false,
          message: "Invalid qualification request",
          errors: error,
        });
        return;
      }

      console.error(
        "Qualify lead error:",
        error,
      );

      res.status(400).json({
        success: false,
        message: error.message,
      });

      return;
    }

    res.status(500).json({
      success: false,
      message: "Failed to qualify lead",
    });
  }
}
