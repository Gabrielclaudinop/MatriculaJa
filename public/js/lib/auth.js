function isAuthenticated() {
    if (!getToken()) {
      window.location.href = '/signin.html';
    } else {
      return true;
    }
  }
  
  function getToken() {
    return localStorage.getItem('@invest-app:token');
  }
  
  function signin(token) {
    localStorage.setItem('@invest-app:token', token);
  
    window.location.href = '/index.html';
  }
  
  function signout() {
    localStorage.removeItem('@invest-app:token');
  
    window.location.href = '/login.html';
  }
  
  export default { isAuthenticated, getToken, signin, signout };