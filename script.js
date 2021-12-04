const personTable = document.getElementById('person-table');


let personArray = [];

function clearInputs() {
  document.getElementById('name').value = '';
  document.getElementById('age').value = '';
}

function deletePerson(e) {
  const name = e.target.parentElement.firstChild.innerText;
  personArray = personArray.filter((person) => person.name !== name);
  
  const table = e.target.parentElement.parentElement
  const row = e.target.parentElement;
  table.removeChild(row);
}

function orderTable() {
  personArray.sort((a , b) => {
    return (a.age > b.age) ? -1 : ((b.age > a.age) ? 1 : 0);
  });
  Array.from(personTable.children).forEach((child, index) => {
    if(index != 0) {
    child.firstChild.innerText = personArray[index - 1].name;
    child.firstChild.nextSibling.innerText = personArray[index - 1].age;
    }
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