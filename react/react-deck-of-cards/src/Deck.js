import React, { useState, useEffect, useRef } from "react";
import Card from "./Card.js";
import axios from "axios";

const BASE_URL = "http://deckofcardsapi.com/api/deck";

const Deck = () => {
  const [deck, setDeck] = useState(null);
  const [drawn, setDrawn] = useState([]);
  const [autoDraw, setAutoDraw] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    async function getData() {
      let data = await axios.get(`${BASE_URL}/new/shuffle/`);
      setDeck(data.data);
    }
    getData();
  }, [setDeck]);

  useEffect(() => {
    async function getCard() {
      let { deck_id } = deck;

      try {
        let drawRes = await axios.get(`${BASE_URL}/${deck_id}/draw/`);

        if (drawRes.data.remaining === 0) {
          setAutoDraw(false);
          throw new Error("no cards remaining!");
        }
        const card = drawRes.data.cards[0];

        setDrawn(d => [
          ...d,
          {
            id: card.code,
            name: card.suit + " " + card.value,
            image: card.image
          }
        ]);
      } catch (err) {
        alert(err);
      }
    }

    if(autoDraw && !timerRef.current) {
      timerRef.current = setInterval(async () => {
        await getCard();
      }, 1000);
    }

    return () => {
      clearInterval(timerRef.current);
      timerRef.current = null;
    };
  }, [autoDraw, setAutoDraw, deck]);

  const toggleAutoDraw = () => {
    setAutoDraw(auto => !auto);
  };

  const cards = drawn.map(card => (
    <Card key={card.id} name={card.name} image={card.image} />
  ));

  return (
    <div>
      {deck ? (
        <button onClick={toggleAutoDraw}>
          {autoDraw ? "STOP": "KEEP"} DRAWING FOR ME!
        </button>
      ): null}
      <div>{cards}</div>
    </div>
  )
}

export default Deck
