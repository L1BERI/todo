import "../scss/style.scss";
import { todoApi } from "./todo/todoApi";
import { createTodoItem } from "./todo/todoItemTemplate";

const todoFormElement = document.querySelector("[data-todo-form]");

const todoInputElement = todoFormElement.querySelector("[data-todo-input]");

const todoListElement = document.querySelector("[data-todo-list]");

const todoErrorMesage = document.querySelector("[data-todo-form-error]");

const localStorageArr = JSON.parse(localStorage.getItem("tasks"));

localStorage.removeItem('tasks')
let tasksArr = localStorageArr?.length
  ? JSON.parse(localStorage.getItem("tasks"))
  : [];

for (const task of tasksArr) {
  todoListElement.innerHTML += createTodoItem(task);
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

  const taskPayload = {
    name: todoInputElement.value,
    isCompleted: false,
  };

  todoApi
    .addToDo(taskPayload)
    .then((result) => {
      tasksArr.push(result);
      localStorage.setItem("tasks", JSON.stringify(tasksArr));
      todoListElement.innerHTML += createTodoItem(result);
      todoInputElement.value = "";
    })
    .catch((error) => {
      todoErrorMesage.innerHTML = error.message;
    });
});

function isFormValid(value) {
  return !!value;
}

todoListElement.addEventListener("click", (event) => {

  const { target } = event;
  const todoRemoveBtn = target.closest("[data-todo-remove-btn]");

  if (todoRemoveBtn) {

    const currentTaskItem = target.closest("[data-todo-item]");
    const itemUniqueId = currentTaskItem.getAttribute("id");
    const isTaskExist = tasksArr.some((item) => item.id === +itemUniqueId);

    if (isTaskExist) {
      todoApi
        .removeToDo(itemUniqueId)
        .then(() => {
          tasksArr = tasksArr.filter((item) => item.id !== +itemUniqueId);
          localStorage.setItem("tasks", JSON.stringify(tasksArr));
          currentTaskItem.remove();
        })
        .catch(() => {
          todoErrorMesage.innerHTML = 'Удалить не получилось';
        });
    }
  }

 
});
