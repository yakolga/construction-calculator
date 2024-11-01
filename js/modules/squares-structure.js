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

    getData("http://localhost:3000/squares")
        .then(data => {
            console.log(data);
            data.forEach(({name, value, id}) => {
                new squaresElement(name, value, id, '.calculator__calculations.--square .calculator__blocks').render();
            });
        });
}

export default squaresStructure;