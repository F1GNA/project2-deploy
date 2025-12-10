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

  // Extract advanced certificates
  const advancedCerts =
    degrees.graduate?.find(
      (d) =>
        d.degreeName.toLowerCase().includes("advanced certificates") ||
        d.availableCertificates
    )?.availableCertificates || [];

  return (
    <section id="degrees" className="section">
      <h2>Degrees</h2>

      {/*UNDERGRADUATE*/}
      <div className="emp-block">
        <button className="emp-header" onClick={() => toggleSection("undergrad")}>
          <h3>Undergraduate Programs</h3>
          <span>{openSection === "undergrad" ? "▲" : "▼"}</span> 
          {/* these symbols are clean and simple */}
        </button>

        {openSection === "undergrad" && (
          <div className="emp-body">
            {degrees.undergraduate.map((deg) => (
              <div key={deg.degreeName} className="degree-card">
                <h4>{deg.title}</h4>
                <p className="muted">{deg.degreeName.toUpperCase()}</p>
                <p>{deg.description}</p>

                {/* Show Concentrations */}
                {deg.concentrations && deg.concentrations.length > 0 && (
                  <>
                    <h5>Concentrations:</h5>
                    <ul className="emp-list">
                      {deg.concentrations.map((c) => (
                        <li key={c}>{c}</li>
                      ))}
                    </ul>
                  </>
                )}
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
              .filter(
                (deg) =>
                  !deg.degreeName
                    .toLowerCase()
                    .includes("advanced certificates")
              )
              .map((deg) => (
                <div key={deg.degreeName} className="degree-card">
                  <h4>{deg.title}</h4>
                  <p className="muted">{deg.degreeName.toUpperCase()}</p>
                  <p>{deg.description}</p>

                  {/* Show Concentrations */}
                  {deg.concentrations && deg.concentrations.length > 0 && (
                    <>
                      <h5>Concentrations:</h5>
                      <ul className="emp-list">
                        {deg.concentrations.map((c) => (
                          <li key={c}>{c}</li>
                        ))}
                      </ul>
                    </>
                  )}
                </div>
              ))}
          </div>
        )}
      </div>

      {/* certificates */}
      <div className="emp-block">
        <button className="emp-header" onClick={() => toggleSection("certs")}>
          <h3>Graduate Advanced Certificates</h3>
          <span>{openSection === "certs" ? "▲" : "▼"}</span>
        </button>

        {openSection === "certs" && (
          <div className="emp-body">
            {advancedCerts.length > 0 ? (
              <ul className="emp-list">
                {advancedCerts.map((cert) => (
                  <li key={cert}>{cert}</li>
                ))}
              </ul>
            ) : (
              <p>No advanced certificates found.</p>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
