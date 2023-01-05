window.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById("calc-form");
  if (form) {
    setupIntialValues();
    form.addEventListener("submit", function(e) {
      e.preventDefault();
      update();
    });
  }
});

function getCurrentUIValues() {
  return {
    amount: +(document.getElementById("loan-amount").value),
    years: +(document.getElementById("loan-years").value),
    rate: +(document.getElementById("loan-rate").value),
  }
}

// Get the inputs from the DOM.
// Put some default values in the inputs
// Call a function to calculate the current monthly payment
function setupIntialValues() {
  const values  = { amount: 10000, years: 10, rate: 4.5 };
  let amount = document.querySelector("#loan-amount"); 
  amount.value = values.amount;
  let years = document.querySelector("#loan-years");
  years.value = values.years;
  let rate = document.querySelector("#loan-rate");
  rate.value = values.rate; 
  update(); 
}

// Get the current values from the UI
// Update the monthly payment
function update() {
  let values = getCurrentUIValues();
  updateMonthly(calculateMonthlyPayment(values)); 
}

// Given an object of values (a value has amount, years and rate ),
// calculate the monthly payment.  The output should be a string
// that always has 2 decimal places.
function calculateMonthlyPayment(values) {
  let p = values.amount;
  let i = (values.rate/100)/12; 
  let n = Math.floor(values.years * 12);
  let mp = ((p*i)/(1- Math.pow((1+i), -n))).toFixed(2);
  return mp; 
}

// Given a string representing the monthly payment value,
// update the UI to show the value.
function updateMonthly(monthly) {
  let monthly_payment = document.querySelector("#monthly-payment"); 
  monthly_payment.innerText = "$" + monthly; 
}
