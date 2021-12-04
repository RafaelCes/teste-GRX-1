const personTable = document.getElementById('person-table');


const personArray = [];

function clearInputs() {
  document.getElementById('name').value = '';
  document.getElementById('age').value = '';
}

function createRow(name, age) {
  const row = document.createElement('tr');

  const nameColumn = document.createElement('td');
  nameColumn.innerText = name;
  row.appendChild(nameColumn);

  const ageColumn = document.createElement('td');
  ageColumn.innerText = age;
  row.appendChild(ageColumn);


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
  personArray.push({name, age});
  addToTable(name, age);
  clearInputs();
  
  document.getElementById('texto-tarefa').value = '';
}

function addEventSavePerson() {
  const form = document.getElementById('person-form');
  form.addEventListener('submit', SavePerson);
}


window.onload = function load() {
  addEventSavePerson();
 
};