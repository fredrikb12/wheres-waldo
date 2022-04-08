import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getImageData } from "../firebase";

function Leaderboard() {
  const { stage } = useParams();
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    async function loadSubmissions() {
      const data = await getImageData(stage);
      const filtered = data.submissions.filter((item) => {
        return item.time < 20000;
      });
      filtered.sort((a, b) => a.time - b.time);
      setSubmissions([...filtered]);
    }
    loadSubmissions();
  }, [setSubmissions, stage]);
  return (
    <div className="leaderboard">
      <h1>
        {stage.split("-")[0].slice(0, 1).toUpperCase() +
          stage.split("-")[0].slice(1) +
          " " +
          stage.split("-")[1]}
      </h1>
      {submissions.length > 0 ? (
        submissions.map((submission) => {
          return (
            <div key={submission.id} className="leaderboard-item">
              <p>{submission.name}</p>
              <p>{(submission.time / 1000).toFixed(3)}s</p>
            </div>
          );
        })
      ) : (
        <h1>Leaderboards are loading...</h1>
      )}
    </div>
  );
}

export default Leaderboard;
