'use strict';

import tabs from './modules/tabs';
import squaresStructure from './modules/squares-structure';
import worksStructure from './modules/works-structure';
import calculator from './modules/calculations';

window.addEventListener('DOMContentLoaded', () => {
    tabs('.calculator__tab', '.calculator__calculations', 'calculator__tab-active');
    squaresStructure();
    worksStructure();
    calculator();
});