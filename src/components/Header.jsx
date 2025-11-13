import '../styles.css';
import Nav from "./Nav";
//Header with state recording navigation
export default function Header({ onNavigate }) {
  return (
    <header className="header">
      <h1>RIT iSchool</h1>
      <br></br>
      <Nav onNavigate={onNavigate} />
    </header>
  );
}
