# MatriculaJa
O projeto consiste numa aplicação Web feita para agilizar do processo de matrícula em instituições de ensino, indo desde o Fundamental até o ensino médio.

## npm com error
 Set-ExecutionPolicy -ExecutionPolicy Unrestricted -Scope CurrentUser

## Comandos

|  Função  | Comando |
| -------- | ------- |
| Inicia o BD  | npx prisma migrate dev --name init    |


### Inicia o BD
  npx prisma migrate dev --name init

### Manda os dados para o BD
  npx prisma db seed

### Reseta o banco de dados
  npx prisma migrate reset

### Inicia o site
  npm run start