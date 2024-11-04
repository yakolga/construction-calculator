import { getData } from "../services/services";

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

    getData('http://localhost:3000/operations')
        .then(data => {
            data.forEach(({name, count, unit, id}, i) => {
                new worksElement(name, count, unit, id, i, '.calculator__calculations.--admin .calculator__blocks').render();
            });
        });
}

export default adminStructure;