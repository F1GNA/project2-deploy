import { useEffect, useState } from "react";
import { getEmployment } from "../api/ritApi";

export default function Employment() {
  const [emp, setEmp] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    getEmployment()
      .then(setEmp)
      .catch(() => setError("ERROR Check console"));
  }, []);

  // DataTables activation
  useEffect(() => {
    if (emp) {
      setTimeout(() => {
        if (window.$) {
          $("#coopTable").DataTable();
          $("#employmentTable").DataTable();
        }
      }, 0);
    }
  }, [emp]);

  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!emp) return <p>Loading...</p>;

  return (
    <section id="employment" className="section">
      <h2>Employment</h2>

      {/* INTRO */}
      <div className="emp-block">
        <h3>{emp.introduction.title}</h3>
        {emp.introduction.content.map((item, i) => (
          <p key={i}>{item.description}</p>
        ))}
      </div>

      {/* DEGREE STATS */}
      <div className="emp-block">
        <h3>{emp.degreeStatistics.title}</h3>
        <div className="stats-grid">
          {emp.degreeStatistics.statistics.map((s, i) => (
            <div key={i} className="stat-item">
              <strong>{s.value}</strong>
              <p>{s.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* EMPLOYERS */}
      <div className="emp-block">
        <h3>{emp.employers.title}</h3>
        <ul className="emp-list">
          {emp.employers.employerNames.map((e, i) => (
            <li key={i}>{e}</li>
          ))}
        </ul>
      </div>

      {/* CAREERS */}
      <div className="emp-block">
        <h3>{emp.careers.title}</h3>
        <ul className="emp-list">
          {emp.careers.careerNames.map((c, i) => (
            <li key={i}>{c}</li>
          ))}
        </ul>
      </div>

      {/* CO-OP TABLE */}
      <div className="emp-block">
        <h3>{emp.coopTable.title}</h3>

        <table id="coopTable" className="display">
          <thead>
            <tr>
              <th>Employer</th>
              <th>Degree</th>
              <th>City</th>
              <th>Term</th>
            </tr>
          </thead>
          <tbody>
            {emp.coopTable.coopInformation.map((row, i) => (
              <tr key={i}>
                <td>{row.employer}</td>
                <td>{row.degree}</td>
                <td>{row.city}</td>
                <td>{row.term}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* EMPLOYMENT TABLE */}
      <div className="emp-block">
        <h3>{emp.employmentTable.title}</h3>

        <table id="employmentTable" className="display">
          <thead>
            <tr>
              <th>Employer</th>
              <th>Degree</th>
              <th>City</th>
              <th>Job Title</th>
              <th>Start Date</th>
            </tr>
          </thead>
          <tbody>
            {emp.employmentTable.professionalEmploymentInformation.map((row, i) => (
              <tr key={i}>
                <td>{row.employer}</td>
                <td>{row.degree}</td>
                <td>{row.city}</td>
                <td>{row.title}</td>
                <td>{row.startDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </section>
  );
}
