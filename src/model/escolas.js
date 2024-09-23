//Esse arquivo é importado em escolas.route.js
import prisma from '../database/database.js';

async function create({ name, value, endereco, telefone, foto, mapa, horarios, id_rede, serie, turno, vagas_ofertadas, vagas_disponiveis }) {
  if (name && value) {
    const createdEscola = await prisma.escolas.create({
      data: {
        name, value, endereco, telefone, foto, mapa, horarios, id_rede, serie, turno, vagas_ofertadas, vagas_disponiveis,},
    });

    return createdEscola;
  } else {
    throw new Error('Unable to create escola');
  }
}

async function read() {
  const escolas = await prisma.escolas.findMany({
    include: {
      rede_ensino: true,
    },
  });

  return escolas;
}

async function readById(id) {
  if (id) {
    const escola = await prisma.escolas.findUnique({
      where: {
        id_escola: id,
      },
      include: {
        rede_ensino: true,
      },
    });

    if (escola) {
      return escola;
    } else {
      throw new Error('Escola not found');
    }
  } else {
    throw new Error('Unable to find escola');
  }
}

export default { create, read, readById };
 