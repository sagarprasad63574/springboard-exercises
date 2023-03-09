let baseURL = "http://numbersapi.com";

$.getJSON(`${baseURL}/17?json`).then(res => {
    console.log(res);
});

let nums = [5, 11, 21, 88, 70];
$.getJSON(`${baseURL}/${nums}?json`).then(res => {
    console.log(res);

    for (const data in res) {
        $('body').append(`<p>${res[data]}</p>`);
    }

});

let numFacts = [];

for (let i = 0; i < 4; i++) {
  numFacts.push(
    $.getJSON(`${baseURL}/17?json`)
  );
}

Promise.all(numFacts)
  .then(facts => (
    facts.forEach(fact => $("body").append(`<p>${fact.text}</p>`))
  ))
  .catch(err => console.log(err));