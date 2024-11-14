import prisma from '../database/database.js';
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
const saltRounds = Number(process.env.BCRYPT_SALT)

async function LoginUser(email,password) {
  if (email && password) {
    const usuario = await prisma.usuario.findUnique({
      where: {
        email: email
      }
    });
    
    if (usuario) {
      
      const hash = await bcrypt.hash(password,10)
      console.log(usuario.senha)
      let match = await bcrypt.compare(password, hash);
        if (match) {
          const { id: userId, password: hash } = usuario;
          const token = jwt.sign(
            { userId },
            process.env.JWT_SECRET,
            { expiresIn: 3600 } // 1h
          );

          return {usuario,token};
        } else {
          throw new Error('Usuário não encontrado');
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