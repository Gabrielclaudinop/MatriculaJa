import prisma from "../database/database.js";
import bcrypt from "bcrypt"
async function readByEmail(email) {
  return await prisma.usuario.findUnique({
    where: {
      email: email
    },
  });
}

async function RegisterUser(username, email, password,image) {
  const hash = await bcrypt.hash(password, 10);
  console.log(username, email, password);
  const usuario = await prisma.usuario.create({
    data: {
      nome: username,
      email: email,
      senha: hash,
      image: image
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

async function changePassword(id, newPassword) {
  const hash = await bcrypt.hash(newPassword, 10);
  return await prisma.usuario.update({
    where: {
      id: parseInt(id)
    },
    data: {
      senha: hash
    }
  })
}

export default { readByEmail, RegisterUser, readById, changePassword};
