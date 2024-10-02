import prisma from '../database/database.js';
import bcrypt from "bcrypt"
const saltRounds = Number(process.env.BCRYPT_SALT)

async function LoginUser(email,password) {
    if (email) {
      const usuario = await prisma.usuario.findUnique({
        where: {
          email: email
        }
      });
      
      if (usuario) {
        console.log(usuario.senha)
        if (bcrypt.compare(password,usuario.senha)){
            return usuario;
        } else {
            throw new Error("Senha incorreta")
        }
        
      } else {
        throw new Error('Não há conta com este E-mail');
      }
    } else {
      throw new Error('E-mail inválido');
    }
  }

  async function RegisterUser(username,email,password) {
    const hash = await bcrypt.hash(password,10)
    console.log(username,email,password)
    const usuario = await prisma.usuario.create({
    data: {
        nome: username,
        email: email,
        senha: hash,
    },
    });
    return usuario
  }
  export default {LoginUser,RegisterUser};