const todoForm = document.querySelector('.js-todoForm'),
    todoInput = todoForm.querySelector('input'),
    todoList = document.querySelector('.js-todoList');

const TODOS_LS = 'todos';

let todos = [];

function delteTodo(event) {
    const li = event.target.parentElement;

    todos = todos.filter(todo=>todo.id !== Number(li.id));
    saveTodo();

    li.remove();
}

function saveTodo() {
    localStorage.setItem(TODOS_LS, JSON.stringify(todos));
}

function paintTodo(text) {
    const li = document.createElement('li');
    const span = document.createElement('span')
    const delBtn = document.createElement('button');
    const maxId = todos.reduce((acc,cur)=> cur.id>acc ? cur.id : acc,0)
    const newId = maxId+1;
    
    li.id = newId;
    span.textContent = text;
    delBtn.textContent = "❌"
    delBtn.addEventListener("click", delteTodo)
    
    li.append(delBtn,span);
    todoList.append(li);

    const todoObj = {
        id : newId,
        text : text,
    };

    todos.push(todoObj);
    saveTodo();
}

function handleSubmitTodo(event) {
    event.preventDefault();

    const currentValue = todoInput.value;

    if(!currentValue) return;

    paintTodo(currentValue);

    todoInput.value = '';
}

function loadTodos() {
    const loadedTodos = localStorage.getItem(TODOS_LS);

    if(loadedTodos === null) return;

    const parsedTodos = JSON.parse(loadedTodos);
    parsedTodos.forEach(todo => paintTodo(todo.text));
}

function init() {
    loadTodos();
    todoForm.addEventListener('submit', handleSubmitTodo)
}
init();