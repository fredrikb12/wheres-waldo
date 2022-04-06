import { useState } from "react";
import { BrowserRouter, Routes, Route, HashRouter } from "react-router-dom";
import Game from "../Game";
import Homepage from "./Homepage";
import Navbar from "./Navbar";

function RouteSwitch() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route index element={<Homepage />} />
          <Route path="/game" element={<Game />} />
          <Route path="/leaderboard" element={<h1>Leaderboard</h1>} />
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default RouteSwitch;
