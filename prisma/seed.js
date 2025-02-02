import { resolve } from "node:path";
import { readFileSync } from "node:fs";
import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();
const saltRounds = Number(process.env.BCRYPT_SALT);

async function main() {
  const file = resolve("prisma", "seeders.json");

  const seed = JSON.parse(readFileSync(file));
  await prisma.redeEnsino.createMany({
    data: seed.redes,
  })

  for( const usuario of seed.usuarios){
    const {senha, ...rest} = usuario
    const hashedPasswd = await bcrypt.hash(senha, saltRounds);
    await prisma.usuario.create({
      data: {
        ...rest,
        senha: hashedPasswd,
        image: seed.imagem
      }
    })
  }
  await prisma.escola.createMany({
    data: seed.escolas,
  });

  await prisma.turma.createMany({
    data: seed.turmas,
  });

  await prisma.turmaEscola.createMany({
    data: seed.turmasEscolas,
  });
  
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
