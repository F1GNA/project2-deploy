import { useEffect, useState } from "react";
import { getCourseById, getMinors } from "../api/ritApi";

export default function Minors() {
  // store data
  const [data, setData] = useState(null);
  const [expanded, setExpanded] = useState(null);
  const [courses, setCourses] = useState({});
  const [error, setError] = useState("");

  // load minors when component starts
  useEffect(() => {
    getMinors()
      .then(setData)
      .catch(() => setError("ERROR Check console"));
  }, []);

  // API structure is different sometimes, so we check both
  const minors = data?.UgMinors || data?.minors || [];

  // open/close
  const toggleMinor = async (minor) => {
    const name = minor.name;

    if (expanded === name) {
      setExpanded(null);
    } else {
      setExpanded(name);

      // if courses not loaded yet then it load them
      if (!courses[name]) {
        const loaded = [];

        // This section loading each course one by one by its ID
        for (const cid of minor.courses) {
          try {
            const course = await getCourseById(cid);
            loaded.push(course);
          } catch {
            console.log("Error loading course", cid);
          }
        }
        setCourses((prev) => ({ ...prev, [name]: loaded }));
      }
    }
  };

  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!data) return <p>Loading...</p>;

  return (
    <section id="minors" className="section">
      <h2>Minors</h2>

      {minors.map((m) => {
        const isOpen = expanded === m.name;
        const minorCourses = courses[m.name];

        return (
          <div key={m.name} className="emp-block">
            <button
              className="emp-header"
              onClick={() => toggleMinor(m)}
            >
              <h3>{m.title}</h3>
              <span>{isOpen ? "▲" : "▼"}</span>
            </button>

            {/* Minor Details if its open */}
            {isOpen && (
              <div className="emp-body">
                <p className="muted">{m.name}</p>
                <p>{m.description}</p>

                <h4>Courses</h4>
                {!minorCourses && <p>Loading courses...</p>}
                {minorCourses && (
                  <ul className="emp-list">
                    {minorCourses.map((c) => (
                      <li key={c.courseID}>
                        <strong>{c.title}</strong> ({c.courseID})
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>
        );
      })}
    </section>
  );
}
