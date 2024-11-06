import { updateOperationCount } from '../services/services';

function adminPost(parentSelector, elementSelector, endpoint) {
    if (!document.querySelector(parentSelector)) return false

    document.querySelector(parentSelector).addEventListener('input', (e) => {
        e.target.value = e.target.value.replace(/[^0-9.]/g, '');
    });

    document.querySelector(parentSelector).addEventListener('blur', (e) => {
        if (e.target.tagName === 'INPUT') {
            let inputValue = e.target.value;
    
            if (inputValue) {
                updateOperationCount(e.target.closest(elementSelector).id, inputValue, endpoint, e.target);
            }
        }
    }, true);
}

export default adminPost;