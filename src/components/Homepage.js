import React from "react";
import { Link, useOutletContext } from "react-router-dom";
import waldoImage from "../images/stage-1.jpg";

function Homepage() {
  const [selectedImage, handleImageSelection] = useOutletContext();
  return (
    <div className="stage-selection">
      <Link to="/game">
        <img
          src={waldoImage}
          alt="waldo"
          onClick={() => handleImageSelection("stage-1")}
        />
      </Link>
    </div>
  );
}

export default Homepage;
