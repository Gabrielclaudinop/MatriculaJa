-- CreateTable
CREATE TABLE "escolas" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "endereco" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "horarios" TEXT NOT NULL,
    "mapa" TEXT NOT NULL,
    "foto" TEXT NOT NULL,
    "turno" TEXT NOT NULL,
    "serie" TEXT NOT NULL,
    "vagas_ofertadas" INTEGER NOT NULL,
    "vagas_disponiveis" INTEGER NOT NULL
);
