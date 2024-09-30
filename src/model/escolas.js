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

async function readByEmail(email) {
  if (email) {
    const usuario = await prisma.usuario.findUnique({
      where: {
        email: email
      }
    });

    if (usuario) {
      return usuario;
    } else {
      throw new Error('Não há conta com este E-mail');
    }
  } else {
    throw new Error('E-mail inválido');
  }
}
export default { create, read, readById, readByEmail };
 