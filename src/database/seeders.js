import { resolve } from "node:path";
import { readFileSync } from "node:fs";
import Escola from "../model/escolas.js";
import database from "./database.js";

async function up() {
  const file = resolve("src", "database", "seeders.json");
  console.log(file)
  const db = await database.connect();
  const seed = JSON.parse(readFileSync(file));

  const rede_ensino = seed.redes[0];
  const sql = `
        INSERT INTO rede_ensino (nome_rede) VALUES (?);
    `;

  const rede = await db.run(sql, rede_ensino.nome_rede);
  const id_rede = rede.lastID;

  for (const escola of seed.escolas) {
    const escolaData = {...escola, id_rede: id_rede};
    console.log(escolaData)
    await Escola.create(escolaData);
  }
}

export default { up };