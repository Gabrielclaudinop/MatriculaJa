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

          <!--Novo-->
          <li class="nav-item">
            <a class="nav-link" href="http://localhost:3000/login">
              <small class="small-title"><strong class="text-purple"></strong>LOGIN</small>
            </a>
          </li>

          <li class="nav-item">
            <a class="nav-link" href="http://localhost:3000/#">
              <small class="small-title"><strong class="text-purple"></strong>FAQ</small> 
            </a>
          </li>

          <!-- Botão de Logout -->
          <li class="nav-item">
            <button class="nav-link" onclick="logout()" style="border: none; background: none;">
              <small class="small-title"><strong class="text-purple"></strong>LOGOUT</small>
            </button>
          </li>


        </ul>
        </div>
        </div>`


document.addEventListener('DOMContentLoaded', (event) => {
    const homepage = document.querySelector('.navbar-component-js');
    homepage.insertAdjacentHTML('afterbegin', header);
});