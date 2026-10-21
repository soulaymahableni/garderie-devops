export default function Services({ services = [] }) {
  return (
    <section id="services" className="services">
      <div className="container">
        <h2>Nos services</h2>
        {services.length === 0 ? (
          <p className="empty">Aucun service disponible pour le moment.</p>
        ) : (
          <div className="grid">
            {services.map((s) => (
              <article key={s.id} className="card">
                <div className="card-icon" aria-hidden="true">{s.icone}</div>
                <h3>{s.titre}</h3>
                <p>{s.description}</p>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
