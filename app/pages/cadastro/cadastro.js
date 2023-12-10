document.getElementById("cadastro").addEventListener("submit", function(event) {
  let passwordInput = document.getElementById("password");
  let passwordError = document.getElementById("senhaErrada");
  let passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  event.preventDefault();
  
  if (!passwordPattern.test(passwordInput.value)) {
    passwordError.textContent = "A senha deve conter pelo menos uma letra, um número e um caractere especial, com um mínimo de 8 caracteres.";
  } else {
    passwordError.textContent = "";
  }

});

document.getElementById("cadastro").addEventListener("submit", function(event) {
  let nameComplete = document.getElementById("nameComplete"); 
  let username = document.getElementById("username");
  let userEmail = document.getElementById("userEmail");
  let password = document.getElementById("password");

  localStorage.setItem("nameComplete", nameComplete.value);
  localStorage.setItem("username", username.value);
  localStorage.setItem("userEmail", userEmail.value);
  localStorage.setItem("password", password.value);

  window.location.href = "../login/index.html";
});