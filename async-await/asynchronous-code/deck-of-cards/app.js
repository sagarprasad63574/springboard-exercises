let baseURL = 'https://deckofcardsapi.com/api/deck';

async function part1() {
    let res = await $.getJSON(`${baseURL}/new/draw`);
    let { suit, value } = res.cards[0];
    console.log(`${value.toLowerCase()} of ${suit.toLowerCase()}`);
}

part1();

async function part2() {
    let firstDeck = await $.getJSON(`${baseURL}/new/draw/`);
    let deckId = firstDeck.deck_id;
    let secondDeck = await $.getJSON(`${baseURL}/${deckId}/draw/`);
    [firstDeck, secondDeck].forEach(card => {
        let { suit, value } = card.cards[0];
        console.log(`${value.toLowerCase()} of ${suit.toLowerCase()}`);
    });
}

part2();

async function setup() {
    let $btn = $('button');
    let $cardArea = $('#card-area');

    let deck = await $.getJSON(`${baseURL}/new/shuffle/`);
    $btn.show().on('click', async function () {
        let card = await $.getJSON(`${baseURL}/${deck.deck_id}/draw/`);
        let cardImg = card.cards[0].image;
        let angle = Math.random() * 90 - 45;
        let randomX = Math.random() * 40 - 20;
        let randomY = Math.random() * 40 - 20;
        $cardArea.append(
            $('<img>', {
                src: cardImg,
                css: {
                    transform: `translate(${randomX}px, ${randomY}px) rotate(${angle}deg)`
                }
            })
        );
        if (card.remaining === 0) $btn.remove();
    });
}
setup();