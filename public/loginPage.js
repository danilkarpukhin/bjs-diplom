'use strict';

const userForm = new UserForm();

//Вход
userForm.loginFormCallback = (data) => {
  ApiConnector.login(data, response => {
   if (response.success) {
    location.reload(true);
   } else {
    userForm.setLoginErrorMessage('Неверный логин или пароль');
   }
  });
};

//Регистрация
userForm.registerFormCallback = (data) => {
  ApiConnector.register(data, (response) => {
    if (Object.keys(response).length === 0) {
      location.reload(true);
    } else {
      console.log(response);
      userForm.setRegisterErrorMessage('Такой пользователь существует!');
    }
  });
};