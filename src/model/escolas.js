import Database from '../database/database.js';
 
async function create({name, value, endereco, telefone, foto, mapa, horários}) {
  const db = await Database.connect();
  console.log(name,value)
  if (name && value) {
    const sql = `
      INSERT INTO
        escola (name, value, endereco, telefone, foto, mapa, horários)
      VALUES
        (?, ?, ?, ?, ?, ?, ?)
    `;
 
    const { lastID } = await db.run(sql, [name, value, endereco, telefone, foto, mapa, horários]);
    console.log(lastID)
    return await readById(lastID);
  } else {
    throw new Error('Unable to create investment');
  }
}

async function read(field, value) {
  const db = await Database.connect();
 
  if (field && value) {
    const sql = `
      SELECT
          id, name, value
        FROM
          situacao
        WHERE
          ${field} = '?'
      `;
 
    const situacao = await db.all(sql, [value]);
 
    return situacao;
  }
 
  const sql = `
    SELECT
      id, name, value
    FROM
      situacao
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
 
async function remove(id) {
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
 
export default { create, read, readById, update, remove };
 