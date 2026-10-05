import type { Response } from "express";
import type { AuthRequest } from "../middleware/auth.middleware.js";
import { analyzeBuyingSignal } from "../services/ai.service.js";

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

export async function analyzeWorkspaceRequest(
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

    const request = req.body?.request;

    if (
      typeof request !== "string" ||
      !request.trim()
    ) {
      res.status(400).json({
        success: false,
        message: "Request is required",
      });
      return;
    }

    if (request.trim().length > 5000) {
      res.status(400).json({
        success: false,
        message: "Request must be under 5000 characters",
      });
      return;
    }

    const result = await analyzeBuyingSignal(
      request.trim(),
    );

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error("AI analysis error:", error);

    if (error instanceof Error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });

      return;
    }

    res.status(500).json({
      success: false,
      message: "Failed to analyze request",
    });
  }
}