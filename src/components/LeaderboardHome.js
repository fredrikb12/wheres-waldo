import React from "react";
import { Link } from "react-router-dom";
function LeaderboardHome() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h1>Leaderboard</h1>
      <div>
        <Link to="/leaderboard/stage-1">
          <button className="lb-button">Stage 1</button>
        </Link>
        <Link to="/leaderboard/stage-2">
          <button className="lb-button">Stage 2</button>
        </Link>
        <Link to="/leaderboard/stage-3">
          <button className="lb-button">Stage 3</button>
        </Link>
      </div>
    </div>
  );
}

export default LeaderboardHome;
