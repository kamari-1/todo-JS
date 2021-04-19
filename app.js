//! SELECTORS
const todoInput = document.querySelector(".todo-input"); // <input>
const todoBtn = document.querySelector(".todo-btn"); // <button>
const todoList = document.querySelector(".todo-list"); // <ul>
const filterOption = document.querySelector(".filter-todo"); // <select>
const clearAll = document.querySelector("#clear-all"); // <div .clear-all>

//! EVENT LISTENERS
todoBtn.addEventListener("click", handleSubmit);
filterOption.addEventListener("click", filterTodo);
clearAll.addEventListener("click", clearTodo);

//! FUNCTIONS
// *****************************************************************************
//Focus input on load
window.onload = function () {
  const input = document.getElementById("todo-input").focus();
};

// *****************************************************************************
//handleSubmit
function handleSubmit(event) {
  event.preventDefault();

  const letters = /^[a-zA-Z0-9_ ]*$/;
  if (todoInput.value != "" && todoInput.value.match(letters))
    addTodo(todoInput.value);
  todoInput.value = "";
}

// *****************************************************************************
//adTodo
function addTodo(todo) {
  // Create instance of todo
  //Create Div
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");

  //Create Li
  const todoText = document.createElement("li");
  todoText.innerText = todoInput.value;
  todoText.classList.add("todo-item");
  todoDiv.appendChild(todoText);

  //Create check button
  const checkBtn = document.createElement("button");
  checkBtn.innerHTML = '<i class="fas fa-check"></i>';
  checkBtn.classList.add("check-btn");
  todoDiv.appendChild(checkBtn);

  //Create trash button
  const trashBtn = document.createElement("button");
  trashBtn.innerHTML = '<i class="fas fa-trash"></i>';
  trashBtn.classList.add("trash-btn");
  todoDiv.appendChild(trashBtn);

  //Append to <ul>
  todoList.appendChild(todoDiv);

  // check-btn & trash-btn functionalities
  todoDiv.addEventListener("click", checkOrTrash);
  //handleCheck
}

// *****************************************************************************
// Check & Trash Buttons
function checkOrTrash(e) {
  const item = e.target;
  //check
  if (item.classList[0] == "check-btn")
    item.parentElement.classList.toggle("complete");

  //trash
  if (item.classList[0] == "trash-btn") {
    const todo = item.parentElement;
    todo.classList.add("delete-motion");
    todo.addEventListener("transitionend", function () {
      todo.remove();
    });
  }
}

// *****************************************************************************
// Filter selector
function filterTodo(e) {
  const todos = todoList.childNodes;
  todos.forEach(function (todo) {
    switch (e.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        if (todo.classList.contains("complete")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "uncompleted":
        if (!todo.classList.contains("complete")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      default:
        break;
    }
  });
}

// *****************************************************************************
// Clear All button
function clearTodo(e) {
  todoList.innerHTML = "";
}
