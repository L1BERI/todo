import "../scss/style.scss";
import { todoApi } from "./todo/todoApi";
import { createTodoItem } from "./todo/todoItemTemplate";
import { createCompleteTodoItem } from "./todo/todoItemCompleteTemplate";

const todoFormElement = document.querySelector("[data-todo-form]");

const tasksCountElement = document.querySelector("[data-task-count]");

const tasksCompletedElement = document.querySelector("[data-task-completed]");

const tasksnotCompletedTasksElement = document.querySelector(
  "[data-task-completed-count]"
);

const todoInputElement = todoFormElement.querySelector("[data-todo-input]");

const todoListElement = document.querySelector("[data-todo-list]");

const todoErrorMesage = document.querySelector("[data-todo-form-error]");

const todoListCompletedElement = document.querySelector(
  "[data-todo-completed-list]"
);

const localStorageArr = JSON.parse(localStorage.getItem("tasks"));

// localStorage.removeItem('tasks')
let tasksArr = localStorageArr?.length
  ? JSON.parse(localStorage.getItem("tasks"))
  : [];

let notCompletedTasks = 0;
for (const task of tasksArr) {
  if (task.isCompleted === false) {
    notCompletedTasks++;
    todoListElement.innerHTML += createTodoItem(task);
  }
  if (task.isCompleted === true) {
    todoListCompletedElement.innerHTML += createCompleteTodoItem(task);
  }
}

tasksCountElement.textContent = notCompletedTasks;
tasksnotCompletedTasksElement.textContent = tasksArr.length - notCompletedTasks;



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
      tasksCountElement.textContent = ++notCompletedTasks;
      tasksnotCompletedTasksElement.textContent =
        tasksArr.length - notCompletedTasks;
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
  const todoCompleteBtn = target.closest("[data-todo-complete-btn]");
  const completedTasks = [];

  if (todoRemoveBtn || todoCompleteBtn) {
    const currentTaskItem = target.closest("[data-todo-item]");
    const itemUniqueId = currentTaskItem.getAttribute("id");
    const isTaskExist = tasksArr.some((item) => item.id === +itemUniqueId);

    if (isTaskExist && todoRemoveBtn) {
      todoApi
        .removeToDo(itemUniqueId)
        .then(() => {
          tasksArr = tasksArr.filter((item) => item.id !== +itemUniqueId);
          localStorage.setItem("tasks", JSON.stringify(tasksArr));
          currentTaskItem.remove();
          tasksCountElement.textContent = --notCompletedTasks;
          tasksnotCompletedTasksElement.textContent =
            tasksArr.length - notCompletedTasks;
        })
        .catch(() => {
          todoErrorMesage.innerHTML = "Удалить не получилось";
        });
    }

    if (isTaskExist && todoCompleteBtn) {
      tasksArr = tasksArr.map((item) => {
        return item.id === +itemUniqueId
          ? { ...item, isCompleted: true }
          : item;
      });

      const editedItem = tasksArr.find((item) => item.id === +itemUniqueId);

      const newTask = {
        name: editedItem.name,
        isCompleted: editedItem.isCompleted,
      };

      todoApi.putToDo(itemUniqueId, newTask).then((result) => {
        localStorage.setItem("tasks", JSON.stringify(tasksArr));
        currentTaskItem.remove();
        todoListCompletedElement.innerHTML += createCompleteTodoItem(result);
        tasksCountElement.textContent = --notCompletedTasks;
        tasksnotCompletedTasksElement.textContent =
          tasksArr.length - notCompletedTasks;
      });
    }
  }
});
if(+tasksnotCompletedTasksElement.textContent === 0){
  tasksCompletedElement.classList.add('hidden')
} else {
  tasksCompletedElement.classList.remove('hidden')

}