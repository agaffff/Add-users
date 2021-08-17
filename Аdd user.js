

class User {
  constructor(name, surname, email, phone, birthday) {
    this.name = name;
    this.surname = surname;
    this.email = email;
    this.phone = phone;
    this.birthday = birthday;
  }
}

class UI {
  static displayUsers() {
    const users = BrowserStorage.getUser();
    users.forEach((user) => UI.addUserToList(user));
  }

  static addUserToList(user) {
    const list = document.querySelector('#user-list');
    const row = document.createElement('tr');

    row.innerHTML = `
    <td>${user.name}</td>
    <td>${user.surname}</td>
    <td>${user.email}</td>
    <td>${user.phone}</td>
    <td>${user.birthday}</td>
    <td><a href="#" class="btn btn-danger btn-sm delete"> x </a></td>
    
    `;
    list.appendChild(row);
  }
 
  static deleteUser(element) {
    if (element.classList.contains('delete')) {
      element.parentElement.parentElement.remove();
    }
  }

  static showNotification(message, className) {
    const div = document.createElement('div');
    div.className = `alert alert-${className}`;
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector('.container');
    const form = document.querySelector('#user-form');
    container.insertBefore(div, form);
    setTimeout(() => document.querySelector('.alert').remove(), 2000);
  }

  static clearFields() {
    document.querySelector('#inputName').value = '';
    document.querySelector('#inputSurname').value = '';
    document.querySelector('#inputEmail').value = '';
    document.querySelector('#inputPhone').value = '';
    document.querySelector('#inputBirthday').value = '';
  }
}

//класс localStorage
class BrowserStorage {
  static getUser() {
    let users;
    if (localStorage.getItem('users') === null) {
      users = [];
    } else {
      users = JSON.parse(localStorage.getItem('users'));
    }
    return users;
  }

  static addUser(user) {
    const users = BrowserStorage.getUser();
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));
  }
  
  static removeUser(name) {
    const users = BrowserStorage.getUser();
    users.forEach((user, index) => {
      if (user.name === name) {
        users.splice(index, 1);
      }
    });
    localStorage.setItem('users', JSON.stringify(users));
  }
}





//Событие для отображения пользователей
document.addEventListener('DOMContentLoaded', UI.displayUsers);

//Событие добавления пользователей
document.querySelector('#user-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.querySelector('#inputName').value;
  const surname = document.querySelector('#inputSurname').value;
  const email = document.querySelector('#inputEmail').value;
  const phone = document.querySelector('#inputPhone').value;
  const birthday = document.querySelector('#inputBirthday').value;

  if (name === '' || surname === '' || email === '' || phone === '' || birthday === '') {
    UI.showNotification("Все поля должны быть заполнены", "danger");

  } else {
    const user = new User(name, surname, email, phone, birthday);

    //Добавить нового пользователя
    UI.addUserToList(user);
    //Добавить пользователя в localStorage
    BrowserStorage.addUser(user);
    UI.showNotification("Пользователь добавлен", "success");
    //Очистить поле
    UI.clearFields();
  }
});

//Событие для удаления пользователя
document.querySelector('#user-list').addEventListener('click', (e) => {
  UI.deleteUser(e.target);
  BrowserStorage.removeUser(e.target.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.textContent);
})


