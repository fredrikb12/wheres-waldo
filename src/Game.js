import { useEffect, useState } from "react";
import GameImage from "./components/GameImage";
import { getImageData } from "./firebase";

function Game() {
  const [pageClicked, setPageClicked] = useState(0);

  useEffect(() => {
    async function setData() {
      const data = await getImageData("stage-1");
      console.log(data);
    }
    setData();
  }, []);

  return (
    <div
      className="Homepage"
      onClick={(e) => {
        if (!e.target.classList.contains("image-container"))
          setPageClicked((prevState) => prevState + 1);
      }}
    >
      <GameImage pageClicked={pageClicked} />
    </div>
  );
}

export default Game;
