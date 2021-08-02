var gTodos = [];
var gFilterBy = 'all';
var gSortBy = 'txt';

_createTodos();


function getTodosForDisplay() {
    if (gFilterBy === 'all') return gTodos.sort(sortBy);

    var todos = gTodos.filter(function (todo) {
        return (gFilterBy === 'active' && !todo.isDone) ||
            (gFilterBy === 'done' && todo.isDone)

    })
    return todos.sort(sortBy);
}

function removeTodo(todoId) {
    var idx = gTodos.findIndex(function (todo) {
        return todo.id === todoId
    })
    if (confirm('Are you sure youn want to delete entry?')) {
        gTodos.splice(idx, 1);
        _saveTodosToStorage();
    }
}

function addTodo(txt, imp = 1) {
    var todo = {
        id: _makeId(),
        txt: txt,
        importance: imp,
        createdAt: Date.now(),
        isDone: false
    }
    gTodos.unshift(todo);
    _saveTodosToStorage()
}

function toggleTodo(todoId) {
    var todo = gTodos.find(function (todo) {
        return todo.id === todoId
    })
    todo.isDone = !todo.isDone;
    _saveTodosToStorage();
}

function setFilterBy(filterBy) {
    gFilterBy = filterBy
}

function setSortBy(sortBy) {
    gSortBy = sortBy;
}

function sortBy(t1, t2) {
    switch (gSortBy) {
        case 'text':
            return t1.txt.localeCompare(t2.txt);
        case 'created':
            return t2.createdAt - t1.createdAt;
        case 'importance':
            return t2.importance - t1.importance
        default:
            return 0;
    }
}

function getTotalCount() {
    if (gTodos.length) return gTodos.length;
    else return 'No Todos'
}

function getActiveCount() {
    var activeTodos = gTodos.filter(function (todo) {
        return !todo.isDone
    })
    if (activeTodos.length) return (activeTodos.length)
    else return 'No Active Todos';
    ;
}

function getDoneCount() {
    var activeTodos = gTodos.filter(function (todo) {
        return todo.isDone
    })
    if (activeTodos.length) return (activeTodos.length)
    else return 'No Done Todos';;
}

function _saveTodosToStorage() {
    saveToStorage('todoDB', gTodos)
}

function _createTodos() {
    var todos = loadFromStorage('todoDB')
    if (todos && todos.length) {
        gTodos = todos
    } else {
        addTodo('Learn HTML');
        addTodo('Master CSS');
        addTodo('Practice JS');
    }
}

function _makeId(length = 5) {
    var txt = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return txt;
}