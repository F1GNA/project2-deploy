import { useEffect, useState } from "react";
import { getDegrees } from "../api/ritApi";

export default function Degrees() {
  // Store degree data
  const [degrees, setDegrees] = useState(null);
  const [error, setError] = useState("");
  const [openSection, setOpenSection] = useState(null);

  // Load the degree info when the component loads
  useEffect(() => {
    getDegrees()
      .then(setDegrees)
      .catch(() => setError("ERROR Check console"));
  }, []);

  // Open/close option
  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!degrees) return <p>Loading...</p>;

  return (
    <section id="degrees" className="section">
      <h2>Degrees</h2>

      {/*UDERGRADUATE*/}
      <div className="emp-block">
        <button className="emp-header" onClick={() => toggleSection("undergrad")}>
          <h3>Undergraduate Programs</h3>
          <span>{openSection === "undergrad" ? "▲" : "▼"}</span> {/*Found this symbols on https://symbl.cc/ they are simple and cool*/}
        </button>

        {openSection === "undergrad" && (
          <div className="emp-body">
            {degrees.undergraduate.map((deg) => (
              <div key={deg.degreeName} className="degree-card">
                <h4>{deg.title}</h4>
                <p className="muted">{deg.degreeName.toUpperCase()}</p>
                <p>{deg.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/*GRADUATE*/}
      <div className="emp-block">
        <button className="emp-header" onClick={() => toggleSection("graduate")}>
          <h3>Graduate Programs</h3>
          <span>{openSection === "graduate" ? "▲" : "▼"}</span>
        </button>

        {openSection === "graduate" && (
          <div className="emp-body">
            {degrees.graduate
              .filter((deg) => deg.degreeName.toLowerCase() !== "graduate advanced certificates")
              .map((deg) => (
                <div key={deg.degreeName} className="degree-card">
                  <h4>{deg.title}</h4>
                  <p className="muted">{deg.degreeName.toUpperCase()}</p>
                  <p>{deg.description}</p>
                </div>
              ))}
          </div>
        )}
      </div>
    </section>
  );
}
