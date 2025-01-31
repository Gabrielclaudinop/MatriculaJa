/*importações*/
import express, { json } from 'express'
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
import usuarios from '../model/usuarios.js';

class HTTPError extends Error {
  constructor(message, code) {
    super(message);
    this.code = code;
  }
}

const router = express.Router()


router.get("/", async (req, res) => {
  console.log(req.body.email)
  let email = req.body.email
  let user = await Usuarios.readByEmail(email)
  console.log(user)
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
    console.log("\n", "Entrou aqui essa bomba", "\n");
    try {
      const userId = req.body.userId;
      console.log(userId, "Id do cara aqui ó");
      const path = `/imgs/profile/${userId}.png`;
      
      if (path) {
        // Corrected path assignment
        const finalPath = `/images/profile/${userId}.png`;
        
        await Image.create({ userId, path: finalPath });

        res.sendStatus(201);
      } else { 
        throw new Error('Path is not defined');
      }

    } catch (error) {
      console.error('Error creating image:', error);
      res.status(400).json({ error: 'Unable to create image' });
    }
  }
);
 
router.put(
  '/image',
  isAuthenticated,
  multer(uploadConfig).single('image'),
  async (req, res) => {
    console.log("\n","Entrou aqui essa bomba","\n")
    console.log(req.body.email)
    let user = await usuarios.readByEmail(req.body.email)
    let userId = user.id
    try {
      
      // console.log(userId)
      const path = `/imgs/profile/${req.file.filename}.png`;
      //console.log('\n OI',userId,path, '\n OI')
      if (path) {
        const finalPath = `/images/profile/${req.file.filename}.png`;
        const image = await Image.update({ userId, path: finalPath });
 
        res.json(image);
        console.log(image)
      } else {
        console.error("Entrou pq deu erro no prisma bixinho")
        throw new HTTPError('Prisma error', 400);
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