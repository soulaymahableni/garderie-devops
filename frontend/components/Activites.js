export default function Activites({ activites = [] }) {
  if (activites.length === 0) return null;
  return (
    <section id="activites" className="activites">
      <div className="container">
        <h2>Nos activités</h2>
        <ul className="activites-list">
          {activites.map((a) => (
            <li key={a.id}>
              <strong>{a.nom}</strong>
              <span>{a.jour} · {a.age}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
