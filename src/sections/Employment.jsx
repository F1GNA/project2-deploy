import { useEffect, useState } from "react";
import { getEmployment } from "../api/ritApi";

export default function Employment() {
  // store data
  const [emp, setEmp] = useState(null);
  const [error, setError] = useState("");
  const [openSection, setOpenSection] = useState(null);

  useEffect(() => {
    getEmployment()
      .then(setEmp)
      .catch(() => setError("ERROR Check console"));
  }, []);

  // open/close 
  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!emp) return <p>Loading...</p>;

  return (
    <section id="employment" className="section">
      <h2>Employment</h2>

      {/* INTRO*/}
      {emp.introduction && (
        <div className="emp-block">
          <button className="emp-header" onClick={() => toggleSection("intro")} >
            <h3>{emp.introduction.title}</h3>
            <span>{openSection === "intro" ? "▲" : "▼"}</span>
          </button>

          {/* Showing content if user clicked */}
          {openSection === "intro" && (
            <div className="emp-body">
              {emp.introduction.content.map((item, i) => (
                <p key={i}>{item.description}</p>
              ))}
            </div>
          )}
        </div>
      )}

      {/* DEGREE STAT*/}
      {emp.degreeStatistics && (
        <div className="emp-block">
          <button className="emp-header" onClick={() => toggleSection("stats")} >
            <h3>{emp.degreeStatistics.title}</h3>
            <span>{openSection === "stats" ? "▲" : "▼"}</span>
          </button>

          {openSection === "stats" && (
            <div className="emp-body stats-grid">
              {emp.degreeStatistics.statistics.map((stat, i) => (
                <div key={i} className="stat-item">
                  <strong>{stat.value}</strong>
                  <span>{stat.description}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* EMPLOYERS */}
      {emp.employers && (
        <div className="emp-block">
          <button className="emp-header" onClick={() => toggleSection("employers")} >
            <h3>{emp.employers.title}</h3>
            <span>{openSection === "employers" ? "▲" : "▼"}</span>
          </button>

          {openSection === "employers" && (
            <div className="emp-body">
              <ul className="emp-list">
                {emp.employers.employerNames.map((name, i) => (
                  <li key={i}>{name}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* CAREERS */}
      {emp.careers && (
        <div className="emp-block">
          <button className="emp-header" onClick={() => toggleSection("careers")} >
            <h3>{emp.careers.title}</h3>
            <span>{openSection === "careers" ? "▲" : "▼"}</span>
          </button>

          {openSection === "careers" && (
            <div className="emp-body">
              <ul className="emp-list">
                {emp.careers.careerNames.map((name, i) => (
                  <li key={i}>{name}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* COOP*/}
      {emp.coopTable && (
        <div className="emp-block">
          <button className="emp-header" onClick={() => toggleSection("coop")}>
            <h3>{emp.coopTable.title}</h3>
            <span>{openSection === "coop" ? "▲" : "▼"}</span>
          </button>

          {openSection === "coop" && (
            <div className="emp-body coop-table">
              {emp.coopTable.coopInformation.map((c, i) => (
                <div key={i} className="coop-row">
                  <p><strong>{c.employer}</strong> — {c.city}</p>
                  <p>{c.degree} ({c.term})</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </section>
  );
}
