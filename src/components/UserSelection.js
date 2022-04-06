import React from "react";
import CharacterPopup from "./CharacterPopup";

function UserSelection({
  handleUserSelection,
  foundCharacters,
  gameCharacters,
}) {
  return (
    <div className="selection-square">
      <CharacterPopup
        handleUserSelection={handleUserSelection}
        foundCharacters={foundCharacters}
        gameCharacters={gameCharacters}
      />
    </div>
  );
}

export default UserSelection;
