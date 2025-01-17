/*importações*/
import express from 'express'
import morgan from 'morgan'
import cors from 'cors'; 
import 'dotenv/config';
import multer from 'multer';

import { PrismaClient } from "@prisma/client";
import Usuarios from '../model/usuarios.js'
import { isAuthenticated } from '../middleware/auth.js';
import { z } from 'zod';
import { validate } from '../middleware/validate.js';
import SendMail from '../services/SendMail.js';
import uploadConfig from '../config/multer.js';
import Image from '../model/image.js';


const router = express.Router()


router.get("/", (req, res) => {
  console.log(req.query.name)
  res.send("User List")
})

router.get("/new", (req, res) => {
  res.render("users/new")
})

router.post("/", (req, res) => {
  const isValid = false
  if (isValid) {
    users.push({ firstName: req.body.firstName })
    res.redirect(`/users/${users.length - 1}`)
  } else {
    console.log("Error")
    res.render("users/new", { firstName: req.body.firstName })
  }
})
router.post(
  '/image',
  isAuthenticated,
  multer(uploadConfig).single('image'),
  async (req, res) => {
    try {
      const userId = req.userId;
 
      if (req.file) {
        const path = `/imgs/profile/${req.file.filename}`;
 
        await Image.create({ userId, path });
 
        res.sendStatus(201);
      } else {
        throw new Error();
      }
    } catch (error) {
      throw new HTTPError('Unable to create image', 400);
    }
  }
);
 
router.put(
  '/image',
  isAuthenticated,
  multer(uploadConfig).single('image'),
  async (req, res) => {
    try {
      const userId = req.userId;
 
      if (req.file) {
        const path = `/imgs/profile/${req.file.filename}`;
 
        const image = await Image.update({ userId, path });
 
        res.json(image);
      } else {
        throw new Error();
      }
    } catch (error) {
      throw new HTTPError('Unable to create image', 400);
    }
  }
);

router
  .route("/:id")
  .get((req, res) => {
    console.log(req.user)
    res.send(`Get User With ID ${req.params.id}`)
  })
  .put((req, res) => {
    res.send(`Update User With ID ${req.params.id}`)
  })
  .delete((req, res) => {
    res.send(`Delete User With ID ${req.params.id}`)
})


router.param("id", (req, res, next, id) => {
  req.user = users[id]
  next()
})


export default router;