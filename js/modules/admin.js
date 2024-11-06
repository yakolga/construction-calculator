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
            errorMessage.textContent = 'The login field cannot contain more than 20 characters';
            
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
                if (loginInput.value == data[0].login && passwordInput.value == data[0].password) {
                    window.location = './admin.html';

                    console.log('workss');

                    localStorage.setItem('logedIn', true);
                } else {
                    loginInput.classList.add(errorClass);
                    passwordInput.classList.add(errorClass);

                    let errorMessage = document.createElement('span');
                    errorMessage.classList.add(messageClass.replace(/\./g, ''));
                    errorMessage.textContent = 'Incorrect login or password';

                    if (!document.querySelector(messageClass)) {
                        passwordInput.closest('label').after(errorMessage);
                    }
                }
            });
    });
};

export default logIn;