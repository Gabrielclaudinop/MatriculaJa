import { resolve } from 'node:path';
import { readFileSync } from 'node:fs';
import Escola from '../model/escolas.js';
 
async function up() {
  const file = resolve('src', 'database', 'seeders.json');
 
  const seed = JSON.parse(readFileSync(file));
 
  for (const escola of seed.escolas) {
    await Escola.create(escola);
  }
}
 
export default { up };