export default function Hero({ garderie }) {
  return (
    <section id="accueil" className="hero">
      <div className="container hero-inner">
        <div className="hero-text">
          <h1>Bienvenue à {garderie.nom}</h1>
          <p className="slogan">{garderie.slogan}</p>
          <p>{garderie.description}</p>
          <div className="hero-infos">
            <span>🕒 {garderie.horaires}</span>
            <span>📍 {garderie.adresse}</span>
          </div>
          <a href="#services" className="btn">Découvrir nos services</a>
        </div>
        <div className="hero-image">
          <img src="/hero.svg" alt="Enfants qui jouent à la garderie" />
        </div>
      </div>
    </section>
  );
}
