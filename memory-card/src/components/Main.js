import { click } from "@testing-library/user-event/dist/click";
import React, { useEffect, useState } from "react";
import Card from "./Card";

let numOfCards = 8;

function Main() {
  const [cards, setCards] = useState([]);
  const [gifs, setGifs] = useState([]);
  const [clickedGifs, setClickedGifs] = useState([]);
  const [score, setScore] = useState(-1);
  const [highscore, setHighscore] = useState(-1);

  const cardClickHandler = (e) => {
    setClickedGifs((prev) => [...prev, e.target.currentSrc]);
  };

  const generateCards = async () => {
    setCards([]);
    for (let i = 0; i < gifs.length; i++) {
      setCards((prev) => [
        ...prev,
        <Card src={gifs[i]} cardClickHandler={cardClickHandler} key={i} />,
      ]);
    }
  };

  const fetchGif = async () => {
    const gif = await fetch(
      "https://api.giphy.com/v1/gifs/random?api_key=G0XczVg4hMwIlS2dx6jfkHlGrfTVHUDB&tag=&rating=g",
      { mode: "cors" }
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        return data.data.images.original.url;
      });

    setGifs((prev) => [...prev, gif]);
  };

  const shuffleArray = (arr) => {
    let arrLen = arr.length;
    const result = [];
    let randomIndex;
    while (result.length < arrLen) {
      randomIndex = Math.floor(Math.random() * arr.length);
      result.push(arr[randomIndex]);
      arr.splice(randomIndex, 1);
    }
    return result;
  };

  useEffect(() => {
    for (let i = 0; i < numOfCards; i++) {
      fetchGif();
    }
  }, []);

  useEffect(() => {
    console.log("hello");

    if (gifs.length === numOfCards) {
      generateCards();
    }
  }, [gifs]);

  useEffect(() => {
    if (clickedGifs.length !== new Set(clickedGifs).size) {
      setScore(-1);
      setClickedGifs([]);
      console.log("game over");
    } else {
      setScore(score + 1);
      if (score + 1 > highscore) {
        setHighscore(score + 1);
      }
    }
    setCards(shuffleArray(cards));
  }, [clickedGifs]);

  return (
    <div className="container">
      <p>
        Score: {score} Highscore: {highscore}
      </p>
      <div className="game-container">{cards}</div>
    </div>
  );
}

export default Main;
