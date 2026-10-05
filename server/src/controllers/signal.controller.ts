import type { Response } from "express";
import type { AuthRequest } from "../middleware/auth.middleware.js";
import {
  createSignalSchema,
  updateSignalSchema,
} from "../validators/signal.validator.js";
import {
  createSignal,
  deleteSignal,
  getSignalById,
  getSignals,
  updateSignal,
} from "../services/signal.service.js";

function getWorkspaceId(req: AuthRequest) {
  const workspaceId = req.params.workspaceId;

  if (typeof workspaceId !== "string" || !workspaceId) {
    return null;
  }

  return workspaceId;
}

function getSignalId(req: AuthRequest) {
  const signalId = req.params.signalId;

  if (typeof signalId !== "string" || !signalId) {
    return null;
  }

  return signalId;
}

export async function createWorkspaceSignal(
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

    const input = createSignalSchema.parse(req.body);

    const signal = await createSignal(
      req.userId,
      workspaceId,
      input,
    );

    res.status(201).json({
      success: true,
      data: signal,
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
          message: "Invalid signal data",
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
      message: "Failed to create signal",
    });
  }
}

export async function listWorkspaceSignals(
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

    const signals = await getSignals(
      req.userId,
      workspaceId,
    );

    res.status(200).json({
      success: true,
      data: signals,
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
      message: "Failed to fetch signals",
    });
  }
}

export async function getWorkspaceSignal(
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
    const signalId = getSignalId(req);

    if (!workspaceId) {
      res.status(400).json({
        success: false,
        message: "Workspace ID is required",
      });
      return;
    }

    if (!signalId) {
      res.status(400).json({
        success: false,
        message: "Signal ID is required",
      });
      return;
    }

    const signal = await getSignalById(
      req.userId,
      workspaceId,
      signalId,
    );

    res.status(200).json({
      success: true,
      data: signal,
    });
  } catch (error) {
    if (error instanceof Error) {
      if (
        error.message === "Workspace not found" ||
        error.message === "Signal not found"
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
      message: "Failed to fetch signal",
    });
  }
}

export async function editWorkspaceSignal(
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
    const signalId = getSignalId(req);

    if (!workspaceId) {
      res.status(400).json({
        success: false,
        message: "Workspace ID is required",
      });
      return;
    }

    if (!signalId) {
      res.status(400).json({
        success: false,
        message: "Signal ID is required",
      });
      return;
    }

    const input = updateSignalSchema.parse(req.body);

    if (Object.keys(input).length === 0) {
      res.status(400).json({
        success: false,
        message: "At least one field is required",
      });
      return;
    }

    const signal = await updateSignal(
      req.userId,
      workspaceId,
      signalId,
      input,
    );

    res.status(200).json({
      success: true,
      data: signal,
    });
  } catch (error) {
    if (error instanceof Error) {
      if (
        error.message === "Workspace not found" ||
        error.message === "Signal not found" ||
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
          message: "Invalid signal data",
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
      message: "Failed to update signal",
    });
  }
}

export async function removeWorkspaceSignal(
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
    const signalId = getSignalId(req);

    if (!workspaceId) {
      res.status(400).json({
        success: false,
        message: "Workspace ID is required",
      });
      return;
    }

    if (!signalId) {
      res.status(400).json({
        success: false,
        message: "Signal ID is required",
      });
      return;
    }

    const result = await deleteSignal(
      req.userId,
      workspaceId,
      signalId,
    );

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    if (error instanceof Error) {
      if (
        error.message === "Workspace not found" ||
        error.message === "Signal not found"
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
      message: "Failed to delete signal",
    });
  }
}