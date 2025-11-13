import '../styles.css';
//this is list of navigation sections
const links = [
  { id: "about", label: "About" },
  { id: "degrees", label: "Degrees" },
  { id: "minors", label: "Minors" },
  { id: "employment", label: "Employment" },
  { id: "people", label: "People" },
];
//I made a loop to create buttons for each section
export default function Nav({ onNavigate }) {
  return (
    <nav className="nav">
      {links.map((link) => (
        <button key={link.id} className="nav-btn" onClick={() => onNavigate(link.id)} >
          {link.label}
        </button>
//When button is clicked, it calls onNavigate with the section and changing it state
      ))}
    </nav>
  );
}
