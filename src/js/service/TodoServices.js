import { todoApi } from "./../todo/todoApi";
class ToDoServices {
  elements = {
    todoFormElement: document.querySelector("[data-todo-form]"),
    tasksCountElement: document.querySelector("[data-task-count]"),
    tasksCompletedElement: document.querySelector("[data-task-completed]"),
    tasksnotCompletedTasksElement: document.querySelector(
      "[data-task-completed-count]"
    ),
    todoInputElement: document.querySelector("[data-todo-input]"),
    todoListElement: document.querySelector("[data-todo-list]"),
    todoErrorMesage: document.querySelector("[data-todo-form-error]"),
    todoListCompletedElement: document.querySelector(
      "[data-todo-completed-list]"
    ),
    todoListCompletedElement: document.querySelector(
      "[data-todo-completed-list]"
    ),
    todoErrorMesage: document.querySelector("[data-todo-form-error]"),
    todoListElement: document.querySelector("[data-todo-list]"),
    todoListElement: document.querySelector("[data-todo-list]"),
    todoInputElement: document.querySelector("[data-todo-input]"),
    tasksnotCompletedTasksElement: document.querySelector(
      "[data-task-completed-count]"
    ),
    tasksCompletedElement: document.querySelector("[data-task-completed]"),
    tasksCountElement: document.querySelector("[data-task-count]"),
    todoFormElement: document.querySelector("[data-todo-form]"),
  };

  async sendToApi(data){
   const result = await todoApi.addToDo(data);
  }

}

export const toDoServices = new ToDoServices()