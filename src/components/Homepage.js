import React from "react";
import { Link, useOutletContext } from "react-router-dom";
import stageOne from "../images/stage-1.jpg";
import stageTwo from "../images/stage-2.jpg";
import stageThree from "../images/stage-3.jpg";

function Homepage() {
  const [selectedImage, handleImageSelection] = useOutletContext();
  return (
    <div className="stage-selection">
      <Link to="/game" className="stage-link">
        <img className="stage-image"
          src={stageOne}
          alt="stage 1"
          onClick={() => handleImageSelection("stage-1")}
        />
      </Link>
      <Link to="/game" className="stage-link">
        <img className="stage-image"
          src={stageTwo}
          alt="stage 2"
          onClick={() => handleImageSelection("stage-2")}
        />
      </Link>
      <Link to="/game" className="stage-link">
        <img className="stage-image"
          src={stageThree}
          alt="stage 3"
          onClick={() => handleImageSelection("stage-3")}
        />
      </Link>
    </div>
  );
}

export default Homepage;
