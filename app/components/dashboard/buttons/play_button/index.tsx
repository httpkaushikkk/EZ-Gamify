import "./style.css";
import React from "react";

interface PlayButtonInterface {
  onClick: any;
  dataText: string;
  dataTitle: string;
}

const PlayButton: React.FC<PlayButtonInterface> = ({
  onClick,
  dataText,
  dataTitle,
}) => {
  return (
    <div className="buttons">
      <button className="btn" onClick={onClick}>
        <span></span>
        <p data-text={dataText} data-title={dataTitle}></p>
      </button>
    </div>
  );
};

export default PlayButton;
