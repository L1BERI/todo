export const createCompleteTodoItem = (task) => {
    return `
     <li class="todo__item" data-todo-completed-item id="${task.id}">
      <span class="todo__item-text-completed" data-task-completed-text>${task.name}</span>
    </li>
`
}