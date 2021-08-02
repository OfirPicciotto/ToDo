
function onInit() {
    console.log('Hi');
    renderTodos();
}

function renderTodos() {
    var todos = getTodosForDisplay();
    var strHTMLs = todos.map(function (todo) {
        return `<li class="${(todo.isDone) ? 'done' : ''}" onclick="onToggleTodo('${todo.id}')">
            ${todo.txt}
            <button onclick="onRemoveTodo('${todo.id}', event)">x</button>
        </li>`
    })


    var elTodoList = document.querySelector('.todo-list');
    elTodoList.innerHTML = strHTMLs.join('');

    document.querySelector('.total-count').innerText = getTotalCount();
    document.querySelector('.active-count').innerText = getActiveCount();
    document.querySelector('.done-count').innerText = getDoneCount();
    
    
}


function onToggleTodo(todoId) {
    console.log('Toggling: ', todoId);
    toggleTodo(todoId)
    renderTodos()
}

function onRemoveTodo(todoId, ev) {
    console.log('Removing: ', todoId);
    ev.stopPropagation();
    removeTodo(todoId);
    renderTodos();
}

function onAddTodo() {
    var elTxt = document.querySelector('[name=newTodoTxt]');
    var txt = elTxt.value;
    var elTxtImp = document.querySelector('[name=newTodoTxtImp]');
    var txtImp = elTxtImp.value;
    if (!txt) return;
    if (!txtImp || txtImp > 3) return;

    addTodo(txt, txtImp);
    elTxt.value = '';
    elTxtImp.value = '';

    renderTodos();
}

function onSetFilter(filterBy) {
    console.log('Filtering by:', filterBy);
    setFilterBy(filterBy);
    renderTodos();
}

function onSetSort(sortBy){
    console.log('Sorting by:', sortBy);
    setSortBy(sortBy);  
    renderTodos(); 
}