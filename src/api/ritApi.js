// Base API URL (NO more hardcode YAY \o/)
const BASE_URL = "https://people.rit.edu/~dsbics/proxy/https://ischool.gccis.rit.edu/api/";

async function fetchJson(endpoint) {
  const res = await fetch(BASE_URL + endpoint);

  if (!res.ok) {
    // If the response is not OK... DENIED!
    throw new Error(`Error loading ${endpoint}: ${res.status}`);
  }

  return res.json();
}

export function api(endpoint) {
  return fetchJson(endpoint);
}

export function getAbout() {
  return api("about/");
}

export function getDegrees() {
  return api("degrees/");
}

export function getMinors() {
  return api("minors/");
}

export function getEmployment() {
  return api("employment/");
}

export function getPeople() {
  return api("people/");
}

export function getCourseById(courseId) {
  return api(`course/courseID=${courseId}`);
}
