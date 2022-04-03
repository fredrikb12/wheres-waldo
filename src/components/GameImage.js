import React, { useState } from "react";
import UserSelection from "./UserSelection";

function GameImage({}) {
  const [selectionIsActive, setSelectionIsActive] = useState(false);
  const root = document.documentElement;

  return (
    <div
      className="image-container"
      onClick={(e) => {
        if (e.target.classList.contains("selection-square")) return;
        root.style.setProperty("--selection-x", e.pageX + "px");
        root.style.setProperty("--selection-y", e.pageY + "px");
        console.log(e);
        console.log(e.view.pageYOffset);
        console.log(e.pageY);

        setSelectionIsActive((isActive) => {
          return !isActive;
        });
      }}
    >
      {selectionIsActive ? <UserSelection /> : null}
    </div>
  );
}

export default GameImage;
