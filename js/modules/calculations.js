import {getData} from '../services/services';

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
    getData(endpoint)
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

export default calculator;