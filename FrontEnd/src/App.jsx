import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import HomePage from "./components/HomePage";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="app">
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* <Route path="/Pagina" element={<Pagina />} /> */}
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
