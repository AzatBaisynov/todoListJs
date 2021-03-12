// CRUD - CREATE READ UPDATE DELETE

let todoName = document.querySelector('.task-name')
let addBtn = document.querySelector('.add-todo')
let todoBlock = document.querySelector('.todos')
let deleteBtn = document.querySelector('.btn-warning')

deleteBtn.addEventListener('click', () => {
    clear()
    view()
})

addBtn.addEventListener('click', () => {
    addTodo()
})
todoName.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addTodo()
})


function getTodos() {
    return JSON.parse(localStorage.getItem('todos')) || []
}

function addTodo() {
    let newTodo = todoName.value
    if (newTodo.length > 0) {
        let todos = getTodos()
        todos = [...todos, newTodo]
        localStorage.setItem('todos', JSON.stringify(todos))
        view()
        todoName.value = ''
    }
}

function view() {

    let tasks = getTodos()
    let list = ''
    tasks.forEach(item => {
        if (!item.includes('<li style=')) {
            list = list + `<li style="align-items: center" class="list-group-item d-flex justify-content-between"><div class="li-text" style="width: 80%; text-align: left">${item}</div> <div><button class="btn btn-primary">Edit</button> <button class="btn btn-danger">Del</button></div></li>`
        } else {
            list = list + item
        }
    })
    todoBlock.innerHTML = '<ul class="list-group" style="margin-top: 40px">' + list + '</ul>'
    document.querySelectorAll('.btn-danger').forEach((button, idx) => {
        button.addEventListener('click', () => {
            tasks.splice(idx, 1)
            localStorage.setItem('todos', JSON.stringify(tasks))
            view()
        })
    })
    document.querySelectorAll('.btn-primary').forEach((button, idx) => {
        button.addEventListener('click', () => {
            if(!button.classList.contains('activated_btn')) {
                tasks[idx] = `<li style="align-items: center" class="list-group-item d-flex justify-content-between"><input type="text" value="${tasks[idx]}" class="li-text-${idx}" style="width: 85%; text-align: left"/><button class="btn btn-primary activated_btn">Edit</button> <button class="btn btn-danger">Del</button></li>`
                localStorage.setItem('todos', JSON.stringify(tasks))
                view()
            } else {
                let inpVal = document.querySelector(`.li-text-${idx}`)
                tasks[idx] = `<li style="align-items: center" class="list-group-item d-flex justify-content-between"><div class="li-text" style="width: 80%; text-align: left">${inpVal.value}</div> <div><button class="btn btn-primary">Edit</button> <button class="btn btn-danger">Del</button></div></li>`
                localStorage.setItem('todos', JSON.stringify(tasks))
                view()
            }
        })
    })
    document.querySelectorAll('.li-text').forEach(el => {
        el.addEventListener('click', () => {
            el.style.textDecoration = 'line-through'
        })
    })
    tasks = tasks.map( el => {
        return el.includes('<li style') ? el.replace('<li style="align-items: center" class="list-group-item d-flex justify-content-between"><div class="li-text" style="width: 80%; text-align: left">', '')
            .replace('</div> <div><button class="btn btn-primary">Edit</button> <button class="btn btn-danger">Del</button></div></li>', '') : el
    })

}

function clear() {
    localStorage.removeItem('todos')
    view()
}

view()
