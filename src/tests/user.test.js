import { describe, it, before } from 'node:test';
import assert from 'node:assert';
import request from 'supertest';
import app from '../../server.js'
import { response } from 'express';
import { configDotenv } from 'dotenv';
 


let code;

let token;


const loggedUser = {
    email: "professorluis@gmail.com",
    password: "135789"
    };
 
let user;

describe('Matrículajá', () => {

    describe("Users", () => {
    it("should log a user", async () => {
        const response = await request(app).post('/auth/login').send(loggedUser);
        assert.strictEqual(response.status, 200);
        assert.ok(response.body.token);
        token = response.body.token;
        user = response.body.User;
    });
    it("should send a email with a code", async () => {
        let userId = String(user.id)
        console.log(userId)
       const response = await request(app).post('/user/emailCode').set('Authorization', `Bearer ${token}`).send(userId);
        
        assert.strictEqual(response.status, 200);
        assert.ok(response.body);
        code = response.body.code;
        console.log(`${code} não sei o que é isso`);
    })
    it("should change the password", async () => {
        console.log(`${code} Código`)
        let userId = String(user.id)
        let newPassword = "nova_senha@123"
        const response = await request(app).put('/user/password').set('Authorization', `Bearer ${token}`).send({userId,newPassword,code})
        assert.strictEqual(response.status, 200);
        assert.ok(response.body);
        console.log(response.body);
})
})
});
 