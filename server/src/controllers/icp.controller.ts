
import type { Response } from "express";
import type { AuthRequest } from "../middleware/auth.middleware.js";
import {
  createIcpSchema,
  updateIcpSchema,
} from "../validators/icp.validator.js";
import {
  createIcp,
  deleteIcp,
  getIcp,
  updateIcp,
} from "../services/icp.service.js";

function getWorkspaceId(req: AuthRequest) {
  const workspaceId = req.params.workspaceId;

  if (typeof workspaceId !== "string" || !workspaceId) {
    return null;
  }

  return workspaceId;
}

export async function getWorkspaceIcp(
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

    const icp = await getIcp(
      req.userId,
      workspaceId,
    );

    res.status(200).json({
      success: true,
      data: icp,
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
      message: "Failed to fetch ICP",
    });
  }
}

export async function createWorkspaceIcp(
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

    const input = createIcpSchema.parse(req.body);

    const icp = await createIcp(
      req.userId,
      workspaceId,
      input,
    );

    res.status(201).json({
      success: true,
      data: icp,
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

      if (
        error.message.includes("permission")
      ) {
        res.status(403).json({
          success: false,
          message: error.message,
        });
        return;
      }

      if (
        error.message.includes("already exists")
      ) {
        res.status(409).json({
          success: false,
          message: error.message,
        });
        return;
      }

      if (
        error.name === "ZodError"
      ) {
        res.status(400).json({
          success: false,
          message: "Invalid ICP data",
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
      message: "Failed to create ICP",
    });
  }
}

export async function editWorkspaceIcp(
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

    const input = updateIcpSchema.parse(req.body);

    if (Object.keys(input).length === 0) {
      res.status(400).json({
        success: false,
        message: "At least one field is required",
      });
      return;
    }

    const icp = await updateIcp(
      req.userId,
      workspaceId,
      input,
    );

    res.status(200).json({
      success: true,
      data: icp,
    });
  } catch (error) {
    if (error instanceof Error) {
      if (
        error.message === "Workspace not found" ||
        error.message === "ICP not found"
      ) {
        res.status(404).json({
          success: false,
          message: error.message,
        });
        return;
      }

      if (
        error.message.includes("permission")
      ) {
        res.status(403).json({
          success: false,
          message: error.message,
        });
        return;
      }

      if (error.name === "ZodError") {
        res.status(400).json({
          success: false,
          message: "Invalid ICP data",
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
      message: "Failed to update ICP",
    });
  }
}

export async function removeWorkspaceIcp(
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

    const result = await deleteIcp(
      req.userId,
      workspaceId,
    );

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    if (error instanceof Error) {
      if (
        error.message === "Workspace not found" ||
        error.message === "ICP not found"
      ) {
        res.status(404).json({
          success: false,
          message: error.message,
        });
        return;
      }

      if (
        error.message.includes("permission")
      ) {
        res.status(403).json({
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
      message: "Failed to delete ICP",
    });
  }
}
