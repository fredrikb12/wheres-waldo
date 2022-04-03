import { useEffect } from "react";
import GameImage from "./components/GameImage";
import { getImageData } from "./firebase";

function App() {

  useEffect(() => {
    async function setData() {
      const data = await getImageData("stage-1");
      console.log(data);
    }
    setData();
  });

  return (
    <div className="App">
      <GameImage />
    </div>
  );
}

export default App;
