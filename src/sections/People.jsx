import { useEffect, useState } from "react";
import { getPeople } from "../api/ritApi";

export default function People() {
  // store data
  const [people, setPeople] = useState(null);
  const [error, setError] = useState("");
  const [selected, setSelected] = useState(null);

  // load people on start
  useEffect(() => {
    getPeople()
      .then(setPeople)
      .catch(() => setError("ERROR Check console"));
  }, []);

  // modal struct
  const openModal = (person) => setSelected(person);
  const closeModal = () => setSelected(null);

  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!people) return <p>Loading...</p>;

  return (
    <section id="people" className="section">
      <h2>People</h2>

      {/* FACULTY */}
      <div className="emp-block">
        <button className="emp-header">
          <h3>Faculty</h3>
        </button>
        <div className="emp-body">
          <div className="people-grid">
            {people.faculty?.map((p) => (
              <div
                key={p.username}
                className="person-card"
                onClick={() => openModal(p)}
              >
                <img src={p.imagePath} alt={p.name} />
                <h4>{p.name}</h4>
                <p className="muted">{p.title}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* STAFF */}
      <div className="emp-block">
        <button className="emp-header">
          <h3>Staff</h3>
        </button>
        <div className="emp-body">
          <div className="people-grid">
            {people.staff?.map((p) => (
              <div
                key={p.username}
                className="person-card"
                onClick={() => openModal(p)}
              >
                <img src={p.imagePath} alt={p.name} />
                <h4>{p.name}</h4>
                <p className="muted">{p.title}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Coolest part, i made this section as you showed on lecture, it shows all contact info about each person if they have it */}
      {selected && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={closeModal}>X</button>

            <img src={selected.imagePath} alt={selected.name} className="modal-img" />
            <h3>{selected.name}</h3>
            <p>{selected.title}</p>

            {selected.office && <p><b>Office:</b> {selected.office}</p>}
            {selected.phone && <p><b>Phone:</b> {selected.phone}</p>}

            {selected.email && (
              <p><b>Email:</b> <a href={`mailto:${selected.email}`}>{selected.email}</a></p>
            )}

            {selected.website && (
              <p><b>Website:</b> <a href={selected.website} target="_blank" rel="noreferrer">{selected.website}</a></p>
            )}

            {selected.twitter && (
              <p><b>Twitter:</b> <a href={selected.twitter} target="_blank" rel="noreferrer">{selected.twitter}</a></p>
            )}

            {selected.facebook && (
              <p><b>Facebook:</b> <a href={selected.facebook} target="_blank" rel="noreferrer">{selected.facebook}</a></p>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
