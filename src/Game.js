import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import GameImage from "./components/GameImage";
import { getDB, getImageData, makeSubmission } from "./firebase";
import { doc, setDoc } from "firebase/firestore/lite";

function Game() {
  const [pageClicked, setPageClicked] = useState(0);
  const [selectedImage, setSelectedImage, setNavCharacters] =
    useOutletContext();
  const [characters, setCharacters] = useState([]);
  const [foundCharacters, setFoundCharacters] = useState([]);
  const [clickedCoordinates, setClickedCoordinates] = useState({});
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(0);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    async function setData() {
      const data = await getImageData(selectedImage);
      setCharacters([...data.characters]);
      setNavCharacters([...data.characters]);
    }
    setData();
  }, [selectedImage, setCharacters, setNavCharacters]);

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

    const { rect } = clickedCoordinates;

    const charLeft = xStart * rect.width;
    const charRight = xEnd * rect.width;
    const charTop = yStart * rect.height;
    const charBot = yEnd * rect.height;

    const selectLeft = clickedCoordinates.x - 35 - (window.scrollX + rect.left);
    const selectRight =
      clickedCoordinates.x + 35 - (window.scrollX + rect.left);
    const selectTop = clickedCoordinates.y - 35 - (window.scrollY + rect.top);
    const selectBot = clickedCoordinates.y + 35 - (window.scrollY + rect.top);

    if (
      charLeft < selectRight &&
      charRight > selectLeft &&
      charTop < selectBot &&
      charBot > selectTop
    ) {
      console.log("collision");
      setFoundCharacters((prevState) => {
        return [...prevState, character];
      });
    }
  }

  useEffect(() => {
    setStartTime(new Date().getTime());
  }, [setStartTime]);

  useEffect(() => {
    if (
      foundCharacters.length === characters.length &&
      characters.length !== 0
    ) {
      setEndTime(new Date().getTime() - startTime);
    }
  }, [foundCharacters, characters, startTime]);

  function updateCoordinates(coords) {
    setClickedCoordinates((prev) => {
      return coords;
    });
  }

  return (
    <div>
      {selectedImage !== undefined ? (
        <div
          className="game-container"
          onClick={(e) => {
            if (
              !e.target.classList.contains("game-image") &&
              !e.target.classList.contains("selection-square")
            )
              setPageClicked((prevState) => prevState + 1);
          }}
        >
          {endTime !== 0 && !hasSubmitted ? (
            <div className="submission-container">
              <form
                className="submission-form"
                onSubmit={(e) => {
                  e.preventDefault();
                  makeSubmission(
                    selectedImage,
                    endTime,
                    document.getElementById("name-input").value
                  );
                  setHasSubmitted(true);
                }}
              >
                <h1>Congrats! You found all the characters.</h1>
                <h2>
                  Final time: {(endTime - (endTime % 1000)) / 1000}.
                  {endTime % 1000 }
                   {" "}seconds!
                </h2>
                <label>
                  Name: <input type="text" id="name-input" />
                </label>
                <button type="submit">Submit</button>
              </form>
            </div>
          ) : null}
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
