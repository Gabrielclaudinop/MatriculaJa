async function getVagas() {
    const response = await fetch('http://localhost:3000/turmas/vagas');  
    const data = await response.json();
    return data;
  }
  
  async function processarVagasPorSerie() {
    const dados = await getVagas();
    const series = [...new Set(dados.map(turma => turma.serie))];
    const turmas = document.getElementById('turma-container');
  
    const vagasPorSerie = series.map(serie => {
      const turmasFiltradas = dados.filter(turma => turma.serie === serie);
      const vagasOfertadas = turmasFiltradas.reduce((sum, turma) => sum + turma.escolas[0].qtde_vagas_ofertadas, 0);
      const vagasDisponiveis = turmasFiltradas.reduce((sum, turma) => sum + turma.escolas[0].qtde_vagas_disponiveis, 0);
  
      return {
        serie,
        vagasOfertadas,
        vagasDisponiveis
      };
    });
  
    console.log(vagasPorSerie);
    turmas.innerHTML += vagasPorSerie.map(serie => `<tr>
    <td>${serie.serie}°</td><td>${serie.vagasOfertadas}</td> <td>${serie.vagasDisponiveis}</td>
    </tr>`).join('');
    return vagasPorSerie;
  }
  
  async function processarVagasPorTurno() {
    const dados = await getVagas();
    const turnos = [...new Set(dados.map(turma => turma.turno))];
    const container = document.getElementById('turno-container');
  
    const vagasPorTurno = turnos.map(turno => {
      const turmasFiltradas = dados.filter(turma => turma.turno === turno);
      const vagasOfertadas = turmasFiltradas.reduce((sum, turma) => sum + turma.escolas[0].qtde_vagas_ofertadas, 0);
      const vagasDisponiveis = turmasFiltradas.reduce((sum, turma) => sum + turma.escolas[0].qtde_vagas_disponiveis, 0);
  
      return {
        turno,
        vagasOfertadas,
        vagasDisponiveis
      };
    });
  
    console.log(vagasPorTurno);
    container.innerHTML += vagasPorTurno.map(turno => `<tr>
                              <td>${turno.turno}</td><td>${turno.vagasOfertadas}</td> <td>${turno.vagasDisponiveis}</td>
                            </tr>`).join('');
    return vagasPorTurno;
  }
  
  processarVagasPorSerie();
  processarVagasPorTurno();