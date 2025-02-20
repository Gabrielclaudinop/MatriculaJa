import { describe, it, before } from 'node:test';
import assert from 'node:assert';
import request from 'supertest';
import app from '../../server.js'
import { response } from 'express';

//Adicionar testes para cadastro e e GET de usuário