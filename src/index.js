import "./styles.scss";

/* Selectors
----------------------
*/
const todoInput = document.querySelector('.todo-input')
const todoButton = document.querySelector('.todo-button')
const todoList = document.querySelector('.todo-list')
const filterOption = document.querySelector('.filter-todo')




/* Event listeners
----------------------
*/
document.addEventListener('DOMContentLoaded',getTodoArr);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo);




/* Functions
----------------------
*/
function addTodo(e){
    e.preventDefault();
    //Create Todo Div
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');
    
    //Create LI
    const newTodo = document.createElement('li')
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('.todo-item');
    todoDiv.appendChild(newTodo);

    //Add todo to localStorage
    saveLocalTodos(todoInput.value);

    //Check Mark Button
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>'
    completedButton.classList.add('complete-btn')
    todoDiv.appendChild(completedButton);
    //Check Trash Button
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>'
    trashButton.classList.add('trash-btn')
    todoDiv.appendChild(trashButton);

    //Append to list
    todoList.appendChild(todoDiv)

    //clear
    todoInput.value='';

}



function deleteCheck(e){
    const link = e.target;
    if(e.target.classList.contains('trash-btn')){
        // const todoDiv = link.closest('.todo-list').querySelector('.todo');
        const todoDiv = link.parentElement;
        todoDiv.classList.add('fall')
        const todoValue = todoDiv.children[0].innerText;
        removeLocalTodos(todoValue);
        //note Solution1
        // setTimeout(function(){todoDiv.remove()},400)
        //note Solution2
        todoDiv.addEventListener('transitionend', function(){
            todoDiv.remove();
        })

        

    }
    
    //Check Mark
    if(e.target.classList.contains('complete-btn')){
        const todoDiv = link.parentElement;
        todoDiv.classList.toggle('completed')
    }

};

function filterTodo(e){
    const todos = [...todoList.childNodes].slice(1);
    todos.forEach(function(todo){
        // console.log(e.target.value);
        // console.log(todo);
        switch(e.target.value){
            case "all":
                todo.style.display = 'flex';
                break;
            case "completed":
                if(todo.classList.contains('completed')){
                    todo.style.display = 'flex';
                }
                else{
                    todo.style.display = 'none';
                };
                break;
            case "uncompleted":
                if(!todo.classList.contains('completed'))
                    {todo.style.display = 'flex';}
                else{
                    todo.style.display = 'none';
                };
                break;
        }
    })

}

// Local storage
function saveLocalTodos(todo){
    //Check any todo in local storage?
    let todoArr;
    if(localStorage.getItem('todoArr') === null){
        todoArr = [];
    }else{
        todoArr = JSON.parse(localStorage.getItem('todoArr'));
    };

    todoArr.push(todo);
    localStorage.setItem('todoArr', JSON.stringify(todoArr))
};

function getTodoArr(){
    //Check any todo in local storage?
    let todoArr;
    if(localStorage.getItem('todoArr') === null){
        todoArr = [];
    }else{
        todoArr = JSON.parse(localStorage.getItem('todoArr'));
    };

    todoArr.forEach(function(todo){
        //Create Todo Div
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');
    
    //Create LI
    const newTodo = document.createElement('li')
    newTodo.innerText = todo;
    newTodo.classList.add('.todo-item');
    todoDiv.appendChild(newTodo);

    //Check Mark Button
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>'
    completedButton.classList.add('complete-btn')
    todoDiv.appendChild(completedButton);
    //Check Trash Button
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>'
    trashButton.classList.add('trash-btn')
    todoDiv.appendChild(trashButton);

    //Append to list
    todoList.appendChild(todoDiv)
    })
};

function removeLocalTodos(todo){
    //Check any todo in local storage?
    let todoArr;
    if(localStorage.getItem('todoArr') === null){
        todoArr = [];
    }else{
        todoArr = JSON.parse(localStorage.getItem('todoArr'));
    };
    const todoIndex = todoArr.indexOf(todo);
    console.log(todoArr,todo,todoIndex);
    todoArr.splice(todoIndex, 1);
    localStorage.setItem('todoArr', JSON.stringify(todoArr))
}
