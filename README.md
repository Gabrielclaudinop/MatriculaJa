# MatriculaJa
O projeto consiste numa aplicação Web feita para agilizar do processo de matrícula em instituições de ensino, indo desde o Fundamental até o ensino médio.

## npm com error
 Set-ExecutionPolicy -ExecutionPolicy Unrestricted -Scope CurrentUser

## TABELAS
 const investmentsSql = `
CREATE TABLE situacao (
    id INTEGER PRIMARY KEY,
    name VARCHAR(255),
    value VARCHAR(255)

);
CREATE TABLE rede_ensino (
    id_rede_ensino INTERGER PRIMARY KEY AUTOINCREMENT,
    nome_rede VARCHAR(255)
);

CREATE TABLE escola (
    id_escola INTEGER PRIMARY KEY AUTOINCREMENT,
    id_rede INTERGER,
    name VARCHAR(255),
    endereco VARCHAR(255),
    telefone VARCHAR(255),
    horários VARCHAR(255),
    mapa VARCHAR(255),
    foto VARCHAR(255),
    value VARCHAR(255),
    FOREIGN KEY (id_rede) REFERENCES rede_ensino (id_rede_ensino)
);

CREATE TABLE turma (
    id_turma INT PRIMARY KEY,
    nome_turma VARCHAR(255),
    id_serie_fk INT,
    id_regime_tempo_fk INT,
    id_turno_fk INT,
    FOREIGN KEY (id_serie_fk) REFERENCES serie(id_serie),
    FOREIGN KEY (id_regime_tempo_fk) REFERENCES regime_tempo(id_regime_tempo),
    FOREIGN KEY (id_turno_fk) REFERENCES turno(id_turno)
);

CREATE TABLE estudantes_turmas_escolas (
    id_estudante INT PRIMARY KEY,
    id_turma_fk INT,
    id_escola_fk INT,
    ano INT,
    datahora_prematricula DATETIME,
    datahora_matricula DATETIME,
    id_situacao_fk INT,
    FOREIGN KEY (id_turma_fk) REFERENCES turma(id_turma),
    FOREIGN KEY (id_escola_fk) REFERENCES escola(id_escola),
    FOREIGN KEY (id_situacao_fk) REFERENCES situacao(id_situacao)
);

CREATE TABLE turmas_escolas (
    id_escola_fk INT,
    id_turma_fk INT,
    ano INT,
    qtd_vagas_ofertadas INT,
    qtd_vagas_disponiveis INT,
    PRIMARY KEY (id_escola_fk, id_turma_fk, ano),
    FOREIGN KEY (id_escola_fk) REFERENCES escola(id_escola),
    FOREIGN KEY (id_turma_fk) REFERENCES turma(id_turma)
);

CREATE TABLE respostas_comunicacao (
    id_respostas INT PRIMARY KEY,
    datahora_resposta DATETIME,
    texto_resposta TEXT,
    id_comunicacao_site_fk INT,
    id_respondente_fk INT,
    FOREIGN KEY (id_comunicacao_site_fk) REFERENCES comunicacoes_site(id_comunicacao),
    FOREIGN KEY (id_respondente_fk) REFERENCES usuario(id_usuario)
);

CREATE TABLE configuracoes (
    id_configuracao INT PRIMARY KEY,
    datahora_alteracao DATETIME,
    servico_email VARCHAR(255),
    usuario_servico_email VARCHAR(255),
    senha_servico_email VARCHAR(255),
    url_prematricula VARCHAR(255),
    url_matricula VARCHAR(255),
    calendario_datas TEXT,
    ativo BOOLEAN,
    id_responsavel_alteracao_fk INT,
    FOREIGN KEY (id_responsavel_alteracao_fk) REFERENCES usuario(id_usuario)
);

CREATE TABLE usuario (
    id_usuario INT PRIMARY KEY,
    nome_usuario VARCHAR(255),
    id_perfil_fk INT,
    FOREIGN KEY (id_perfil_fk) REFERENCES perfil(id_perfil)
);

CREATE TABLE perfil (
    id_perfil INT PRIMARY KEY,
    nome_perfil VARCHAR(255)
);

CREATE TABLE comunicacoes_site (
    id_comunicacao INT PRIMARY KEY,
    id_tipo_comunicacao_fk INT,
    descricao_comunicacao TEXT,
    datahora_envio DATETIME,
    email_contato VARCHAR(255),
    FOREIGN KEY (id_tipo_comunicacao_fk) REFERENCES tipo_comunicacao(id_tipo_comunicacao)
);

CREATE TABLE logradouro (
    id_logradouro INT PRIMARY KEY,
    nome_logradouro VARCHAR(255)
);

CREATE TABLE bairro (
    id_bairro INT PRIMARY KEY,
    id_logradouro_fk INT,
    id_cidade_fk INT,
    cep VARCHAR(20),
    FOREIGN KEY (id_logradouro_fk) REFERENCES logradouro(id_logradouro),
    FOREIGN KEY (id_cidade_fk) REFERENCES cidade(id_cidade)
);

CREATE TABLE cidade (
    id_cidade INT PRIMARY KEY,
    nome_cidade VARCHAR(255)
);

CREATE TABLE serie (
    id_serie INT PRIMARY KEY,
    nome_serie VARCHAR(255),
    id_nivel_ensino_fk INT,
    FOREIGN KEY (id_nivel_ensino_fk) REFERENCES nivel_ensino(id_nivel_ensino)
);

CREATE TABLE nivel_ensino (
    id_nivel_ensino INT PRIMARY KEY,
    nome_nivel_ensino VARCHAR(255)
);

CREATE TABLE regime_tempo (
    id_regime_tempo INT PRIMARY KEY,
    nome_regime_tempo VARCHAR(255)
);

CREATE TABLE turno (
    id_turno INT PRIMARY KEY,
    nome_turno VARCHAR(255)
);

CREATE TABLE tipo_comunicacao (
    id_tipo_comunicacao INT PRIMARY KEY,
    nome_tipo_comunicacao VARCHAR(255)
);

CREATE TABLE alertas (
    id_alerta INT PRIMARY KEY,
    titulo_alerta VARCHAR(255),
    descricao_alerta TEXT
);

CREATE TABLE alertas_usuarios (
    id_alerta_usuario INT PRIMARY KEY,
    id_alerta_fk INT,
    id_usuario_fk INT,
    data_envio_alerta DATETIME,
    FOREIGN KEY (id_alerta_fk) REFERENCES alertas(id_alerta),
    FOREIGN KEY (id_usuario_fk) REFERENCES usuario(id_usuario)
  );
  `; 