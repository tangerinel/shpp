const route = "/router";
const apiURL = "http://localhost:3005/api/";
const apiVersion = "v2";

const loginButton = document.querySelector("#login-button");
const registerButton = document.querySelector("#register-button");

loginButton.addEventListener("click", login);
registerButton.addEventListener("click", register);

function login(event) {
  if(event) event.preventDefault();

  let login = document.getElementById("login-field").value.trim();
  let pass = document.getElementById("password-field").value.trim();

  if (login !== "" && pass) {
    let params = JSON.stringify({ login: login, pass: pass });
    let qs = { action: "login" };
    fetch(apiURL + apiVersion + route + "?" + new URLSearchParams(qs), {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: params,
    })
      .then((response) => response.json())
      .then((res) => {
        if (res.ok) {
          localStorage.setItem("name", login);
          loadUser();
        } else if (res.error === "not found") {
          alert("Такая комбинация логина и пароля не найдена");
        } else {
          alert(
            "Произошла ошибка. Посмотрите консоль разработчика чтоб увидеть подробности."
          );
        }
      });
  }
}

  function register(event) {
    event.preventDefault();

    let userLogin = document.getElementById("login-field").value.trim();
    let pass = document.getElementById("password-field").value.trim();

    if (userLogin !== "" && pass) {
      let params = JSON.stringify({ login: userLogin, pass: pass });
      let qs = { action: "register" };
      fetch(apiURL + apiVersion + route + "?" + new URLSearchParams(qs), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: params,
      })
        .then((response) => response.json())
        .then((res) => {
          if (res.ok) {
            login();
          } else {
            alert(
              "Произошла ошибка. Посмотрите консоль разработчика чтоб увидеть подробности."
            );
          }
        });
    }
  }

  function getTasks() {
    const qs = {action: 'getItems'};
    fetch(apiURL + apiVersion + route  + '?' + new URLSearchParams(qs), { 
        credentials: 'include',
        method:   'POST',
    })
        .then(res => res.json())
        .then((response) => {
            if (response.error === 'forbidden') {
                login();
            } else {
                this.tasks = response.items.map((item) => {
                    item.editable = false;
                    return item;
                })
                loadTasks();
            }
        }).catch((error) => {
            alert('error');
            console.log(error);
        })
  }

function loadUser(){
    window.location.href = "indexTask.html";
    getTasks();
}
function loadTasks(){

}