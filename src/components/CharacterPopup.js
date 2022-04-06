import React from "react";
import uniqid from "uniqid";

function CharacterPopup({
  handleUserSelection,
  foundCharacters,
  gameCharacters,
}) {
  const characters = ["Waldo", "Wizard", "Hecker"];

  return (
    <ul className="popup">
      {gameCharacters.map((character) => {
        return (
          <li key={uniqid()}>
            <button
              disabled={foundCharacters.includes(character) ? true : false}
              className={
                foundCharacters.includes(character)
                  ? "character-name found"
                  : "character-name"
              }
              onClick={(e) => {
                //console.log(`clicked ${character}`);
                handleUserSelection(character);
              }}
            >
              {character}
            </button>
          </li>
        );
      })}
    </ul>
  );
}

export default CharacterPopup;
