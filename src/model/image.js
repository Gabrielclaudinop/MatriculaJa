import prisma from '../database/database.js';
 
async function update({ userId, path }) {
  return await prisma.usuario.update({
    where: {
      id: userId,
    },
    data: {
      image: path,
    },  
  })
}
 
export default {  update };
 