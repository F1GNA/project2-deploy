import { useEffect, useState } from "react";
import { getAbout } from "../api/ritApi";

export default function About() {
  // Store the about data from the API
  const [about, setAbout] = useState(null);
  const [error, setError] = useState("");

  // Load the "About" data
  useEffect(() => { getAbout()
      .then(setAbout)          // Saving the data
      .catch(() => setError("ERROR check console")); //ERROR :(
  }, []);

  return (
    <section id="about" className="section">
      <h2>About</h2>
      {error && <p>{error}</p>}
      {!about && !error && <p>Loading...</p>}
      {about && (
        <>
          <p>{about.description}</p>
          {about.quote && (
            <blockquote>
              “{about.quote}” — {about.quoteAuthor}
            </blockquote>
          )}
        </>
      )}
    </section>
  );
}
