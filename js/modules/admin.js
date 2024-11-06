import {getData} from '../services/services';

function logIn(formSelector, loginInputSelector, passwordInputSelector, messageClass, errorClass) {
    
    if (!document.querySelector(formSelector)) return false

    const form = document.querySelector(formSelector),
            loginInput = document.querySelector(loginInputSelector),
            passwordInput = document.querySelector(passwordInputSelector);

    form.addEventListener('input', () => {
        if (loginInput.value.length > 20) {
            let errorMessage = document.createElement('span');
            errorMessage.classList.add(messageClass.replace(/\./g, ''));
            errorMessage.textContent = 'Поле логина не может содержать более 20 символов';
            
            if (!document.querySelector(messageClass)) {
                loginInput.closest('label').after(errorMessage);
            } 
        } else {
            if (document.querySelector(messageClass)) {
                document.querySelector(messageClass).remove();
            }
        }
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        getData('https://construction-calculator.onrender.com/admin')
            .then(data => {
                if (loginInput.value == data.login && passwordInput.value == data.password) {
                    window.location = './admin.html';

                    localStorage.setItem('logedIn', true);
                } else {
                    loginInput.classList.add(errorClass);
                    passwordInput.classList.add(errorClass);

                    let errorMessage = document.createElement('span');
                    errorMessage.classList.add(messageClass.replace(/\./g, ''));
                    errorMessage.textContent = 'Неверный логин или пароль';

                    if (!document.querySelector(messageClass)) {
                        passwordInput.closest('label').after(errorMessage);
                    }
                }
            });
    });
};

export default logIn;