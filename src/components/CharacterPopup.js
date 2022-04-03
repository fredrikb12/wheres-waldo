import React from "react";
import uniqid from "uniqid";

function CharacterPopup() {
  const characters = ["Waldo", "Wizard", "Hecker"];

  return (
    <ul className="popup">
      {characters.map((character) => {
        return (
          <li
            className="character-name"
            key={uniqid()}
            onClick={(e) => console.log(`clicked ${character}`)}
          >
            {character}
          </li>
        );
      })}
    </ul>
  );
}

export default CharacterPopup;
