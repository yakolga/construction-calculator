function logedIn() {
    if (localStorage.getItem('logedIn') && window.location.href.includes('login')) {
        window.location = './admin.html';
    }

    if (!localStorage.getItem('logedIn') && window.location.href.includes('admin')) {
        window.location = './login.html';
    }

    if (localStorage.getItem('logedIn')) {
        document.querySelectorAll('.calculator__log').forEach(btn => {
            btn.href = './admin.html';
        });
    }

    const logOutButton = document.querySelector('.calculator__logout');
    if (logOutButton) {
        logOutButton.addEventListener('click', (e) => {
            e.preventDefault();
            localStorage.removeItem('logedIn');
            window.location = './index.html';
        });
    }
}

export default logedIn;