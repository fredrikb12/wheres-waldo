import { useEffect } from "react";
import { getImageData } from "./firebase";

function App() {
  useEffect(() => {
    getImageData().then((data) => {
      console.log(data);
    });
  });

  return <div className="App"></div>;
}

export default App;
