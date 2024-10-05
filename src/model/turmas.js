import prisma from '../database/database.js';

async function allVagasTurmas(){
    return await prisma.turma.findMany({
        include: {
            escolas: true,
        }
    });

}

export default {allVagasTurmas};