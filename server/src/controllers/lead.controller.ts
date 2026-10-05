import type { Response } from "express";
import type { AuthRequest } from "../middleware/auth.middleware.js";
import {
  createLeadSchema,
  updateLeadSchema,
} from "../validators/lead.validator.js";
import {
  createLead,
  deleteLead,
  getLeadById,
  getLeads,
  updateLead,
} from "../services/lead.service.js";

function getWorkspaceId(req: AuthRequest) {
  const workspaceId = req.params.workspaceId;

  if (typeof workspaceId !== "string" || !workspaceId) {
    return null;
  }

  return workspaceId;
}

function getLeadId(req: AuthRequest) {
  const leadId = req.params.leadId;

  if (typeof leadId !== "string" || !leadId) {
    return null;
  }

  return leadId;
}

export async function createWorkspaceLead(
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

    if (!workspaceId) {
      res.status(400).json({
        success: false,
        message: "Workspace ID is required",
      });
      return;
    }

    const input = createLeadSchema.parse(req.body);

    const lead = await createLead(
      req.userId,
      workspaceId,
      input,
    );

    res.status(201).json({
      success: true,
      data: lead,
    });
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === "Workspace not found") {
        res.status(404).json({
          success: false,
          message: error.message,
        });
        return;
      }

      if (error.name === "ZodError") {
        res.status(400).json({
          success: false,
          message: "Invalid lead data",
          errors: error,
        });
        return;
      }

      res.status(400).json({
        success: false,
        message: error.message,
      });
      return;
    }

    res.status(500).json({
      success: false,
      message: "Failed to create lead",
    });
  }
}

export async function listWorkspaceLeads(
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

    if (!workspaceId) {
      res.status(400).json({
        success: false,
        message: "Workspace ID is required",
      });
      return;
    }

    const leads = await getLeads(
      req.userId,
      workspaceId,
    );

    res.status(200).json({
      success: true,
      data: leads,
    });
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === "Workspace not found") {
        res.status(404).json({
          success: false,
          message: error.message,
        });
        return;
      }

      res.status(400).json({
        success: false,
        message: error.message,
      });
      return;
    }

    res.status(500).json({
      success: false,
      message: "Failed to fetch leads",
    });
  }
}

export async function getWorkspaceLead(
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

    const lead = await getLeadById(
      req.userId,
      workspaceId,
      leadId,
    );

    res.status(200).json({
      success: true,
      data: lead,
    });
  } catch (error) {
    if (error instanceof Error) {
      if (
        error.message === "Workspace not found" ||
        error.message === "Lead not found"
      ) {
        res.status(404).json({
          success: false,
          message: error.message,
        });
        return;
      }

      res.status(400).json({
        success: false,
        message: error.message,
      });
      return;
    }

    res.status(500).json({
      success: false,
      message: "Failed to fetch lead",
    });
  }
}

export async function editWorkspaceLead(
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

    const input = updateLeadSchema.parse(req.body);

    if (Object.keys(input).length === 0) {
      res.status(400).json({
        success: false,
        message: "At least one field is required",
      });
      return;
    }

    const lead = await updateLead(
      req.userId,
      workspaceId,
      leadId,
      input,
    );

    res.status(200).json({
      success: true,
      data: lead,
    });
  } catch (error) {
    if (error instanceof Error) {
      if (
        error.message === "Workspace not found" ||
        error.message === "Lead not found"
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
          message: "Invalid lead data",
          errors: error,
        });
        return;
      }

      res.status(400).json({
        success: false,
        message: error.message,
      });
      return;
    }

    res.status(500).json({
      success: false,
      message: "Failed to update lead",
    });
  }
}

export async function removeWorkspaceLead(
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

    const result = await deleteLead(
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
        error.message === "Lead not found"
      ) {
        res.status(404).json({
          success: false,
          message: error.message,
        });
        return;
      }

      res.status(400).json({
        success: false,
        message: error.message,
      });
      return;
    }

    res.status(500).json({
      success: false,
      message: "Failed to delete lead",
    });
  }
}