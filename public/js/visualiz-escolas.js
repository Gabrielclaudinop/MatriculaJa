//import { investments } from './escolas.js'; //

const response = await fetch('http://localhost:3000/dados'); //

const investments = await response.json();//

console.log(investments)

const cards = document.querySelector('.cards');

let x = 0

//function redirecionar(school){
//  sessionStorage.setItem("escola", school);
//  location.assign("../html/info-escola.html")
//}
function EscolaCard(escola){
  return `
  <div class="col">
  <a href="http://localhost:3000/escola/?id=${escola.id}">
    <button id="${x}"
      class="nav-link" 
      id="nav-business-tab" data-bs-toggle="tab"  type="button" role="tab" aria-controls="nav-strategy-tab" aria-selected="false"
    >
    
        <h3 class='' style="font-size: 2em;">${escola.nome}</h3>
        <div style="line-height: 1.6">
        <span style="font-size: 0.9em;">${escola.endereco}</span>
        <span style="font-size: 0.9em;">${escola.telefone}</span>
        <span style="font-size: 0.9em;">${escola.anos}</span>
        <span style="font-size: 0.9em;">${escola.horários}</span>
        </div>
      </button>
      </a>
    <div>`;
}


function createInvestmentCard(investment) {
  cards.insertAdjacentHTML(
    'beforeend',
    InvestmentCard(investment)
  );

  loadHandleConfirmModal(investment.id);

  loadHandleUpdateInvestment(investment.id);
}


async function loadInvestmentCards() {
  const escolas = await API.read('/investments');
  print(escolas)
  for (const escola of escolas) {
    createInvestmentCard(escola);
  }
}


function loadHandleFormSubmit(type, id) {
  const form = document.querySelector('form');

  form.onsubmit = async (event) => {
    event.preventDefault();

    const investment = Object.fromEntries(new FormData(form));

    investment.value = Number(investment.value) * 100;

    if (type === 'create') {
      const createdInvestment = await API.create('/investments', investment);

      createInvestmentCard(createdInvestment);
    } else if (type === 'update') {
      const updatedInvestment = await API.update(
        `/investments/${id}`,
        investment
      );

      updateInvestmentCard(updatedInvestment);
    }

    form.reset();

    document.querySelector('#offcanvas-close').click();
  };
}
function loadHandleCreateInvestment() {
  const button = document.querySelector('.btn.create-investment');

  button.onclick = () => {
    bsOffcanvas.show();

    loadHandleFormSubmit('create');
  };
}

function loadHandleUpdateInvestment(id) {
  const iconPencil = document.querySelector(`#investment-${id} .icon-pencil`);

  iconPencil.onclick = async () => {
    const investment = await API.read(`/investments/${id}`);

    const { name, value } = investment;

    document.querySelector('form #name').value = name;

    document.querySelector('form #value').value = value / 100;

    bsOffcanvas.show();

    loadHandleFormSubmit('update', id);
  };
}

function loadHandleConfirmModal(id) {
  const iconTrash = document.querySelector(`#investment-${id} .icon-trash`);

  iconTrash.onclick = () => {
    removedHostId = id;

    confirmModal.show();
  };
}

function loadHandleRemoveInvestment() {
  const confirmBtn = document.querySelector('.modal .btn-primary');

  confirmBtn.onclick = () => {
    API.remove(`/investments/${removedHostId}`);

    document.querySelector(`#investment-${removedHostId}`).remove();

    confirmModal.hide();
  };
}

loadInvestmentCards();

loadHandleCreateInvestment();

loadHandleRemoveInvestment();
