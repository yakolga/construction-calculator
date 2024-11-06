import { getData } from '../services/services';

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

    getData("https://construction-calculator.onrender.com/squares")
        .then(data => {
            data.forEach(({name, value, id}) => {
                new squaresElement(name, value, id, '.calculator__calculations--square .calculator__blocks').render();
            });
        });
}

export default squaresStructure;