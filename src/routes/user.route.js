/*importações*/
import express, { json, Router } from "express";
import "dotenv/config";
import multer from "multer";
import { randomBytes } from 'node:crypto';

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
      const path = `/images/profile/${req.file.filename}`;

      const image = await Image.update({ userId: user.id, path });

      res.status(200).json(image);
    } catch (error) {
      console.log(error);
      res.status(400).json({ error: "Unable to update image" });
    }
  }
);

router.post("/emailCode", isAuthenticated, async (req,res)=>{
  console.log(`${req.userId} requisição do emailcode`)
  const user = await usuarios.readById(req.userId);
  try{
    const code = randomBytes(4).toString('hex')
    process.env.SERVER_CODE = code;
    console.log(`${process.env.SERVER_CODE}`)
    const mail = await SendMail.emailCode(user.email,code);
    res.status(200).json({code: code});
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "Unable to send email" });
  }
})

router.put("/password", isAuthenticated, 
  validate(
  z.object({
    body: z.object({
      newPassword: z.string().regex(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[^\w\s]).{5,}$/, {
        message: "Sua senha deve ter pelo ao menos um símbolo e número, além de ter mais de 5 carácteres.",
      })
    }),
  })
), async (req, res) => {
  console.log(req.body)
  console.log(process.env.SERVER_CODE)
  console.log(`\a Código de verificação: ${req.body.code} \a`)
  if (req.body.code == process.env.SERVER_CODE) {
    
  
  const user = await usuarios.readById(req.userId);
  const { newPassword } = req.body;
  try{
    
    const updated = await Usuarios.changePassword(user.id, newPassword);
    res.status(200).json(updated);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "Unable to update password" });
  }}
  else{
    res.status(400).json({ error: "Invalid code" });
  }}
)

router
  .route("/:id")
  .get((req, res) => {
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
