// Function to fetch JSON data from a given URL
async function fetchJson(url) {
  const res = await fetch(url);
  if (!res.ok) {
    // If the response is not OK... DENIED!
    throw new Error(`Error loading ${url}: ${res.status}`);
  }
  return res.json();
}

// Get About Section
export function getAbout() {
  return fetchJson("https://people.rit.edu/~dsbics/proxy/https://ischool.gccis.rit.edu/api/about/");
}

// Get Degrees Section
export function getDegrees() {
  return fetchJson("https://people.rit.edu/~dsbics/proxy/https://ischool.gccis.rit.edu/api/degrees/");
}

// Get Minors Section
export function getMinors() {
  return fetchJson("https://people.rit.edu/~dsbics/proxy/https://ischool.gccis.rit.edu/api/minors/");
}

// Get Employment Section
export function getEmployment() {
  return fetchJson("https://people.rit.edu/~dsbics/proxy/https://ischool.gccis.rit.edu/api/employment/");
}

// Get People Section
export function getPeople() {
  return fetchJson("https://people.rit.edu/~dsbics/proxy/https://ischool.gccis.rit.edu/api/people/");
}

// Get Course Section. But only by ID
export function getCourseById(courseId) {
  return fetchJson(`https://people.rit.edu/~dsbics/proxy/https://ischool.gccis.rit.edu/api/course/courseID=${courseId}`);
}
