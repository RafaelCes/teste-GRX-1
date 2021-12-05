const personTable = document.getElementById('person-table');

let personArray = [];
let decreasing = true;

function decreasingSort(a, b) {
  if (a.age > b.age) return -1; 
  if (b.age > a.age) return 1;
  return 0;
}

function increasingSort(a, b) {
  if (a.age > b.age) return 1; 
  if (b.age > a.age) return -1;
  return 0;
}

function sortPersonArray() {
  if (decreasing) {
    personArray.sort((a, b) => decreasingSort(a, b));
  } else {
    personArray.sort((a, b) => increasingSort(a, b));
  }
}

function orderTable() {
  sortPersonArray();

  Array.from(personTable.children).forEach((child, index) => {
    child.firstChild.innerText = personArray[index].name;
    child.firstChild.nextSibling.innerText = personArray[index].age;
  });
}

function createEditInputs(e) {
  const row = e.target.parentElement;
  const name = row.firstChild;
  const age = name.nextSibling;

  const nameInput = document.createElement('input');
  nameInput.value = name.innerText;

  const ageInput = document.createElement('input');
  ageInput.value = age.innerText;
  
  name.appendChild(nameInput);
  age.appendChild(ageInput);
}

function createEditButton() {
  const editButton = document.createElement('button');
  editButton.innerHTML = 'editar';
  editButton.classList.add('btn', 'btn-outline-primary', 'btn-sm');
  editButton.addEventListener('click', editPerson);

  return editButton;
}

function updateArray(name, nameInput, ageInput) {
  personArray.forEach((person) => {
    if (person.name === name.innerText) {
      person.name = nameInput.value;
      person.age = ageInput.value;
    }
  });
}

function saveEdit(e) {
  const row = e.target.parentElement;
  const name = row.firstChild;
  const age = name.nextSibling;
  const saveButton = age.nextSibling;
  const cancelButton = saveButton.nextSibling;
  const nameInput = name.firstElementChild;
  const ageInput = age.firstElementChild;

  updateArray(name, nameInput, ageInput);

  name.innerText = nameInput.value;
  age.innerText = ageInput.value;

  const editButton = createEditButton();
  row.insertBefore(editButton, saveButton);

  row.removeChild(saveButton);
  row.removeChild(cancelButton);

  orderTable();
}

function cancelEdit(e) {
  const row = e.target.parentElement;
  const name = row.firstChild.innerText;
  const age = row.firstChild.nextSibling.innerText;
  const newRow = createRow(name, age);
  row.parentElement.replaceChild(newRow, row);
}

function createEditControllers(e) {
  const editButton = e.target;

  const saveButton = document.createElement('button');
  saveButton.innerHTML = 'salvar';
  saveButton.classList.add('btn', 'btn-outline-primary', 'btn-sm');
  saveButton.addEventListener('click', saveEdit);

  const cancelButton = document.createElement('button');
  cancelButton.innerHTML = 'cancelar';
  cancelButton.classList.add('btn', 'btn-outline-danger', 'btn-sm');
  cancelButton.addEventListener('click', cancelEdit);

  editButton.parentElement.insertBefore(saveButton, editButton);
  editButton.parentElement.insertBefore(cancelButton, editButton);
  editButton.parentElement.removeChild(editButton);
}

function editPerson(e) {
  createEditInputs(e);
  createEditControllers(e);
}

function deletePerson(e) {
  if (!window.confirm('Deseja apagar esta linha?')) return;

  const row = e.target.parentElement;
  const table = row.parentElement;
  const name = row.firstChild.innerText;

  personArray = personArray.filter((person) => person.name !== name);
  
  table.removeChild(row);
}

function createRow(name, age) {
  const row = document.createElement('tr');

  const nameColumn = document.createElement('td');
  nameColumn.innerText = name;
  row.appendChild(nameColumn);

  const ageColumn = document.createElement('td');
  ageColumn.innerText = age;
  row.appendChild(ageColumn);

  const editButton = createEditButton();
  row.appendChild(editButton);

  const deleteButton = document.createElement('button');
  deleteButton.innerHTML = 'X';
  deleteButton.classList.add('btn', 'btn-outline-danger', 'btn-sm');
  deleteButton.addEventListener('click', deletePerson);
  row.appendChild(deleteButton);

  return row;
}

function clearInputs() {
  document.getElementById('name').value = '';
  document.getElementById('age').value = '';
}

function checkIfExists(person) {
  return personArray.find(({ name }) => name === person);
}

function addToTable(name, age) {
  const newRow = createRow(name, age);

  personTable.appendChild(newRow);
}

function savePerson(e) {
  e.preventDefault();

  const name = document.getElementById('name').value;
  const age = document.getElementById('age').value;

  if (checkIfExists(name)) return alert('nome ja cadastrado');
  
  personArray.push({ name, age });
  addToTable(name, age);
  clearInputs();
  
  orderTable();
}

function changeOrder() {
  const ageHeader = document.getElementById('age-header');
  if (decreasing) {
    decreasing = false;
    ageHeader.innerText = 'Idade ˄';
  } else {
    decreasing = true;
    ageHeader.innerText = 'Idade ˅';
  }
  orderTable();
}

function addEventSavePerson() {
  const form = document.getElementById('person-form');
  form.addEventListener('submit', savePerson);
}

function addEventChangeOrder() {
  const form = document.getElementById('age-header');
  form.addEventListener('click', changeOrder);
}

window.onload = function load() {
  addEventSavePerson();
  addEventChangeOrder();
};