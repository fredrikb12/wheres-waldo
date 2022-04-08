import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import GameImage from "./components/GameImage";
import { getImageData } from "./firebase";

function Game() {
  const [pageClicked, setPageClicked] = useState(0);
  const [selectedImage, setSelectedImage, setNavCharacters] =
    useOutletContext();
  const [characters, setCharacters] = useState([]);
  const [foundCharacters, setFoundCharacters] = useState([]);
  const [clickedCoordinates, setClickedCoordinates] = useState({});

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    async function setData() {
      const data = await getImageData(selectedImage);
      console.log(data);
      setCharacters([...data.characters]);
      setNavCharacters([...data.characters]);
    }
    setData();
    console.log(selectedImage);
  }, [selectedImage]);

  useEffect(() => {
    async function submitTime() {
      if (characters.length === foundCharacters.length && characters.length > 0)
        console.log("all characters found");
    }
    submitTime();
  }, [characters, foundCharacters]);

  useEffect(() => {
    const chars = characters.filter((char) => {
      return !foundCharacters.includes(char);
    });
    setNavCharacters([...chars]);
  }, [characters, foundCharacters, setNavCharacters]);

  async function handleUserSelection(character) {
    if (foundCharacters.includes(character)) return;
    const data = await getImageData(selectedImage);
    const { xStart, xEnd, yStart, yEnd } = data[character.toLowerCase()];
    //console.log(data);

    /*console.log(clickedCoordinates.x + 35 - 20);
    console.log(clickedCoordinates.x - 35 - 20);
    console.log(clickedCoordinates.y + 35 - 20);
    console.log(clickedCoordinates.y - 35 - 20);*/
    //console.log(clickedCoordinates.rect);
    const { rect } = clickedCoordinates;

    console.log(yStart * rect.height);
    console.log(rect);
    console.log(window.scrollY);

    const charLeft = xStart * rect.width;
    const charRight = xEnd * rect.width;
    const charTop = yStart * rect.height;
    const charBot = yEnd * rect.height;

    const selectLeft = clickedCoordinates.x - 35 - (window.scrollX + rect.left);
    const selectRight =
      clickedCoordinates.x + 35 - (window.scrollX + rect.left);
    const selectTop = clickedCoordinates.y - 35 - (window.scrollY + rect.top);
    const selectBot = clickedCoordinates.y + 35 - (window.scrollY + rect.top);
    /* console.log(charLeft < selectRight);
    console.log(charRight > selectLeft);
    console.log(charTop < selectBot);
    console.log(charBot > selectTop);*/
    console.log("charBot, selectTop", charBot, selectTop);

    if (
      charLeft < selectRight &&
      charRight > selectLeft &&
      charTop < selectBot &&
      charBot > selectTop
    ) {
      console.log("collision");
      setFoundCharacters((prevState) => {
        //return prevState;
        return [...prevState, character];
      });
    }
    /*if (
        xStart < clickedCoordinates.x + 35 &&
        xEnd > clickedCoordinates.x - 35 &&
        yStart < clickedCoordinates.y + 35 &&
        yEnd > clickedCoordinates.y - 35
      ) {
        console.log("collision");
        setFoundCharacters((prevState) => {
          return [...prevState, character];
        });
      } else {
        console.log("no collision");
      }*/
  }

  function updateCoordinates(coords) {
    setClickedCoordinates((prev) => {
      //console.log(coords);
      return coords;
    });
  }

  return (
    <div>
      {selectedImage !== undefined ? (
        <div
          className="Homepage"
          onClick={(e) => {
            if (
              !e.target.classList.contains("game-image") &&
              !e.target.classList.contains("selection-square")
            )
              setPageClicked((prevState) => prevState + 1);
          }}
        >
          <GameImage
            pageClicked={pageClicked}
            selectedImage={selectedImage}
            handleUserSelection={handleUserSelection}
            updateCoordinates={updateCoordinates}
            foundCharacters={foundCharacters}
            gameCharacters={characters}
          />
        </div>
      ) : (
        <h1>Loading...</h1>
      )}
    </div>
  );
}

export default Game;
