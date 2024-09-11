import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import { escolas } from '../data/schools.js';
import Escolas from '../model/escolas.js'


// Classe HTTPError para tratar erros personalizados
class HTTPError extends Error {
  constructor(message, code) {
    super(message);
    this.code = code;
  }
}

const router = express.Router();

// Rota GET para listar todas as escolas
router.get('/', async (req, res) => {
  try {
    const schools = await Escolas.read()
    return res.json(schools); // Retorna a lista de escolas
  } catch (error) {
 console.log(error)
  }
});


// Rota GET para obter uma escola pelo ID
router.get('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const escola = await Escolas.readById(id)
  
    if (escola) {
      return res.json(escola);
    } else {
      throw new HTTPError('School not found', 404);
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
router.get('/filter', async (req,res)=>{
  try {
    const serie = req.params.serie;
    const turno = req.params.turno
    const schools = await Escolas.filter(serie,turno)
    if (schools){
      return res.json(escola);
    } else {
      throw new HTTPError('School not found', 404);
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
  }
)
// Rota PUT para atualizar uma escola pelo ID
router.put('/:id', async (req, res) => {
  try {
    console.log("funciona")
    const id = req.params.id;
    const index = escolas.findIndex(e => e.id === id);
  
    if (index !== -1) {
      escolas[index] = { ...escolas[index], ...req.body };
      return res.json(escolas[index]);
    } else {
      throw new HTTPError('School not found', 404);
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Rota DELETE para remover uma escola pelo ID
router.delete('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const index = escolas.findIndex(e => e.id === id);
  
    if (index !== -1) {
      escolas.splice(index, 1); // Remove a escola do array
      return res.sendStatus(204); // Responde com status 204 (No Content)
    } else {
      throw new HTTPError('School not found', 404);
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});



// Middleware de tratamento de erros
router.use((err, req, res, next) => {
  if (err instanceof HTTPError) {
    return res.status(err.code).json({ message: err.message });
  } else {
    return res.status(500).json({ message: 'Something broke!' });
  }
});
router
export default router;
