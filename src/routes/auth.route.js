import express from "express";
import { login } from "../controllers/login.js";
import { isAuthenticated } from "../middleware/auth.js";
import { validate } from "../middleware/validate.js";
import { z } from "zod";

const router = express.Router();

// ROTA: /auth/login
router.post(
  "/login",
  validate(
    z.object({
      body: z.object({
        email: z.string(),
        password: z.string(),
      }),
    })
  ),
  login
);

//ROTA: /auth/validate-auth
router.post("/validate-auth", isAuthenticated, (req, res) => {
  res.status(200).json({ message: "OK", isValid: true });
});

export default router;
