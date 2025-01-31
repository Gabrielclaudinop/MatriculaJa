import prisma from "../database/database.js";
import bcrypt from "bcrypt"
async function readByEmail(email) {
  return await prisma.usuario.findUnique({
    where: {
      email: email
    },include: {
      image: {
        select: {
          path: true,
        },
      },
    },
  });
}

async function RegisterUser(username, email, password) {
  console.log(typeof(password))
  const hash = await bcrypt.hash(password, 10);
  console.log(username, email, password);
  const usuario = await prisma.usuario.create({
    data: {
      nome: username,
      email: email,
      senha: hash,
    },
  });

  return usuario;
}

async function readById(id) {
  return await prisma.usuario.findUnique({
    where: {
      id: parseInt(id)
    }
  })
}

export default { readByEmail, RegisterUser, readById };
