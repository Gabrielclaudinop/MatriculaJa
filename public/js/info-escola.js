import API from './services/api.js' 
//const response = await fetch('http://localhost:3000/dados'); //

//const investments = await response.json(); //

const cards = document.querySelector('.cards');
const mapalink = document.getElementById("mapalink")
const foto_escola = document.getElementById("foto_escola")
var escolaId = ''
document.addEventListener('DOMContentLoaded', function() {
  const urlParams = new URLSearchParams(window.location.search)
  escolaId = urlParams.get("id")

console.log(escolaId)
function createSchoolInfo(escola){
const view = `
    <button class="nav-link" id="nav-business-tab" data-bs-toggle="tab" data-bs-target="#produto" escola_num="${escola.id_escola}" type="button" role="tab" aria-controls="nav-strategy-tab" aria-selected="false">
                  <h3 class='' style="font-size: 2em;">INFORMAÇÕES</h3>
                  <div style="line-height: 1.6">
                  <span style="font-size: 0.9em;">${escola.endereco}</span>
                  <span style="font-size: 0.9em;">${escola.telefone}</span>
                  <span style="font-size: 0.9em;">${escola.anos}</span>
                  <span style="font-size: 0.9em;">${escola.horários}</span>
                  </div></button>
    <button class="nav-link" id="nav-business-tab" data-bs-toggle="tab" data-bs-target="#mapa" escola_num="${escola.id_escola}" type="button" role="tab" aria-controls="nav-strategy-tab" aria-selected="false">
      <h3 class='' style="font-size: 2em;">MAPA</h3>
      <div style="line-height: 1.6">
      <span style="font-size: 0.9em;">${escola.endereco}</span>
      </div></button>
                  `


cards.insertAdjacentHTML('beforeend', view);

mapalink.src = `${escola.mapa}`
foto_escola.src = `../images/Escolas/${escola.foto}`

const titulo = document.getElementById('título')
titulo.innerHTML = `${escola.name}`
}

async function loadSchoolInfo(){
  try {
    const escola = await API.read(`/schools/${escolaId}`); // Faz a requisição para obter todas as escolas
    console.log(escola)
    createSchoolInfo(escola); // Cria o card de cada escola
  } catch (error) {
    console.error('Erro ao carregar escolas:', error);
  }
}

loadSchoolInfo()
})