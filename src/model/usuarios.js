import prisma from "../database/database.js";

async function readByEmail(email) {
  return await prisma.usuario.findUnique({
    where: {
      email: email
    }
  })
}

async function RegisterUser(username, email, password) {
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
export default { readByEmail, RegisterUser };
