import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Import components
import Header from "./Components/Header";
import Starships from "./Views/Starships";
import StarshipInfo from "./Views/StarshipInfo";

function App() {
  return (
    <div>
      <Header />
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Starships />} />
          <Route path="/starship/:id" element={<StarshipInfo />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
