const todoInputText = document.getElementById('todoInputText');
const todoInputTextBtn = document.getElementById('todoInputTextBtn');
const todoList = document.querySelector('ul');
const clearAllButton = document.getElementById('clearAllTasks');
const taskList = document.querySelector('ul');

let todos = [];

function renderTodos() {
  todoList.innerHTML = '';
  todos.forEach((todo, index) => {
    const li = document.createElement('li');
    li.textContent = todo;
    const deleteBtn = document.createElement('button');
    deleteBtn.innerHTML = '<i class="fa fa-solid fa-trash"> </i>';
    deleteBtn.addEventListener('click', () => {
      todos.splice(index, 1);
      localStorage.setItem('todos', JSON.stringify(todos));
      renderTodos();
      updateTaskCount();
    });
    li.appendChild(deleteBtn);
    todoList.appendChild(li);
  });
}

window.addEventListener('load', () => {
  todos = JSON.parse(localStorage.getItem('todos')) || [];
  renderTodos();
  updateTaskCount();
});

function updateTaskCount() {
  const listCount = document.getElementsByTagName('li');
  const totalListitem = listCount.length;
  document.getElementById('totalCount').innerHTML = `<span>You have ${totalListitem} pending tasks</span>`;
}

function clearAllTasks() {
  if (confirm('Bütün taskları silmək istədiyinə əminsən?')) {
    todos = [];
    localStorage.clear();
    renderTodos();
    updateTaskCount();
  }
}

clearAllButton.addEventListener('click', clearAllTasks);

todoInputTextBtn.addEventListener('click', e => {
  e.preventDefault();
  const todo = todoInputText.value.trim();
  if (todo === '') {
    alert('boş task ola bilməz!');
  } else {
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
    renderTodos();
    todoInputText.value = '';
    updateTaskCount();
  }
});
