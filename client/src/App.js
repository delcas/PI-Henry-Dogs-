import "./App.css";
import { Route, Routes } from "react-router-dom";
import Init from "./components/Init/Init.jsx";
import Breeds from "./components/Breeds/Breeds.jsx"
import Id from "./components/Id/Id";

function App() {

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Init />} />
        <Route path="/home" element={<Breeds/>} />
        <Route path="/breed/:id" element={<Id/>} />
        <Route path="/create" />
        <Route path="/about" />
      </Routes>
    </div>
  );
}

export default App;
