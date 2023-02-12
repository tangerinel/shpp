const route = "/router";
const apiURL = "http://localhost:3005/api/";
const apiVersion = "v2";
const homepage = "homepage.html";
let tasks = [];

const loginButton = document.querySelector("#login-button");
const registerButton = document.querySelector("#register-button");

loginButton?.addEventListener("click", login);
registerButton?.addEventListener("click", register);

function login(event) {
  if (event) event.preventDefault();
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
  const qs = { action: "getItems" };
  fetch(apiURL + apiVersion + route + "?" + new URLSearchParams(qs), {
    credentials: "include",
    method: "POST",
  })
    .then(res => res.json())
    .then((response) => {
      if (response.error === "forbidden") {
        login();
      } else {
        tasks = response.items.map((item) => {
          item.editable = false;
          return item;
        });
        tasks.forEach((task) => loadTask(task));
      }
    })
    .catch((error) => {
      console.log(error);
    });
}

function loadUser() {
  // window.location.assign(homepage);
  // getTasks();
  //window.location.href = homepage;
  fetch(homepage)
    .then((x) => x.text())
    .then((y) => (document.querySelector("html").innerHTML = y));
    getTasks();
}

function loadTask(task) {
  const itemDiv = document.createElement("div");
  itemDiv.classList.add("item");

  const checkedButton = document.createElement("button");
  checkedButton.innerHTML = '<i class="fa fa-square-o"></i>';
  checkedButton.classList.add("check");
  itemDiv.appendChild(checkedButton);

  const submittedTaskDiv = document.createElement("div");
  submittedTaskDiv.setAttribute("id", "submitted-task");
  itemDiv.appendChild(submittedTaskDiv);

  const itemInputEl = document.createElement("input");
  itemInputEl.classList.add("text");
  itemInputEl.type = "text";
  itemInputEl.value = task.text;
  itemInputEl.setAttribute("readonly", "readonly");
  submittedTaskDiv.appendChild(itemInputEl);

  const itemSettingDiv = document.createElement("div");
  itemSettingDiv.classList.add("item-settings");

  const editButton = document.createElement("button");
  editButton.innerHTML = `<i class="fa fa-edit"></i>`;
  editButton.classList.add("edit");
  itemSettingDiv.appendChild(editButton);

  const deleteButton = document.createElement("button");
  deleteButton.innerHTML = '<i class="fa fa-trash-o"></i>';
  deleteButton.classList.add("delete");
  itemSettingDiv.appendChild(deleteButton);
  itemDiv.appendChild(itemSettingDiv);

  document.getElementById("items").appendChild(itemDiv);
}
