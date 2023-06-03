import { useState } from "react";
import "./App.scss";
import Board from "./Pages/Board";
import Start from "./Pages/Start";

const App = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [setupData, setSetupData] = useState({ width: 10, height: 10, mines: 10 });
  const handleSetDate = (data) => {
    console.log("data", data);
    setSetupData(data);
    setGameStarted(true);
  };
  if (!gameStarted) return <Start handleSetDate={handleSetDate} />;
  return <Board setupData={setupData} setGameStarted={setGameStarted} />;
};

export default App;
