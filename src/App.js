import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Data from "./page/data";
import Form from "./page/form";
import Home from "./page/home"

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" index element={<Home />} />
          <Route path="/table" element={<Data />} />
          <Route path="form" element={<Form />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
