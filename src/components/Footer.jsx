import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__logo">BSM.</div>
        <p className="footer__copy">
          Designed & built by <span>Bhavani Sankar Mekala</span> · 2025
        </p>
        <p className="footer__stack">Built with React · Three.js · Framer Motion</p>
      </div>
    </footer>
  );
}
