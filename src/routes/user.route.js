/*importações*/
import express, { json } from "express";
import morgan from "morgan";
import cors from "cors";
import "dotenv/config";
import multer from "multer";

import { PrismaClient } from "@prisma/client";
import Usuarios from "../model/usuarios.js";
import { isAuthenticated } from "../middleware/auth.js";
import { z } from "zod";
import { validate } from "../middleware/validate.js";
import SendMail from "../services/SendMail.js";
import uploadConfig from "../middleware/multer.js";
import Image from "../model/image.js";
import usuarios from "../model/usuarios.js";

class HTTPError extends Error {
  constructor(message, code) {
    super(message);
    this.code = code;
  }
}

const router = express.Router();

router.get("/", async (req, res) => {
  console.log(req.body.email);
  let email = req.body.email;
  let user = await Usuarios.readByEmail(email);
  console.log(user);
});

router.get("/new", (req, res) => {
  res.render("users/new");
});

router.post("/", (req, res) => {
  const isValid = false;
  if (isValid) {
    users.push({ firstName: req.body.firstName });
    res.redirect(`/users/${users.length - 1}`);
  } else {
    console.log("Error");
    res.render("users/new", { firstName: req.body.firstName });
  }
});

router.put(
  "/image",
  isAuthenticated,
  multer(uploadConfig).single("image"),
  async (req, res) => {
    const user = await usuarios.readById(req.userId);

    try {
      // console.log(userId)
      const path = `/images/profile/${req.file.filename}`;

      const image = await Image.update({ userId: user.id, path });

      res.status(200).json(image);
    } catch (error) {
      console.log(error);
      res.status(400).json({ error: "Unable to update image" });
    }
  }
);

router
  .route("/:id")
  .get((req, res) => {
    console.log(req.user);
    res.send(`Get User With ID ${req.params.id}`);
  })
  .put((req, res) => {
    res.send(`Update User With ID ${req.params.id}`);
  })
  .delete((req, res) => {
    res.send(`Delete User With ID ${req.params.id}`);
  });

router.param("id", (req, res, next, id) => {
  req.user = users[id];
  next();
});

export default router;
