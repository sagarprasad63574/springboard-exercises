$(function () {
    let baseURL = 'https://deckofcardsapi.com/api/deck';

    $.getJSON(`${baseURL}/new/draw/`).then(res => {
        let { suit, value } = res.cards[0];
        console.log(`${value.toLowerCase()} of ${suit.toLowerCase()}`);
    });

    let firstCard = null;
    $.getJSON(`${baseURL}/new/draw/`)
        .then(res => {
            firstCard = res.cards[0];
            let deckId = res.deck_id;
            return $.getJSON(`${baseURL}/${deckId}/draw/`);
        })
        .then(res => {
            let secondCard = res.cards[0];
            [firstCard, secondCard].forEach(function (card) {
                console.log(
                    `${card.value.toLowerCase()} of ${card.suit.toLowerCase()}`
                );
            });
        });

    let deckId = null;
    let $btn = $('button');
    let $cardArea = $('#card-area');

    $.getJSON(`${baseURL}/new/shuffle/`).then(res => {
        deckId = res.deck_id;
        $btn.show();
    });

    $btn.on('click', function () {
        $.getJSON(`${baseURL}/${deckId}/draw/`).then(res => {
            let cardImg = res.cards[0].image;
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
            if (res.remaining === 0) $btn.remove();
        });
    });
});
