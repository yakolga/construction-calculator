/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/admin-post.js":
/*!**********************************!*\
  !*** ./js/modules/admin-post.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");


function adminPost(parentSelector, elementSelector, endpoint) {
    if (!document.querySelector(parentSelector)) return false

    document.querySelector(parentSelector).addEventListener('blur', (e) => {
        if (e.target.tagName === 'INPUT') {
            let inputValue = e.target.value;
    
            if (inputValue) {
                (0,_services_services__WEBPACK_IMPORTED_MODULE_0__.updateOperationCount)(e.target.closest(elementSelector).id, inputValue, endpoint, e.target);
            }
        }
    }, true);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (adminPost);

/***/ }),

/***/ "./js/modules/admin-structure.js":
/*!***************************************!*\
  !*** ./js/modules/admin-structure.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");


function adminStructure() {
    class worksElement {
        constructor(name, count, unit, id, i, parentSelector) {
            this.name = name;
            this.count = count;
            this.unit = unit;
            this.id = id;
            this.parent = document.querySelector(parentSelector);
            this.i = i;
        }

        render() {
            if (!this.parent) return false
    
            const element = document.createElement('div');
            element.classList.add('calculator__block');
            element.id = this.id;

            element.innerHTML = `
                <span class="calculator__name">${this.name}</span>
                <div class="calculator__input">
                    <input type="text" placeholder="${this.count}">
                    <span class="calculator__unit">${this.unit}</span>
                </div>
            `;

            this.parent.append(element);
        }
    }

    (0,_services_services__WEBPACK_IMPORTED_MODULE_0__.getData)('http://localhost:3000/operations')
        .then(data => {
            data.forEach(({name, count, unit, id}, i) => {
                new worksElement(name, count, unit, id, i, '.calculator__calculations.--admin .calculator__blocks').render();
            });
        });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (adminStructure);

/***/ }),

/***/ "./js/modules/admin.js":
/*!*****************************!*\
  !*** ./js/modules/admin.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");


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
        (0,_services_services__WEBPACK_IMPORTED_MODULE_0__.getData)('http://localhost:3000/admin')
            .then(data => {
                if (loginInput.value == data.login && passwordInput.value == data.password) {
                    window.location = '/construction-calculator/admin.html';

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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (logIn);

/***/ }),

/***/ "./js/modules/calculations.js":
/*!************************************!*\
  !*** ./js/modules/calculations.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");


function calculator(parentSelector) {
    if (!document.querySelector(parentSelector)) return false

    const uahResult = document.querySelector('.--uah .calculator__price span'),
        usdResult = document.querySelector('.--usd .calculator__price span');

    let squares = 0, ceilingHeight = 0, bathroomSquare = 0;

    document.querySelector(parentSelector).addEventListener('input', (e) => {
        const target = e.target;

        if (target.value < 0 && target.closest('.--square')) {
            target.classList.add('error');
            target.value = 0;
        } else {
            target.classList.remove('error');
        }

        function getSquares() {
            const allSquareInputs = document.querySelectorAll('.--square .calculator__blocks input');
            squares = Array.from(allSquareInputs).reduce((sum, input) => {
                return sum + (parseFloat(input.value) || 0);
            }, 0);
        }

        function calculate() {
            let result = 0;

            if (target.closest('.--square') && target.value >= 0 && !target.closest('.calculator__block_ceiling')) {
                getSquares();
            }

            if (document.querySelector('.calculator__block_ceiling input')) {
                ceilingHeight = +document.querySelector('.calculator__block_ceiling input').value || 0;
            }

            let bathroomSquares = +document.querySelector('#bathroom input').value || 0;
            let toiletSquares = +document.querySelector('#toilet input').value || 0;
            bathroomSquare = bathroomSquares + toiletSquares;

            document.querySelectorAll('.calculator__block input[type="checkbox"]').forEach((checkbox) => {
                if (!checkbox.checked) return;

                const priceElement = checkbox.closest('.calculator__block').querySelector('.calculator__price-price');
                if (!priceElement) return;

                const price = +priceElement.textContent || 0;

                if (checkbox.closest('#plastering') || checkbox.closest('#wall_putty') || checkbox.closest('#wallpapering') || checkbox.closest('#walls-painting')) {
                    result += 4 * Math.sqrt(squares) * ceilingHeight * price;
                } else if (checkbox.closest('#ceiling-plinth') || checkbox.closest('#skirting-board')) {
                    result += 4 * Math.sqrt(squares) * price;
                } else if (checkbox.closest('#windows')) {
                    result += Math.round(squares / 7.5) * price;
                } else if (checkbox.closest('#inserting-doors')) {
                    result += Math.round(squares / 25) * price;
                } else if (checkbox.closest('#bathrooms-kitchenfloor-halfway')) {
                    result += bathroomSquare * price;
                } else if (checkbox.closest('#plumbing-installation') || checkbox.closest('#electrics') || checkbox.closest('#entrance-door')) {
                    result += price;
                } else if (checkbox.closest('.--works')) {
                    result += squares * price;
                }
            });

            uahResult.textContent = result.toFixed(2);

            if (localStorage.getItem("USD-currency")) {
                usdResult.textContent = (result / +localStorage.getItem("USD-currency")).toFixed(2);
            }
        }

        calculate();
    });
};

function getCurrency(endpoint) {
    (0,_services_services__WEBPACK_IMPORTED_MODULE_0__.getData)(endpoint)
        .then(data => {
            const usdCurrency = data[0].rate;
            if (usdCurrency) {
                localStorage.setItem("USD-currency", usdCurrency);
            }
        });
};

if (!localStorage.getItem("USD-currency")) {
    getCurrency('https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?valcode=USD&json');
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calculator);

/***/ }),

/***/ "./js/modules/logedIn.js":
/*!*******************************!*\
  !*** ./js/modules/logedIn.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function logedIn() {
    if (localStorage.getItem('logedIn') && window.location.href.includes('login')) {
        window.location = '/construction-calculator/admin.html';
    }

    if (!localStorage.getItem('logedIn') && window.location.href.includes('admin')) {
        window.location = '/construction-calculator/login.html';
    }

    if (localStorage.getItem('logedIn')) {
        document.querySelectorAll('.calculator__log').forEach(btn => {
            btn.href = '/construction-calculator/admin.html';
        });
    }

    const logOutButton = document.querySelector('.calculator__logout');
    if (logOutButton) {
        logOutButton.addEventListener('click', (e) => {
            e.preventDefault();
            localStorage.removeItem('logedIn');
            window.location = '/construction-calculator/index.html';
        });
    }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (logedIn);

/***/ }),

/***/ "./js/modules/squares-structure.js":
/*!*****************************************!*\
  !*** ./js/modules/squares-structure.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");


function squaresStructure() {
    class squaresElement {
        constructor(name, value, id, parentSelector) {
            this.title = name;
            this.value = value;
            this.id = id;
            this.parent = document.querySelector(parentSelector);
        }

        render() {
            if (!this.parent) return false
            const element = document.createElement('div');
            element.classList.add('calculator__block');
            element.id = this.id;

            element.innerHTML = `
                <span class="calculator__name">${this.title}</span>
                <div class="calculator__input">
                    <input type="text" placeholder="${this.value}.00">
                    <span class="calculator__unit">м<sup>2</sup></span>
                </div>
            `;

            this.parent.append(element);
        }
    }

    (0,_services_services__WEBPACK_IMPORTED_MODULE_0__.getData)("http://localhost:3000/squares")
        .then(data => {
            data.forEach(({name, value, id}) => {
                new squaresElement(name, value, id, '.calculator__calculations.--square .calculator__blocks').render();
            });
        });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (squaresStructure);

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function tabs(tabButtonSelector, tabContentSelector, activeClass) {
    const tabButtons = document.querySelectorAll(tabButtonSelector),
        tabContent = document.querySelectorAll(tabContentSelector);

    tabButtons.forEach(button => {
        button.addEventListener("click", (e) => {
            tabButtons.forEach(btn => {
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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs);

/***/ }),

/***/ "./js/modules/works-structure.js":
/*!***************************************!*\
  !*** ./js/modules/works-structure.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");


function worksStructure() {
    if (!document.querySelector('.calculator__main')) return false
    class worksElement {
        constructor(name, count, unit, id, i, parentSelector) {
            this.name = name;
            this.count = count;
            this.unit = unit;
            this.id = id;
            this.parent = document.querySelector(parentSelector);
            this.i = i;
        }

        render() {
            if (!this.parent) return false
            
            const element = document.createElement('div');
            element.classList.add('calculator__block');
            element.id = this.id;

            element.innerHTML = `
                <label for="${this.id}-${this.i}" class="calculator__name">
                    ${this.name}
                    <span class="calculator__price_unit">
                        <span class="calculator__price-price"> ${this.count}</span>
                        <span class="calculator__price-unit">${this.unit}</span>
                    </span>
                </label>
                <div class="calculator__input">
                    <input type="checkbox" id="${this.id}-${this.i}">
                </div>
            `;

            this.parent.append(element);
        }
    }

    (0,_services_services__WEBPACK_IMPORTED_MODULE_0__.getData)('http://localhost:3000/operations')
        .then(data => {
            data.forEach(({name, count, unit, id}, i) => {
                new worksElement(name, count, unit, id, i, '.calculator__calculations.--works .calculator__blocks').render();
            });
        });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (worksStructure);

/***/ }),

/***/ "./js/services/services.js":
/*!*********************************!*\
  !*** ./js/services/services.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getData: () => (/* binding */ getData),
/* harmony export */   updateOperationCount: () => (/* binding */ updateOperationCount)
/* harmony export */ });
async function updateOperationCount(id, newCount, endpoint, element) {
    const response = await fetch(`${endpoint}/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ count: newCount }),
    });

    if (response.ok) {
        element.placeholder = newCount;
    } else {
        console.error('Ошибка при обновлении:', response.statusText);
    }
};



const getData = async (url) => {
    const res = await fetch(url);

    if (!res.ok) {
        throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }

    return await res.json();
};



/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
/* harmony import */ var _modules_squares_structure__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/squares-structure */ "./js/modules/squares-structure.js");
/* harmony import */ var _modules_works_structure__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/works-structure */ "./js/modules/works-structure.js");
/* harmony import */ var _modules_calculations__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/calculations */ "./js/modules/calculations.js");
/* harmony import */ var _modules_admin__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/admin */ "./js/modules/admin.js");
/* harmony import */ var _modules_logedIn__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/logedIn */ "./js/modules/logedIn.js");
/* harmony import */ var _modules_admin_structure__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/admin-structure */ "./js/modules/admin-structure.js");
/* harmony import */ var _modules_admin_post__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./modules/admin-post */ "./js/modules/admin-post.js");











window.addEventListener('DOMContentLoaded', () => {
    (0,_modules_tabs__WEBPACK_IMPORTED_MODULE_0__["default"])('.calculator__tab', '.calculator__calculations', 'calculator__tab-active');
    (0,_modules_squares_structure__WEBPACK_IMPORTED_MODULE_1__["default"])();
    (0,_modules_works_structure__WEBPACK_IMPORTED_MODULE_2__["default"])();
    (0,_modules_calculations__WEBPACK_IMPORTED_MODULE_3__["default"])('.calculator__main');
    (0,_modules_admin__WEBPACK_IMPORTED_MODULE_4__["default"])('.calculator__form', '#login', '#password', '.calculator__message', 'error');
    (0,_modules_logedIn__WEBPACK_IMPORTED_MODULE_5__["default"])();
    (0,_modules_admin_structure__WEBPACK_IMPORTED_MODULE_6__["default"])();
    (0,_modules_admin_post__WEBPACK_IMPORTED_MODULE_7__["default"])('.--admin .calculator__blocks', '.calculator__block', 'http://localhost:3000/operations');
});
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map