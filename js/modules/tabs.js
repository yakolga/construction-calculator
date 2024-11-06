function tabs(tabButtonSelector, tabContentSelector, activeClass) {
    const tabButtons = document.querySelectorAll(tabButtonSelector),
        tabContent = document.querySelectorAll(tabContentSelector);

    tabButtons.forEach((button, _, btns) => {
        button.addEventListener("click", (e) => {
            btns.forEach(btn => {
                btn.classList.remove(activeClass);
            });

            e.target.classList.add(activeClass);
            
            let buttonName = button.getAttribute('data-name');
            tabContent.forEach(content => {
                if (buttonName == content.getAttribute('data-name')) {
                    content.classList.remove('d-none');
                } else {
                    content.classList.add('d-none');
                }
            });
        });
    });
}

export default tabs;