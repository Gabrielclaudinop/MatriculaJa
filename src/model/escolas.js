//Esse arquivo é importado em escolas.route.js

import Database from '../database/database.js';

async function create({name, value, endereco, telefone, foto, mapa, horarios, id_rede,serie,turno, vagas_ofertadas, vagas_disponiveis}) {
  const db = await Database.connect();
  console.log(name,value,"ai")
  if (name && value) {
    const sql = `
      INSERT INTO
        escola (name, value, endereco, telefone, foto, mapa, horários, id_rede, serie, turno, vagas_ofertadas, vagas_disponiveis)
      VALUES
        (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
 
    const { lastID } = await db.run(sql, [name, value, endereco, telefone, foto, mapa, horarios, id_rede, serie, turno, vagas_ofertadas, vagas_disponiveis]);
    console.log(lastID)
    return await readById(lastID);
  } else {
    throw new Error('Unable to create investment');
  }
}

async function read() {
  const db = await Database.connect();
 
  const sql = `
    SELECT
      escola.*,
      rede_ensino.*
    FROM escola
    JOIN rede_ensino ON escola.id_rede = rede_ensino.id_rede_ensino;
  `;
 
  const situacao = await db.all(sql);
 
  return situacao;
}
 
async function readById(id) {
  const db = await Database.connect();
  console.log(id)
  if (id) {
    const sql = `
      SELECT *
        FROM
          escola
        WHERE
          id_escola = ?
      `;
 
    const investment = await db.get(sql, [id]);
    console.log(investment)
 
    if (investment) {
      return investment;
    } else {
      throw new Error('Investment not found');
    }
  } else {
    throw new Error('Unable to find investment');
  }
}
 
async function update({ id, name, value }) {
  const db = await Database.connect();
 
  if (name && value && id) {
    const sql = `
      UPDATE
        situacao
      SET
        name = ?, value = ?
      WHERE
        id = ?
    `;
 
    const { changes } = await db.run(sql, [name, value, id]);
 
    if (changes === 1) {
      return readById(id);
    } else {
      throw new Error('Investment not found');
    }
  } else {
    throw new Error('Unable to update investment');
  }
}
 
/*async function remove(id) {
  const db = await Database.connect();
 
  if (id) {
    const sql = `
      DELETE FROM
        situacao
      WHERE
        id = ?
    `;
 
    const { changes } = await db.run(sql, [id]);
 
    if (changes === 1) {
      return true;
    } else {
      throw new Error('Investment not found');
    }
  } else {
    throw new Error('Investment not found');
  }
}
async function filter() {
  const db = await Database.connect();
  console.log(id)
  if (serie,turno) {
    const sql = `
      SELECT *
        FROM
          escola
        WHERE
          serie
        LIKE
          %?%
        AND
        WHERE
          turno
        LIKE
          %?%
        
      `;
 
    const investment = await db.get(sql, [serie,turno]);
    console.log(investment)
 
    if (investment) {
      return investment;
    } else {
      throw new Error('Investment not found');
    }
  } else {
    throw new Error('Unable to find investment');
  }
}*/
export default { create, read, readById};
 