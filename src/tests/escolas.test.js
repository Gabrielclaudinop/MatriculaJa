import { describe, it, before } from 'node:test';
import assert from 'node:assert';
import request from 'supertest';
import app from '../../server.js'
import { response } from 'express';
 
const newSchool = {
    idRede: 1,
    name: "Teste",
    endereco: "Endereço: buchecha de nois todos",
    telefone: "Tel: (83)4132-8652",
    value: "value: Ensino Fundamental do 1° ao 9° ano.",
    horarios: "Horários: 1° ao 5° ano: 13:00 até 17:30; 6° ao 9° ano: 07:00 até 12:00.",
    mapa: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3958.844446635128!2d-34.8785129908833!3d-7.143979392830445!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x7ace937c59420b7%3A0xa0d07c8f6fd69059!2sEMEIEF%20LEONIDAS%20SANTIAGO!5e0!3m2!1spt-BR!2sbr!4v1711325225276!5m2!1spt-BR!2sbr",
    foto: "Teste.png",
    turno: "Manha_Tarde",
    serie: "Fundamental1_Fundamental2"
};
 

async function loadToken(user) {
    const response = await request(app).post('/auth/login').send(user);
    return response.body.token;
}

let loggedUser;

let createdSchool;

let foundSchool;


function logUser() {
    const loggedUser = {
    email: "professorluis@gmail.com",
    password: "135789"
    };
   
    return loggedUser;
  }
 
describe('Matrículajá', () => {

    before(() => {
        loggedUser = logUser();
      });

    /*it("should log a user", async () => {
        const response = await request(app).post('/users/login').send(loggedUser);
        assert.strictEqual(response.status, 200);
        assert.ok(response.body.token);
    });*/
    describe("Schools", () => {
    it("should create a new school", async () => {
        console.log(loggedUser);
        const token = await loadToken(loggedUser);
        console.log(token);
        const response = await request(app).post('/schools/create').set('Authorization', `Bearer ${token}`).send(newSchool);
        assert.strictEqual(response.status, 201);
        createdSchool = response.body;
        console.log(createdSchool)
    })

    it("should return a school by id", async () => {
        const token = await loadToken(loggedUser);
        const response = await request(app).get(`/schools?id=${createdSchool.id}`);
        assert.strictEqual(response.status, 200);
        foundSchool = response.body
        console.log(foundSchool)})
  
  ;})
});
 