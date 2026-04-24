import React, { useState } from "react";
import { ImageUpload } from "./home";
import Navbar from "./Navbar";
import About from "./About";
import Contact from "./Contact";
import PotatoGuide from "./PotatoGuide";

function App() {
  const [activePage, setActivePage] = useState("Home");

  return (
    <div>
      <Navbar activePage={activePage} onNavChange={setActivePage} />
      {activePage === "Home" && <ImageUpload />}
      {activePage === "About" && <About />}
      {activePage === "PotatoGuide" && <PotatoGuide />}
      {activePage === "Contact" && <Contact />}
    </div>
  );
}

export default App;
