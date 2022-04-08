import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";

function Navbar() {
  const [selectedImage, setSelectedImage] = useState("stage-1");

  function handleImageSelection(name) {
    console.log(name);
    setSelectedImage(name);
  }

  return (
    <div className="page-wrapper">
      <nav>
        <h1>Where's Waldo</h1>
        <div>Dropdown</div>
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
        <Outlet context={[selectedImage, handleImageSelection]} />
      </main>
    </div>
  );
}

export default Navbar;
