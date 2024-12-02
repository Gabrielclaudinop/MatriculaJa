//Esse arquivo é importado em escolas.route.js
import prisma from '../database/database.js';

async function create({ idRede, name, endereco, telefone, horarios, mapa, foto, value, serie, turno, vagasOfertadas,vagasDisponiveis }) {
  console.log("oi", idRede, name, endereco, telefone, horarios, mapa, foto, value, serie, turno, vagasOfertadas,vagasDisponiveis)
  try{
    const createdEscola = await prisma.escola.create({
      data: {
        idRede, name, endereco, telefone, horarios, mapa, foto, value, serie, turno, vagasOfertadas,vagasDisponiveis},
    });

    return createdEscola;
  } catch(error) {
    throw new Error('Unable to create escola');
  }
}

async function read() {
  const escolas = await prisma.escola.findMany({
    include: {
      rede: true,
    },
  });

  return escolas;
}

async function readById(id) {
  if (id) {
    const escola = await prisma.escola.findUnique({
      where: {
        id: parseInt(id,10)
      },
      include: {
        rede: true,
      },
    });

    if (escola) {
      return escola;
    } else {
      throw new Error('Escola não encontrada');
    }
  } else {
    throw new Error('Id inválido');
  }
}


export default { create, read, readById};
 