import React from "react";
import "./card.css";

function Card(props) {
  return (
    <div onClick={props.cardClickHandler}>
      <img src={props.src} alt="card"></img>
    </div>
  );
}

export default Card;
