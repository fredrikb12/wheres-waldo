import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";

function Navbar() {
  const [selectedImage, setSelectedImage] = useState("stage-1");
  const [characters, setNavCharacters] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  function handleImageSelection(name) {
    console.log(name);
    setSelectedImage(name);
  }

  return (
    <div className="page-wrapper">
      <nav>
        <h1>Where's Waldo</h1>
        {characters.length === 0 ? null : (
          <ul
            className="menu"
            onMouseOut={() => setShowDropdown((prev) => !prev)}
            onMouseOver={() => setShowDropdown((prev) => !prev)}
          >
            {characters.length === 0 ? (
              <p>Stage Selection</p>
            ) : (
              <span>Characters to find: {characters.length}</span>
            )}
            <div className="item-container">
              {characters.map((char, index) => {
                return (
                  <li className="menu-item" key={index}>
                    {char}
                  </li>
                );
              })}
            </div>
          </ul>
        )}

        <ul className="nav-links">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/leaderboard">Leaderboard</Link>
          </li>
        </ul>
      </nav>
      <main className="main-wrapper">
        <Outlet
          context={[selectedImage, handleImageSelection, setNavCharacters]}
        />
      </main>
    </div>
  );
}

export default Navbar;
