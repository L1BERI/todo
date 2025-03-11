

export const addTask = () =>{
    const todoFormElement = document.querySelector('[data-todo-form]')
    const todoInputElement = todoFormElement.querySelector('[data-todo-input]')
    const url = 'https://87deb06c9d3bfa1a.mokky.dev/tasks'
    todoFormElement.addEventListener('submit', (event)=>{
        event.preventDefault()
        
        fetch(url, {
            method: 'POST',
            body: {
                "task": todoInputElement.value,
            }
        })
            .then((resolve)=>{
                console.log(resolve);
                return resolve.json()
            })
            .then((json)=>{
                console.log(json);
            })

    })
}