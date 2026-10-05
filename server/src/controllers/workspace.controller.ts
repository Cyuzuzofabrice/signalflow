
import type { Response } from "express";
import type { AuthRequest } from "../middleware/auth.middleware.js";
import {
  getUserWorkspaces,
  getWorkspaceById,
  updateWorkspace,
} from "../services/workspace.service.js";

export async function listWorkspaces(
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

    const workspaces = await getUserWorkspaces(req.userId);

    res.status(200).json({
      success: true,
      data: workspaces,
    });
  } catch (error) {
    console.error("List workspaces error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch workspaces",
    });
  }
}

export async function getWorkspace(
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

    const workspaceId = req.params.workspaceId;

    if (typeof workspaceId !== "string" || !workspaceId) {
      res.status(400).json({
        success: false,
        message: "Workspace ID is required",
      });
      return;
    }

    const workspace = await getWorkspaceById(
      req.userId,
      workspaceId,
    );

    res.status(200).json({
      success: true,
      data: workspace,
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
      message: "Failed to fetch workspace",
    });
  }
}

export async function editWorkspace(
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

    const workspaceId = req.params.workspaceId;

    if (typeof workspaceId !== "string" || !workspaceId) {
      res.status(400).json({
        success: false,
        message: "Workspace ID is required",
      });
      return;
    }

    const { name, website, description } = req.body;

    if (
      name === undefined &&
      website === undefined &&
      description === undefined
    ) {
      res.status(400).json({
        success: false,
        message: "At least one field is required",
      });
      return;
    }

    if (
      name !== undefined &&
      (typeof name !== "string" || name.trim().length < 2)
    ) {
      res.status(400).json({
        success: false,
        message: "Workspace name must be at least 2 characters",
      });
      return;
    }

    if (
      website !== undefined &&
      website !== null &&
      typeof website !== "string"
    ) {
      res.status(400).json({
        success: false,
        message: "Website must be a string",
      });
      return;
    }

    if (
      description !== undefined &&
      description !== null &&
      typeof description !== "string"
    ) {
      res.status(400).json({
        success: false,
        message: "Description must be a string",
      });
      return;
    }

    const workspace = await updateWorkspace(
      req.userId,
      workspaceId,
      {
        name:
          typeof name === "string"
            ? name.trim()
            : undefined,
        website:
          typeof website === "string"
            ? website.trim()
            : website,
        description:
          typeof description === "string"
            ? description.trim()
            : description,
      },
    );

    res.status(200).json({
      success: true,
      data: workspace,
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

      if (error.message.includes("permission")) {
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
      message: "Failed to update workspace",
    });
  }
}
