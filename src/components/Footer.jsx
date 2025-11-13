import '../styles.css';
//Simple footer component (My name and project)
export default function Footer() {
  return (
    <footer className="footer">
      <p>© {new Date().getFullYear()} Project 2 - George Zenov</p>
    </footer>
  );
}
