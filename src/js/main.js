import "../scss/style.scss";

import { todoApi } from "./todo/todoApi";

import { createTodoItem } from "./todo/todoItemTemplate";

const todoFormElement = document.querySelector("[data-todo-form]");

const todoInputElement = todoFormElement.querySelector("[data-todo-input]");

const todoListElement = document.querySelector("[data-todo-list]");

const todoErrorMesage = document.querySelector("[data-todo-form-error]");

const todoRemoveBtn = document.querySelector('[data-todo-remove-btn]')


// localStorage.removeItem('tasks')
let tasksArr = localStorage.getItem("tasks") ? JSON.parse(localStorage.getItem("tasks")) : [];



for (const task of tasksArr){
   
    todoListElement.innerHTML += createTodoItem(task)
}

todoInputElement.addEventListener("input", () => {
  todoFormElement.classList.remove("form-invalid");
  todoErrorMesage.textContent = "";
});

todoFormElement.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!isFormValid(todoInputElement.value)) {
    todoErrorMesage.textContent = "Заполните поле";
    todoFormElement.classList.add("form-invalid");
    return;
  }
  const data = {
    task: todoInputElement.value,
    isCompleted: false,
  };


  todoApi
    .addToDo(data)
    .then((data) => {
     tasksArr.push(todoInputElement.value);
     localStorage.setItem("tasks", JSON.stringify(tasksArr));
      todoListElement.innerHTML += createTodoItem(data.task);
      todoInputElement.value = "";
    })
    .catch((error) => {
      todoErrorMesage.innerHTML = error.message;
    });
});

function isFormValid(value) {
  return !!value;
}


document.addEventListener('click', (event)=>{
    const {target} = event
    if (target.closest('[data-todo-remove-btn]')){
      const currentTask =  target.closest('[data-todo-item]').querySelector('[data-task-text]').textContent
      
    }
})