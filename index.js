const input = document.getElementById("input");
const submitBtn = document.getElementById("add");
const list = document.getElementById("list");

list.style.listStyle = "none";
list.style.padding = "0";
// fetch from localstorage
const todos = JSON.parse(localStorage.getItem("todos")) || [];

const createTodo = (value) => {
  const listItem = document.createElement("li");
  listItem.className = "list-item";
  // 1
  const content = document.createElement("input");
  content.className = "list-content";
  content.value = value;
  content.disabled = true;
  listItem.appendChild(content);
  // 2
  const deleteBtn = document.createElement("button");
  deleteBtn.className = "delete";
  deleteBtn.innerText = "Delete";
  deleteBtn.addEventListener("click", (e) => {
    e.target.parentElement.remove();
    todos.splice(todos.indexOf(e.target.parentElement.firstChild.value), 1);
    localStorage.setItem("todos", JSON.stringify(todos));
  });
  listItem.appendChild(deleteBtn);
  // 3
  const editBtn = document.createElement("button");
  editBtn.className = "edit";
  editBtn.innerText = "Edit";
  listItem.appendChild(editBtn);
  const oldContent = content.value;
  editBtn.addEventListener("click", (e) => {
    content.disabled = !content.disabled;
    content.focus();
    if (editBtn.innerText === "Edit") {
      editBtn.innerText = "Save";
    } else {
      editBtn.innerText = "Edit";
      todos.splice(todos.indexOf(oldContent), 1, content.value);
      localStorage.setItem("todos", JSON.stringify(todos));
    }
  });
  // 4
  list.appendChild(listItem);
  input.value = "";
  // 5
  const check = document.createElement("input");
  check.type = "checkbox";
  listItem.insertBefore(check, listItem.firstChild);
  check.addEventListener("change", (e) => {
    content.style.textDecoration === "line-through"
      ? (content.style.textDecoration = "none")
      : (content.style.textDecoration = "line-through");
  });
};

if (todos.length > 0) {
  for (todo of todos) {
    createTodo(todo);
  }
}

submitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  todos.push(input.value);
  localStorage.setItem("todos", JSON.stringify(todos));
  createTodo(input.value);
});
