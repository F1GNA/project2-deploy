import { useEffect, useState } from "react";
import { getCourseById, getMinors } from "../api/ritApi";

export default function Minors() {
  const [data, setData] = useState(null);
  const [expanded, setExpanded] = useState(null);
  const [courses, setCourses] = useState({});
  const [error, setError] = useState("");

  // modal data
  const [selectedCourse, setSelectedCourse] = useState(null);

  // load minors
  useEffect(() => {
    getMinors()
      .then(setData)
      .catch(() => setError("ERROR Check console"));
  }, []);

  // API differences
  const minors = data?.UgMinors || data?.minors || [];

  // expand block + load courses
  const toggleMinor = async (minor) => {
    const name = minor.name;

    if (expanded === name) {
      setExpanded(null);
    } else {
      setExpanded(name);

      if (!courses[name]) {
        const loaded = [];

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

  // click course - opens card
  const openCourse = (course) => {
    setSelectedCourse(course);
  };

  const closeModal = () => setSelectedCourse(null);

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
            <button className="emp-header" onClick={() => toggleMinor(m)}>
              <h3>{m.title}</h3>
              <span>{isOpen ? "▲" : "▼"}</span>
            </button>

            {isOpen && (
              <div className="emp-body">
                <p className="muted">{m.name}</p>
                <p>{m.description}</p>

                <h4>Courses</h4>

                {!minorCourses && <p>Loading courses...</p>}

                {minorCourses && (
                  <ul className="emp-list">
                    {minorCourses.map((c) => (
                      <li
                        key={c.courseID}
                        className="course-link"
                        style={{ cursor: "pointer", color: "#c75300" }}
                        onClick={() => openCourse(c)}
                      >
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

      {/* Info card */}
      {selectedCourse && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={closeModal}>X</button>

            <h3>{selectedCourse.title}</h3>
            <p><strong>ID:</strong> {selectedCourse.courseID}</p>
            <p>{selectedCourse.description}</p>
          </div>
        </div>
      )}
    </section>
  );
}
