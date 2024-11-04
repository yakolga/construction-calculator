'use strict';

import tabs from './modules/tabs';
import squaresStructure from './modules/squares-structure';
import worksStructure from './modules/works-structure';
import calculator from './modules/calculations';
import logIn from './modules/admin';
import logedIn from './modules/logedIn';
import adminStructure from './modules/admin-structure';
import adminPost from './modules/admin-post';

window.addEventListener('DOMContentLoaded', () => {
    tabs('.calculator__tab', '.calculator__calculations', 'calculator__tab-active');
    squaresStructure();
    worksStructure();
    calculator('.calculator__main');
    logIn('.calculator__form', '#login', '#password', '.calculator__message', 'error');
    logedIn();
    adminStructure();
    adminPost('.--admin .calculator__blocks', '.calculator__block', 'http://localhost:3000/operations');
});