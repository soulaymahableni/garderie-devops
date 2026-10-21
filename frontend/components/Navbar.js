import { useState } from "react";

export default function Navbar({ nom = "Ma Garderie" }) {
  const [open, setOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="container navbar-inner">
        <a href="#accueil" className="brand">
          <span className="logo" aria-hidden="true">🧸</span>
          <span className="brand-name">{nom}</span>
        </a>

        <button
          className="menu-toggle"
          aria-label="Ouvrir le menu"
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>

        <ul className={`menu ${open ? "open" : ""}`}>
          <li><a href="#accueil" onClick={() => setOpen(false)}>Accueil</a></li>
          <li><a href="#services" onClick={() => setOpen(false)}>Services</a></li>
          <li><a href="#activites" onClick={() => setOpen(false)}>Activités</a></li>
          <li><a href="#contact" onClick={() => setOpen(false)}>Contact</a></li>
        </ul>
      </div>
    </nav>
  );
}
