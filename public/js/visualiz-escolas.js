import API from './services/api.js'

// Função para gerar o card de uma escola
function EscolaCard(escola) {
  return `
  <div class="col">
    <a href="http://localhost:3000/escola?id=${escola.id_escola}">
      <button id="${escola.id_escola}"
        class="nav-link"
        data-bs-toggle="tab"
        type="button"
        role="tab"
        aria-controls="nav-school-tab"
        aria-selected="false"
      >
        <h3 style="font-size: 2em;">${escola.name}</h3>
        <div style="line-height: 1.6">
          <span style="font-size: 0.9em;">Endereço: ${escola.endereco}</span><br>
          <span style="font-size: 0.9em;">Telefone: ${escola.telefone}</span><br>
          <span style="font-size: 0.9em;">Rede de Ensino: ${escola.nome_rede}</span><br>
          <span style="font-size: 0.9em;">Horários: ${escola.horários}</span>
        </div>
      </button>
    </a>
  </div>`;
}

// Função para inserir o card da escola no DOM
function createSchoolCard(escola) {
  const cards = document.querySelector('.cards');
  cards.insertAdjacentHTML('beforeend', EscolaCard(escola));
}

// Função para carregar as escolas e exibir no frontend
async function loadSchoolCards() {
  try {
    const escolas = await API.read('/schools'); // Faz a requisição para obter todas as escolas
    console.log(escolas);
    document.querySelector('.cards').innerHTML = ''; // Limpa as escolas antes de carregar novas
    for (const escola of escolas) {
      createSchoolCard(escola); // Cria o card de cada escola
    }
  } catch (error) {
    console.error('Erro ao carregar escolas:', error);
  }
}

// Função para aplicar o filtro
async function Filter(filter) {
  try {
    const data = await API.read(`/schools/`); // Faz a requisição passando os filtros na query string
    if(!filter) return data
    let filteredData
    //console.log(data)
    if(filter?.name && filter?.turn){
      filteredData = data.filter((el) => el.serie?.includes(filter.name) && el.turno?.includes(filter.turn))
    }
    else{
    if(filter?.name){
      filteredData = data.filter((el) => el.serie?.includes(filter.name));
    }
    if(filter?.turn){
      filteredData = data.filter((el) => el.turno?.includes(filter.turn))
    }
    console.log(filter)}
    return filteredData
  } catch (err) {
    console.log('Erro no filtro:', err);
  }
}

// Função para manipular o filtro de escolas
function loadHandleFilterSchool() {
  const button = document.querySelector('.btn.filter-schools');

  button.onclick = async () => {
    const filterName = document.querySelector('#filter-name-schools').value; // Exemplo: obtém o valor do input do filtro
    const filterTurn = document.querySelector('#filter-turn-schools').value; // Exemplo: obtém o valor do input do filtro
    const filters = {};

    if (filterName || filterTurn) {
      filters.name = filterName; // Adiciona o filtro de nome
      filters.turn = filterTurn;
    }

    const filteredSchools = await Filter(filters); // Passa os filtros para a função Filter
    console.log(filteredSchools)
    document.querySelector('.cards').innerHTML = ''; // Limpa as escolas antes de carregar as filtradas
    for (const escola of filteredSchools) {
      createSchoolCard(escola); // Recarrega os cards com base no filtro
    }
  };
}

// Função para manipular o formulário de criação/edição de escola
/*function loadHandleFormSubmit(type, id) {
  const form = document.querySelector('form');

  form.onsubmit = async (event) => {
    event.preventDefault();

    const escola = Object.fromEntries(new FormData(form));

    if (type === 'create') {
      const createdSchool = await API.create('/schools', escola);
      createSchoolCard(createdSchool); // Cria o card com a nova escola
    } else if (type === 'update') {
      const updatedSchool = await API.update(`/schools/${id}`, escola);
      updateSchoolCard(updatedSchool); // Atualiza o card da escola existente
    }

    form.reset();
    document.querySelector('#offcanvas-close').click();
  };
}

// Função para manipular a criação de novas escolas
function loadHandleCreateSchool() {
  const button = document.querySelector('.btn.create-school');

  button.onclick = () => {
    bsOffcanvas.show();
    loadHandleFormSubmit('create');
  };
}

// Função para editar escola existente
function loadHandleUpdateSchool(id) {
  const iconPencil = document.querySelector(`#school-${id} .icon-pencil`);

  iconPencil.onclick = async () => {
    const escola = await API.read(`/schools/${id}`);
    const { nome, endereco, telefone, anos, horarios } = escola;

    // Preenche o formulário com os dados da escola existente
    document.querySelector('form #nome').value = nome;
    document.querySelector('form #endereco').value = endereco;
    document.querySelector('form #telefone').value = telefone;
    document.querySelector('form #anos').value = anos;
    document.querySelector('form #horarios').value = horarios;

    bsOffcanvas.show();
    loadHandleFormSubmit('update', id); // Prepara o formulário para atualização
  };
}

// Função para confirmar remoção de uma escola
function loadHandleConfirmModal(id) {
  const iconTrash = document.querySelector(`#school-${id} .icon-trash`);

  iconTrash.onclick = () => {
    removedHostId = id;
    confirmModal.show(); // Exibe modal de confirmação
  };
}

// Função para remover escola
function loadHandleRemoveSchool() {
  const confirmBtn = document.querySelector('.modal .btn-primary');

  confirmBtn.onclick = async () => {
    await API.remove(`/schools/${removedHostId}`); // Remove a escola
    document.querySelector(`#school-${removedHostId}`).remove(); // Remove o card da escola do DOM
    confirmModal.hide(); // Fecha o modal
  };
}*/

// Carrega as escolas ao inicializar
loadSchoolCards();
loadHandleFilterSchool();
//loadHandleRemoveSchool();
