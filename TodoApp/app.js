const input = document.getElementById("todoInput");
const addBtn = document.getElementById("addBtn");
const list = document.getElementById("list");

let todos = [];

addBtn.addEventListener("click", addTodo);

function addTodo() {
  const task = input.value.trim();
  if (task === "") return;

  todos.push(task);
  input.value = "";

  renderTodos();
}

function renderTodos() {
  list.innerHTML = "";

  todos.forEach((todo, index) => {
    const li = document.createElement("li");

    li.innerHTML = `
      <span>${todo}</span>
      <button onclick="deleteTodo(${index})">Delete</button>
    `;

    list.appendChild(li);
  });
}

function deleteTodo(index) {
  todos.splice(index, 1); // remove from array
  renderTodos();
}




