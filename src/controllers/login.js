import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import Usuarios from '../model/usuarios.js';

export async function login(req, res) {
    const { email, password } = req.body;
    //validando campos
    if( !email || !password){
        return res.status(400).json({"error": "campos faltando"})
    }

    try{
        //pegar senha do usuario no banco de dados
        const user = await Usuarios.readByEmail(email)
        if(!user){
            return res.status(403).json({"error": "esse usuario nao existe"})
        }

        //comparar senhas criptografadas
        if(await bcrypt.compare(password, user.senha)){
            //lembrar de criar .env
            //------- IMPORTANTE --------
            const token = jwt.sign({id: user.id}, process.env.JWT_SECRET); //token de acesso

            //separando senha das informações de usuário
            //------- IMPORTANTE --------
            const { senha: pass, ...validUser} = user;

            //------- IMPORTANTE --------
            return res.json({User: validUser, token, isValid: true})
        }
        return res.status(401).json({"error": "credenciais incorretas"})
    }catch(err){
        console.log(err)
    } 
}