import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./page/home";
import Contact from "./page/contact";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
            <Route  path="/" index element={<Home />} />
            
            <Route path="contact" element={<Contact />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
