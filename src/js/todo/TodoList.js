import { todoApi } from "./todoApi";
import { createTodoItem } from "./todoItemTemplate";
import { createCompleteTodoItem } from "./../todo/todoItemCompleteTemplate";
class ToDoList {
  constructor() {
    this.elements = {
      todoFormElement: document.querySelector("[data-todo-form]"),
      tasksCountElement: document.querySelector("[data-task-count]"),
      tasksCompletedElement: document.querySelector("[data-task-completed]"),
      tasksNotCompletedTasksElement: document.querySelector(
        "[data-task-completed-count]"
      ),
      todoInputElement: document.querySelector("[data-todo-input]"),
      todoListElement: document.querySelector("[data-todo-list]"),
      todoErrorMesage: document.querySelector("[data-todo-form-error]"),
      todoListCompletedElement: document.querySelector(
        "[data-todo-completed-list]"
      ),
    };
    this.notCompletedTasks = 0;
    this.tasksArr = [];

    this.getTasksOnLoad();
    this.bindEvents();
  }

  getTasksOnLoad = () => {
    const localStorageArr = JSON.parse(localStorage.getItem("tasks"));
    this.tasksArr = localStorageArr?.length
      ? JSON.parse(localStorage.getItem("tasks"))
      : [];
    const {
      todoListElement,
      tasksCountElement,
      tasksNotCompletedTasksElement,
      todoListCompletedElement,
      tasksCompletedElement,
    } = this.elements;

    const { tasksArr } = this;
    for (const task of tasksArr) {
      if (task.isCompleted === false) {
        this.notCompletedTasks++;
        todoListElement.innerHTML += createTodoItem(task);
      }
      if (task.isCompleted === true) {
        todoListCompletedElement.innerHTML += createCompleteTodoItem(task);
      }
    }
    tasksCountElement.textContent = this.notCompletedTasks;
    tasksNotCompletedTasksElement.textContent =
      tasksArr.length - this.notCompletedTasks;

    this.isCompletedTaskEmpty();
  };
  isCompletedTaskEmpty = () => {
    const { tasksNotCompletedTasksElement, tasksCompletedElement } =
      this.elements;
    if (+tasksNotCompletedTasksElement.textContent === 0) {
      tasksCompletedElement.classList.add("hidden");
    } else {
      tasksCompletedElement.classList.remove("hidden");
    }
  };
  isFormValid = (value) => {
    return !!value;
  };

  clearError = () => {
    this.elements.todoFormElement.classList.remove("form-invalid");
    this.elements.todoErrorMesage.textContent = "";
  };

  bindEvents() {
    this.elements.todoInputElement.addEventListener("input", this.clearError);
    this.elements.todoFormElement.addEventListener("submit", (event) =>
      this.addToDoItem(event)
    );
    this.elements.todoListElement.addEventListener("click", (event) =>
      this.handleItemClick(event)
    );
  }

  async addToDoItem(event) {
    event.preventDefault();

    const {
      todoListElement,
      todoInputElement,
      tasksCountElement,
      tasksNotCompletedTasksElement,
      todoErrorMesage,
      todoFormElement,
    } = this.elements;

    const { tasksArr } = this;

    if (!this.isFormValid(todoInputElement.value)) {
      todoErrorMesage.textContent = "Заполните поле";
      todoFormElement.classList.add("form-invalid");
      return;
    }

    const taskPayload = {
      name: todoInputElement.value,
      isCompleted: false,
    };
    try {
      todoApi.addToDo(taskPayload).then((result) => {
        tasksArr.push(result);
        localStorage.setItem("tasks", JSON.stringify(tasksArr));
        todoListElement.innerHTML += createTodoItem(result);
        todoInputElement.value = "";
        tasksCountElement.textContent = ++this.notCompletedTasks;
        tasksNotCompletedTasksElement.textContent =
          tasksArr.length - this.notCompletedTasks;
      });
    } catch (error) {
      todoErrorMesage.innerHTML = error.message;
    }
  }

  async handleItemClick(event) {
    const { target } = event;

    const todoRemoveBtn = target.closest("[data-todo-remove-btn]");
    const todoCompleteBtn = target.closest("[data-todo-complete-btn]");
    const currentTaskItem = target.closest("[data-todo-item]");
    const itemUniqueId = currentTaskItem.getAttribute("id");
    const isTaskExist = this.tasksArr.some((item) => item.id === +itemUniqueId);

    if (isTaskExist && todoRemoveBtn) {
      this.removeToDoItem(itemUniqueId, currentTaskItem);
    }

    if (isTaskExist && todoCompleteBtn) {
      this.tasksArr = this.tasksArr.map((item) => {
        return item.id === +itemUniqueId
          ? { ...item, isCompleted: true }
          : item;
      });
      const editedItem = this.tasksArr.find(
        (item) => item.id === +itemUniqueId
      );
      const newTask = {
        name: editedItem.name,
        isCompleted: editedItem.isCompleted,
      };
      this.updateToDoItem(itemUniqueId, newTask, currentTaskItem);
    }
  }

  async removeToDoItem(id, currentTask) {
    const {
      tasksCountElement,
      tasksNotCompletedTasksElement,
      todoErrorMesage,
    } = this.elements;
    try {
      const result = await todoApi.removeToDo(id);
      currentTask.remove();
      this.tasksArr = this.tasksArr.filter((item) => item.id !== +id);
      localStorage.setItem("tasks", JSON.stringify(this.tasksArr));
      tasksCountElement.textContent = --this.notCompletedTasks;
      tasksNotCompletedTasksElement.textContent =
        this.tasksArr.length - this.notCompletedTasks;
    } catch {
      todoErrorMesage.innerHTML = "Удалить не получилось";
    }
  }
  async updateToDoItem(id, newTask, currentTask) {
    const {
      tasksCountElement,
      tasksNotCompletedTasksElement,
      todoErrorMesage,
      todoListCompletedElement,
    } = this.elements;
    try {
      const result = await todoApi.updateTaskStatusToDo(id, newTask);
      currentTask.remove();
      localStorage.setItem("tasks", JSON.stringify(this.tasksArr));
      console.log("Внутри промиса");
      todoListCompletedElement.innerHTML += createCompleteTodoItem(result);
      tasksCountElement.textContent = --this.notCompletedTasks;
      tasksNotCompletedTasksElement.textContent =
        this.tasksArr.length - this.notCompletedTasks;
      this.isCompletedTaskEmpty();
    } catch {
      todoErrorMesage.innerHTML = "Обновить не получилось";
    }
  }
}

export const toDoList = new ToDoList();
