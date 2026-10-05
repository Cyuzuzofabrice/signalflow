import { Router } from "express";
import type { AuthRequest } from "../middleware/auth.middleware.js";
import { authenticate } from "../middleware/auth.middleware.js";

const router = Router();

router.get("/me", authenticate, (req: AuthRequest, res) => {
  res.status(200).json({
    success: true,
    message: "You are authenticated",
    userId: req.userId,
  });
});

export default router;