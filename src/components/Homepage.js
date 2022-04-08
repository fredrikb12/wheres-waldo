import React, { useEffect, useState } from "react";
import { Link, useOutletContext } from "react-router-dom";
import { getImageData } from "../firebase";
import stageOne from "../images/stage-1.jpg";
import stageTwo from "../images/stage-2.jpg";
import stageThree from "../images/stage-3.jpg";

function Homepage() {
  const [selectedImage, handleImageSelection, setNavCharacters] =
    useOutletContext();
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    async function setCharacterData() {
      const stage1Data = await getImageData("stage-1");
      const stage2Data = await getImageData("stage-2");
      const stage3Data = await getImageData("stage-3");

      setCharacters([
        stage1Data.characters,
        stage2Data.characters,
        stage3Data.characters,
      ]);
    }
    setCharacterData();
  }, [setCharacters]);

  useEffect(() => {
    console.log(characters);
  }, [characters]);

  useEffect(() => {
    setNavCharacters([]);
  }, [setNavCharacters]);

  return (
    <div className="stage-selection">
      <Link
        to="/game"
        className="stage-link"
        onClick={() => handleImageSelection("stage-1")}
      >
        <img className="stage-image" src={stageOne} alt="stage 1" />

        <ul className="selection-list">
          {characters[0] && characters[0].length > 0 ? (
            characters[0].map((char, id) => {
              return (
                <li className="character-name" key={id}>
                  {char}
                </li>
              );
            })
          ) : (
            <p>Loading...</p>
          )}
        </ul>
      </Link>
      <Link
        to="/game"
        className="stage-link"
        onClick={() => handleImageSelection("stage-2")}
      >
        <img className="stage-image" src={stageTwo} alt="stage 2" />
        <ul className="selection-list">
          {characters[1] && characters[1].length > 0 ? (
            characters[1].map((char, id) => {
              return (
                <li className="character-name" key={id}>
                  {char}
                </li>
              );
            })
          ) : (
            <p>Loading...</p>
          )}
        </ul>
      </Link>
      <Link
        to="/game"
        className="stage-link"
        onClick={() => handleImageSelection("stage-3")}
      >
        <img className="stage-image" src={stageThree} alt="stage 3" />
        <ul className="selection-list">
          {characters[2] && characters[2].length > 0 ? (
            characters[2].map((char, id) => {
              return (
                <li className="character-name" key={id}>
                  {char}
                </li>
              );
            })
          ) : (
            <p>Loading...</p>
          )}
        </ul>
      </Link>
    </div>
  );
}

export default Homepage;
