import React, { useEffect, useState } from "react";
import UserSelection from "./UserSelection";

function GameImage({
  pageClicked,
  selectedImage,
  handleUserSelection,
  updateCoordinates,
  foundCharacters,
  gameCharacters,
}) {
  const [selectionIsActive, setSelectionIsActive] = useState(false);
  const root = document.documentElement;

  useEffect(() => {
    setSelectionIsActive((isActive) => {
      if (isActive) return false;
    });
  }, [pageClicked]);

  //if(selectedImage === undefined) selectedImage = "stage-1";

  return (
    <div className="image-container">
      <img
        className="game-image"
        src={require(`../images/${selectedImage}.jpg`)}
        alt=""
        onClick={(e) => {
          if (e.target.classList.contains("selection-square")) return;
          root.style.setProperty("--selection-x", e.pageX + "px");
          root.style.setProperty("--selection-y", e.pageY + "px");
          updateCoordinates({
            x: e.pageX,
            y: e.pageY,
            rect: e.target.getBoundingClientRect(),
          });
          /*console.log("x: ", e.pageX, "y: ", e.pageY);
          console.log(e);*/
          //TODO : figure out click coordinate stuff
          //console.log(domRect.)

          /* console.log(e);
          console.log(e.view.pageYOffset);
          console.log(e.pageY);*/

          setSelectionIsActive((isActive) => {
            if (!isActive) return true;
          });
        }}
      />
      {selectionIsActive ? (
        <UserSelection
          handleUserSelection={handleUserSelection}
          foundCharacters={foundCharacters}
          gameCharacters={gameCharacters}
        />
      ) : null}
    </div>
  );
}

export default GameImage;
