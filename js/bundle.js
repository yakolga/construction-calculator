/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

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


function calculator(uahSelector, usdSelector) {
    const uahResult = document.querySelector('.--uah .calculator__price span'),
        usdResult = document.querySelector('.--usd .calculator__price span');

    let squares = 0, ceilingHeight = 0, bathroomSquare = 0;

    document.querySelector('.calculator__main').addEventListener('input', (e) => {
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

            console.log(squares);
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
            console.log(data);
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
            console.log(data);
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
/* harmony export */   postData: () => (/* binding */ postData)
/* harmony export */ });
const postData = async (url, data) => {
    const res = await fetch(url, {
        method: "POST",
        headers: {
            'Content-type': 'application/json'
        },
        body: data
    });

    return await res.json();
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







window.addEventListener('DOMContentLoaded', () => {
    (0,_modules_tabs__WEBPACK_IMPORTED_MODULE_0__["default"])('.calculator__tab', '.calculator__calculations', 'calculator__tab-active');
    (0,_modules_squares_structure__WEBPACK_IMPORTED_MODULE_1__["default"])();
    (0,_modules_works_structure__WEBPACK_IMPORTED_MODULE_2__["default"])();
    (0,_modules_calculations__WEBPACK_IMPORTED_MODULE_3__["default"])();
});
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map