const currency_one = document.getElementById('currency-one');
const currency_two = document.getElementById('currency-two');
const amount_one = document.getElementById('amount-one');
const amount_two = document.getElementById('amount-two');
const rate = document.getElementById('rate');
const swap = document.getElementById('swap');
function calculate(){
    const currVal1 = currency_one.value;
    const currVal2 = currency_two.value;
    fetch(`https://v6.exchangerate-api.com/v6/9ca031008dae7efdd9d3de0c/latest/${currVal1}`)
           .then(res => res.json())
           .then(data => {
               console.log(data);
               let calculatedValue = amount_one.value * data.conversion_rates[currVal2];
               rate.innerHTML = `1 ${currVal1} is equal to ${calculatedValue} ${currVal2}`
               amount_two.value = calculatedValue;  
           })
}

calculate();

swap.addEventListener('click',  () => {
let temp = currency_one.value;
currency_one.value = currency_two.value;
currency_two.value = temp;
calculate();
})

amount_one.addEventListener('input',calculate);
currency_one.addEventListener('change',calculate);
currency_two.addEventListener('change',calculate);
