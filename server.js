/*importações*/
import express from 'express'
import morgan from 'morgan'
import cors from 'cors'; 
import 'dotenv/config';
import { PrismaClient } from "@prisma/client";
import Usuarios from './src/model/usuarios.js'
import { isAuthenticated } from './src/middleware/auth.js';

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

//using route
app.use('/schools', escolasRoute)
app.use('/turmas', turmasRoute)

// Rota de contato para receber os dados do formulário
app.post('/contato', async (req, res) => {
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
app.post('/cadastro', async (req, res) => {
  const {username,email,password} = req.body;
  console.log(req.body)
  try {
    // Salvando no banco de dados com Prisma
    const usuario = await Usuarios.RegisterUser(username,email,password)
    

    res.status(200).json({ message: 'Cadastro efetuado com sucesso!',usuario});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Ocorreu um erro ao solicitar cadastro.' });
  }
});

//Rota para efetuação de Login
app.post('/login', async (req, res) => {
  const {email,password} = req.body;
  console.log(req.body)
  try {
    // Salvando no banco de dados com Prisma
    const momentaneo = await Usuarios.LoginUser(email,password);
    
    if (momentaneo.usuario){
      let tkn = momentaneo.token
      return res.json({ auth: true, tkn })
    }
    else{
      return res.status(401).json({message: "Senha incorreta"})
    };
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Ocorreu um erro.' });
  }
});

app.post('/logout', (req, res) => {
  // Aqui você pode limpar o token, dependendo de onde ele é armazenado
  res.status(200).json({ message: "Logout efetuado com sucesso" });
});

app.get('rota_secreta', isAuthenticated, async (req, res) => {
  res.status(200).json({message: "Rota acessada com sucesso"})
})

//rendering pages
app.get("/home", (req, res) => {
  res.sendFile('index.html', {root:'public/html'})
})

app.get("/login", (req, res) => {
  res.sendFile('login.html', {root:'public/html'})
})

app.get("/escolas",isAuthenticated, (req, res) => {
  res.sendFile('visualiz-escolas.html', {root:'public/html'})
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