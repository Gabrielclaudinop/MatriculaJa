import Database from "./database.js";

async function up() {
  const db = await Database.connect();

  const tables = [
    `CREATE TABLE rede_ensino (
        id_rede_ensino INTEGER PRIMARY KEY AUTOINCREMENT,
        nome_rede VARCHAR(255)
    );`,
    `CREATE TABLE escola (
        id_escola INTEGER PRIMARY KEY AUTOINCREMENT,
        id_rede INTERGER,
        name VARCHAR(255),
        endereco VARCHAR(255),
        telefone VARCHAR(255),
        horários VARCHAR(255),
        mapa VARCHAR(255),
        foto VARCHAR(255),
        value VARCHAR(255),
        serie VARCHAR(255),
        turno VARCHAR(255),
        vagas_ofertadas INTEGER,
        vagas_disponiveis INTEGER,
        FOREIGN KEY (id_rede) REFERENCES rede_ensino (id_rede_ensino)
    );`,
  ];

  for (const table of tables) {
    await db.run(table);
  }
}

export default { up };