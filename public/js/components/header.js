let  userHTMLMenu = ""
let login = ""
if (localStorage.getItem('authToken')){
    userHTMLMenu = `<li class="nav-item" id="usuario" >
            <button class="nav-link" aria-controls="username-desc" onclick=user_menu() aria-label="Help about username" type="button" aria-expanded="false" style="border: none; background: none;">
              Usuario
            </button></li>`
} else{
  login = `<!--Novo-->
  <li class="nav-item">
    <a class="nav-link" href="http://localhost:3000/login">
      <small class="small-title"><strong class="text-purple"></strong>LOGIN</small>
    </a>
  </li>`
}

const header = `
<div class="container">

      <img src="../images/Logo_nome_nova.png" style="height: 15%; width: 10%;">
      <a href="#" class="navbar-brand" style="margin-left: 20px;">Matrícula<span class="text-purple"> Já</span></a> 
     
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto">
          
          <li class="nav-item">
            <a class="nav-link" href="http://localhost:3000/home">
              <small class="small-title"><strong class="text-purple"></strong>INÍCIO</small>
            </a>
          </li>

          <!--Novo  click-scroll -->
          <li class="nav-item">
            <a class="nav-link" href="http://localhost:3000/escolas">
              <small class="small-title"><strong class="text-purple"></strong>ESCOLAS</small> 
            </a>
          </li>

          ${login}

          <li class="nav-item">
            <a class="nav-link" href="http://localhost:3000/home">
              <small class="small-title"><strong class="text-purple"></strong>FAQ</small> 
            </a>
          </li>
          <!-- Botão do usuário -->
          ${userHTMLMenu}
          


        </ul>
        </div>
        </div>`



document.addEventListener('DOMContentLoaded', (event) => {
    const homepage = document.querySelector('.navbar-component-js');
    homepage.insertAdjacentHTML('afterbegin', header);
});

function exitMenu() {
  document.getElementById("menu").remove();
  document.getElementById("bottom").remove();
};

function user_menu() {
  const user = JSON.parse(localStorage.getItem('user'))

  const bottom = `<div id="bottom" onclick="exitMenu()" style="z-index: 9998; position:fixed; top:0px; right0px; width:100%; height:100%; background-color: black; opacity:40%;"  ></div>`
  const menu = `
    <div id="menu" style=" display: ruby; z-index: 9999; position: fixed; top: 0px; right: 0px; background: white; border: 1px solid #ccc; padding: 10px;
      box-shadow: 0px 4px 6px rgba(0,0,0,0.1); border-radius: 5px; height:100%; width: 26.5%;">
      <img src="${user.image}" style="height: 9%; width: 16.5%; border-radius: 50%; margin-bottom: 10px;"> <h1 style="font-size: 28px; margin-bottom: 10px;">Olá, \&nbsp ${user.nome}</h1>
      <ul style="list-style: none; padding: 0;">
        <li><a href="credenciais">Alterar foto de perfil</a></li>
        <li><a href="alterarSenha" onclick="updateProfile()">Alterar senha</a></li>
        <!-- Botão de Logout -->
          <li class="nav-item">
            <button class="nav-link" onclick="logout()" style="border: none; background: none;">
              <small class="small-title" style="color:red;"><strong class="text-purple"></strong>LOGOUT</small>
            </button>
          </li>
      </ul>
    </div>
  `;


  
  // Adiciona o menu diretamente ao body para garantir que ele fique sobre todos os elementos
  document.body.insertAdjacentHTML("beforeend", bottom);
  document.body.insertAdjacentHTML("beforeend", menu);
}




function logout(){
  localStorage.removeItem('authToken')
  localStorage.removeItem('user')

  window.location.href= "./login"
}