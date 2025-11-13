import { useState } from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";

import About from "./sections/About";
import Degrees from "./sections/Degrees";
import Employment from "./sections/Employment";
import Minors from "./sections/Minors";
import People from "./sections/People";

export default function App() {
  // recording which section is active
  const [activeSection, setActiveSection] = useState("about");

  // change section state when user clics navigation button
  const handleNavClick = (section) => {
    setActiveSection(section);
  };

  return (
    <>
      {/* header contains navigation */}
      <Header onNavigate={handleNavClick} />

      {/* It shows only active section so sections can change each other */}
      <main className="content-area">
        {activeSection === "about" && <About />}
        {activeSection === "degrees" && <Degrees />}
        {activeSection === "minors" && <Minors />}
        {activeSection === "employment" && <Employment />}
        {activeSection === "people" && <People />}
      </main>

      {/* Aaaand footer ofc */}
      <Footer />
    </>
  );
}
