import "../scss/style.scss";

import { todoApi } from "./todo/todoApi";

import { createTodoItem } from "./todo/todoItemTemplate";


const todoFormElement = document.querySelector("[data-todo-form]");

const todoInputElement = todoFormElement.querySelector("[data-todo-input]");

const todoListElement = document.querySelector("[data-todo-list]");

const todoErrorMesage = document.querySelector("[data-todo-form-error]");

todoInputElement.addEventListener("input", () => {
  todoFormElement.classList.remove("form-invalid");
  todoErrorMesage.textContent = "";
});

todoFormElement.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!isFormValid()) {
    todoErrorMesage.textContent = "Заполните поле";
    todoFormElement.classList.add("form-invalid");
    return;
  }

  const data = {
    task: todoInputElement.value,
    isCompleted: false,
  };

  todoApi.addToDo(data).then((data) => {
    todoListElement.innerHTML += createTodoItem(data.task);
    todoInputElement.value = "";
  })
  .catch((error) => {
    todoErrorMesage.innerHTML = error.message;
  });
});

function isFormValid(){
      return !! todoInputElement.value 
}
