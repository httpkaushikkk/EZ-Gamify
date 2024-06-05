import "./style.css";
import React from "react";

interface PlayButtonInterface {
  onClick: any;
}

const PlayButton: React.FC<PlayButtonInterface> = ({ onClick }) => {
  return (
    <div className="buttons">
      <button className="btn" onClick={onClick}>
        <span></span>
        <p
          data-start="good luck!"
          data-text="start!"
          data-title="Play Game"
        ></p>
      </button>
    </div>
  );
};

export default PlayButton;
