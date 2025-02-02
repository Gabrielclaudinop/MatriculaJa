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

/*PARA SOMENTE REGISTRO
  .regex(/^(?=.*\d)(?=.*[^\w\s]).*$/, {
          message: "Sua senha deve ter pelo ao menos um símbolo e número, além de ter mais de 5 carácteres.",
        }),
  */

//ROTA: /auth/validate-auth
router.post("/validate-auth", isAuthenticated, (req, res) => {
  res.status(200).json({ message: "OK", isValid: true });
});

export default router;
