import { updateOperationCount } from '../services/services';

function adminPost(parentSelector, elementSelector, endpoint) {
    if (!document.querySelector(parentSelector)) return false

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