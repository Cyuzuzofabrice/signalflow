import type { Request, Response } from "express";
import {
  loginSchema,
  registerSchema,
} from "../validators/auth.validator.js";
import {
  loginUser,
  registerUser,
} from "../services/auth.service.js";

export async function register(req: Request, res: Response) {
  try {
    const input = registerSchema.parse(req.body);

    const result = await registerUser(input);

    res.status(201).json({
      success: true,
      data: result,
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });

      return;
    }

    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
}

export async function login(req: Request, res: Response) {
  try {
    const input = loginSchema.parse(req.body);

    const result = await loginUser(input);

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(401).json({
        success: false,
        message: error.message,
      });

      return;
    }

    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
}