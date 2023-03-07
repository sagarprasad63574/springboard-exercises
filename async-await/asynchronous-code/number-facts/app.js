let baseURL =  "http://numbersapi.com";

async function part1() {
    let res = await $.getJSON(`${baseURL}/17?json`);
    console.log(res);
}

part1();

const nums = [5, 17, 21, 70, 10]
async function part2() {
    let res = await $.getJSON(`${baseURL}/${nums}?json`)
    console.log(res)

    for (const data in res) {
        $('body').append(`<p>${res[data]}</p>`);
    }

}

part2();

async function part3() {
    
    let nums = [];

    for (let i = 0; i < 4; i++) {
        let res = await $.getJSON(`${baseURL}/17?json`)
        console.log(res)
        nums.push(res.text)
    }

    nums.forEach(data => {
        $('body').append(`<p>${data}</p>`);
    });
}

part3();