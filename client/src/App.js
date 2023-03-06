import "./App.css";
import { Route, Routes } from "react-router-dom";
import LandingPage from "./components/LandingPage/LandingPage.jsx";
import Breeds from "./components/Breeds/Breeds.jsx";
import DetailId from "./components/DetailId/DetailId";
import Form from "./components/Form/Form";
import About from "./components/About/About";
import NotFound from "./components/NotFound/NotFound";
import axios from "axios";

axios.defaults.baseURL=`http://localhost:3001/`
// axios.defaults.baseURL=`https://pi-henry-dogs-production-484e.up.railway.app/`

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<Breeds />} />
        <Route path="/breed/:id" element={<DetailId />} />
        <Route path="/create" element ={<Form/>}/>
        <Route path="/about" element = {<About/>}/>
        <Route path="*" element = {<NotFound/>}/>
      </Routes>
    </div>
  );
}

export default App;
