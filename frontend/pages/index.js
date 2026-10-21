import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Services from "../components/Services";
import Activites from "../components/Activites";

const FALLBACK_GARDERIE = {
  nom: "Ma Garderie",
  slogan: "",
  description: "Les informations sont momentanément indisponibles.",
  horaires: "",
  adresse: "",
  telephone: "",
  email: ""
};

export default function Home({ garderie, services, activites, backendOk }) {
  return (
    <>
      <Navbar nom={garderie.nom} />
      <main>
        {!backendOk && (
          <div className="alert">⚠️ Backend injoignable : données non chargées.</div>
        )}
        <Hero garderie={garderie} />
        <Services services={services} />
        <Activites activites={activites} />
      </main>
      <footer id="contact" className="footer">
        <div className="container">
          <p><strong>{garderie.nom}</strong></p>
          <p>{garderie.adresse} · {garderie.telephone} · {garderie.email}</p>
          <p className="copy">© {new Date().getFullYear()} {garderie.nom}</p>
        </div>
      </footer>
    </>
  );
}

// Les données sont récupérées côté serveur (dans le conteneur frontend)
// via le réseau Docker : http://backend:5000
export async function getServerSideProps() {
  const base = process.env.BACKEND_URL || "http://localhost:5000";
  try {
    const [g, s, a] = await Promise.all([
      fetch(`${base}/api/garderie`).then((r) => r.json()),
      fetch(`${base}/api/services`).then((r) => r.json()),
      fetch(`${base}/api/activites`).then((r) => r.json())
    ]);
    return { props: { garderie: g, services: s, activites: a, backendOk: true } };
  } catch (err) {
    console.error("Erreur backend :", err.message);
    return { props: { garderie: FALLBACK_GARDERIE, services: [], activites: [], backendOk: false } };
  }
}
