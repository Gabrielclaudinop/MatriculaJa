/*importações*/
import express from 'express'
import morgan from 'morgan'
import cors from 'cors'; 
import 'dotenv/config';
import multer from 'multer';

import { PrismaClient } from "@prisma/client";
import Usuarios from './src/model/usuarios.js'
import { isAuthenticated } from './src/middleware/auth.js';
import { z } from 'zod';
import { validate } from './src/middleware/validate.js';
import SendMail from './src/services/SendMail.js';
import uploadConfig from './src/config/multer.js';
import Image from './src/model/image.js';


/* CONST, definição de variáveis constantes */
const app = express();
const PORT = 3000
const prisma = new PrismaClient();

app.use(express.static("public"))
app.use(express.json());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: '*',
    methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    preflightContinue: false,
  })
);

//importing routes
import escolasRoute from './src/routes/escolas.route.js'
import turmasRoute from './src/routes/turmas.route.js'
import authRoute from './src/routes/auth.route.js'
import userRoute from './src/routes/user.route.js'
//using route
app.use('/schools', escolasRoute)
app.use('/turmas', turmasRoute)
app.use('/auth', authRoute)
app.use('/user', userRoute)
// Rota de contato para receber os dados do formulário
app.post('/contato', validate(
  z.object({
    body: z.object({
      email: z.string(),
      tipo: z.string(),
      message: z.string(),
    })
  })
), async (req, res) => {
  const {email,tipo,message} = req.body;
  console.log(req.body)
  
  try {
    const contato = await prisma.Contato.create({
      data: {
        email,
        tipo,
      message}});

    res.status(200).json({ message: 'Mensagem enviada e salva com sucesso!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Ocorreu um erro ao enviar a mensagem.' });
  }
});

//Rota para efetuação de cadastro
app.post('/cadastro', validate(
  z.object({
    body: z.object({
      username: z.string(),
      email: z.string(),
      password: z.string().regex(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[^\w\s]).{8,}$/, {
        message: "Sua senha deve ter pelo ao menos um símbolo e número, além de ter mais de 5 carácteres.",
      }),
    }),
  })
),async (req, res) => {
  const {username,email,password} = req.body;
  console.log(req.body)
  try {
    // Salvando no banco de dados com Prisma
    const usuario = await Usuarios.RegisterUser(username,email,password)
    await SendMail.createNewUser(email)
    res.status(200).json({ message: 'Cadastro efetuado com sucesso!',usuario});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Ocorreu um erro ao solicitar cadastro.' });
  }
});

//rendering pages
app.get("/home", (req, res) => {
  res.sendFile('index.html', {root:'public/html'})
})

app.get("/login", (req, res) => {
  res.sendFile('login.html', {root:'public/html'})
})

app.get("/escolas", (req, res) => {
  res.sendFile('visualiz-escolas.html', {root:'public/html'})
})

app.get("/credenciais", (req,res)=>{
  res.sendFile('credenciais.html', {root:'public/html'})
})

app.get("/criar", (req,res)=>{
  res.sendFile("criar.html", {root:"public/html"})
})

app.get("/cadastro", (req, res) => {
  res.sendFile('cadastro.html', {root:'public/html'})
})

app.get("/escola", (req, res) => {
  const id = req.params.id
  res.sendFile('info-escola.html', {root:'public/html'})
})

//app.use(( error, req, res, next ) => {
//	const statusCode = error.statusCode || 500;
 // const message = error.message || 'Internal Server Error';
//
 // res.sendFile('404.html', {root:'public/html'})
//});

//route not find
app.use((req,res,next) => {
  console.log("Página não encontrada")
  res.status(404).sendFile('404.html', {root:'public/html'})
})


app.listen(PORT, ()=> {
  console.log(`server running on port ${PORT}`)
})