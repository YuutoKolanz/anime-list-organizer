document.getElementById("mudarParaCadastro").addEventListener("click", function() {
  window.location.href = "/app/pages/cadastro/index.html";
});

document.getElementById("login").addEventListener("submit", function(event){
  event.preventDefault();

  let usernameLogin = document.getElementById("username").value;
  let passwordLogin = document.getElementById("password").value;
  let usernameStorage = localStorage.getItem("username");
  let passwordStorage = localStorage.getItem("password")
  let loginErrado = document.getElementById("loginIncorreto");

  console.log(usernameLogin);
  console.log(passwordLogin);
  console.log(usernameStorage);
  console.log(passwordStorage);

  if(usernameLogin == usernameStorage && passwordLogin == passwordStorage){
    window.location.href = "../../index.html";
  } else {
    loginErrado.innerHTML = "Usuário ou senha incorretos."
  }
});