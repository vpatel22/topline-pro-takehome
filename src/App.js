import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./components/HomePage";
import ImageDetails from "./components/ImageDetails";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <div>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/images/:imageId" element={<ImageDetails />} />
            <Route path="*" element={<h1>This page does not exist</h1>} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
