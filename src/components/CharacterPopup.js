import React from "react";
import uniqid from "uniqid";

function CharacterPopup({
  handleUserSelection,
  foundCharacters,
  gameCharacters,
}) {
  if (gameCharacters !== undefined) {
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
  } else return <h1>Loading...</h1>;
}

export default CharacterPopup;
