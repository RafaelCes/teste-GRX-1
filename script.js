const personTable = document.getElementById('person-table');


let personArray = [];

function clearInputs() {
  document.getElementById('name').value = '';
  document.getElementById('age').value = '';
}

function createEditInputs (e) {
  const row = e.target.parentElement;
  const name = row.firstChild;
  const age = name.nextSibling;

  const nameInput = document.createElement('input');
  nameInput.value = name.innerText;

  const ageInput = document.createElement('input')
  ageInput.value = age.innerText;


  
  name.appendChild(nameInput);
  age.appendChild(ageInput);
}

function saveEdit(e) {
  const row = e.target.parentElement;
  const name = row.firstChild;
  const age = name.nextSibling;
  const saveButton = age.nextSibling;
  const cancelButton = saveButton.nextSibling;
  const nameInput = name.firstElementChild;
  const ageInput = age.firstElementChild;

  personArray.forEach((person) => {
    if(person.name === name.innerText){
      person.name = nameInput.value;
      person.age = ageInput.value;
    }
  })

  name.innerText = nameInput.value;
  age.innerText = ageInput.value;

  // name.removeChild(nameInput);
  // age.removeChild(ageInput);

  const editButton = document.createElement('button');
  editButton.innerHTML = 'editar';
  editButton.addEventListener('click', editPerson);
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

function createEditButtons(e) {
  const editButton = e.target;

  const saveButton = document.createElement('button');
  saveButton.innerHTML = 'salvar';
  saveButton.addEventListener('click', saveEdit);

  const cancelButton = document.createElement('button');
  cancelButton.innerHTML = 'cancelar';
  cancelButton.addEventListener('click', cancelEdit);


  editButton.parentElement.insertBefore(saveButton, editButton);
  editButton.parentElement.insertBefore(cancelButton, editButton);
  editButton.parentElement.removeChild(editButton);
}

function editPerson(e) {
  createEditInputs(e);
  createEditButtons(e);

}

function deletePerson(e) {
  if(!window.confirm('Deseja apagar esta linha?')) return;

  const row = e.target.parentElement;
  const table = row.parentElement

  const name = row.firstChild.innerText;
  personArray = personArray.filter((person) => person.name !== name);

  
  table.removeChild(row);
}

function orderTable() {
  personArray.sort((a , b) => {
    return (a.age > b.age) ? -1 : ((b.age > a.age) ? 1 : 0);
  });
  Array.from(personTable.children).forEach((child, index) => {
    child.firstChild.innerText = personArray[index].name;
    child.firstChild.nextSibling.innerText = personArray[index].age;
  });
 
}

function checkIfExists (person) {
  return personArray.find(({ name }) => name === person);
}

function createRow(name, age) {
  const row = document.createElement('tr');

  const nameColumn = document.createElement('td');
  nameColumn.innerText = name;
  row.appendChild(nameColumn);

  const ageColumn = document.createElement('td');
  ageColumn.innerText = age;
  row.appendChild(ageColumn);

  const editButton = document.createElement('button');
  editButton.innerHTML = 'editar';
  editButton.addEventListener('click', editPerson);
  row.appendChild(editButton);

  const deleteButton = document.createElement('button');
  deleteButton.innerHTML = 'X';
  deleteButton.addEventListener('click', deletePerson);
  row.appendChild(deleteButton);


  return row;
}

function addToTable(name, age) {
  const newRow = createRow(name, age);

  personTable.appendChild(newRow);
}

function SavePerson(e) {
  e.preventDefault();

  const name = document.getElementById('name').value;
  const age = document.getElementById('age').value;

  if(checkIfExists(name)) return alert('nome ja cadastrado');
  
  personArray.push({name, age});
  addToTable(name, age);
  clearInputs();
  
  orderTable();
}

function addEventSavePerson() {
  const form = document.getElementById('person-form');
  form.addEventListener('submit', SavePerson);
}


window.onload = function load() {
  addEventSavePerson();
 
};