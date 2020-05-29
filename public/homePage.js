'use strict'

//Кнопка выхода
const logout = new LogoutButton();

logout.action = () => {
    ApiConnector.logout(response => {
        if (response.success) {
            location.reload(true);
        };
    })
};

//Данные пользователя
ApiConnector.current(response => {
    if (response.success) {
        ProfileWidget.showProfile(response.data);
    };
});

//Курс валют
const exchangeRates = new RatesBoard();

function exchangeRatesTable() {
    ApiConnector.getStocks(response => {
        if (response.success) { 
            exchangeRates.clearTable();

            exchangeRates.fillTable(response.data);
        }

    });
};

setInterval(exchangeRatesTable(), 60000);

//Работа с деньгами
const money = new MoneyManager();

//Пополнение баланса
money.addMoneyCallback = (data) => {
    ApiConnector.addMoney(data, response => {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            money.setMessage(false, 'Пополнение выполнено');
        } else {
            money.setMessage(true, 'Невозможно перевести!');
        };
    });
};

//Конвертирование валюты
money.conversionMoneyCallback = (data) => {
    ApiConnector.convertMoney(data, response => {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            money.setMessage(false, 'Конвертирование выполнено');
        } else {
            money.setMessage(true, `Невозможно конвертировать`);
        };
    });
};

//Перевод другому пользователю
money.sendMoneyCallback = (data) => {
    ApiConnector.transferMoney(data, response => {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            money.setMessage(false, 'Перевод прошел');
        } else {
            money.setMessage(true, 'Перевод не прошел');
        };
    });
};

//Работа с избранным
const person = new FavoritesWidget();

//Начальный список
ApiConnector.getFavorites(response => {
    if (response.success) {
        person.clearTable();
        person.fillTable(response.data);
        money.updateUsersList(response.data);
    };
});

//Добавление нового контакта в адресную книги
person.addUserCallback = (data) => {
    ApiConnector.addUserToFavorites(data, response => {
        if (response.success) {
            person.clearTable();
            person.fillTable(response.data);
            money.updateUsersList(response.data);
            person.setMessage(false, 'Пользователь успешно добавлен в адресную книгу');
        } else {
            person.setMessage(true, 'Пользователь не может быть добавлен');
        };
    });
};

//Удаление контакта из адресной книги
person.removeUserCallback = (data) => {
    ApiConnector.removeUserFromFavorites(data, response => {
        if (response.success) {
            person.clearTable();
            person.fillTable(response.data);
            money.updateUsersList(response.data);
            person.setMessage(false, 'Пользователь успешно удален'); 
        } else {
            person.setMessage(true, 'Невозможно удалить пользователя');
        };
    });
};