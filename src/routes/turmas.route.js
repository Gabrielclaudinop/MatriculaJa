import turmas from "../model/turmas.js";
import express from 'express';

const router = express.Router();

router.get("/vagas", async (req, res) => {
    try {
        const vagas = await turmas.allVagasTurmas();
        return res.json(vagas);
    } catch (error) {
        console.log(error);
    }
    });

export default router;