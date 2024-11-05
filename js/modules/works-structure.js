import { getData } from "../services/services";

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

    getData('https://construction-calculator.onrender.com/operations')
        .then(data => {
            data.forEach(({name, count, unit, id}, i) => {
                new worksElement(name, count, unit, id, i, '.calculator__calculations.--works .calculator__blocks').render();
            });
        });
}

export default worksStructure;