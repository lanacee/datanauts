import { useEffect } from "react";
import "./App.css";

function App() {
  useEffect(() => {
    fetch("/api/pestTrap/")
      .then((response) => response.json())
      .then((data) => console.log("data fetched: ", data));
  }, []);

  return (
    <div className="App">
      <p>Hello world</p>
    </div>
  );
}

export default App;
