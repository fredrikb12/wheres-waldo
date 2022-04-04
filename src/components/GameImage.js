import React, { useEffect, useState } from "react";
import UserSelection from "./UserSelection";

function GameImage({ pageClicked }) {
  const [selectionIsActive, setSelectionIsActive] = useState(false);
  const root = document.documentElement;

  useEffect(() => {
    setSelectionIsActive((isActive) => {
      if(isActive) return false;
    });
  }, [pageClicked]);

  return (
    <div
      className="image-container"
      onClick={(e) => {
        if (e.target.classList.contains("selection-square")) return;
        root.style.setProperty("--selection-x", e.pageX + "px");
        root.style.setProperty("--selection-y", e.pageY + "px");
        /* console.log(e);
        console.log(e.view.pageYOffset);
        console.log(e.pageY);*/
        console.log(e);

        setSelectionIsActive((isActive) => {
          if(!isActive) return true;
        });
      }}
    >
      {selectionIsActive ? <UserSelection /> : null}
    </div>
  );
}

export default GameImage;
