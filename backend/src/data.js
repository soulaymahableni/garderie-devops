const garderie = {
  nom: "Ma Garderie",
  slogan: "Un lieu où chaque enfant grandit en s'amusant",
  description:
    "Ma Garderie accueille les enfants de 3 mois à 6 ans dans un cadre chaleureux, sécurisé et stimulant, avec une équipe d'éducatrices diplômées.",
  adresse: "12 Rue des Jasmins, Tunis",
  telephone: "+216 71 000 000",
  email: "contact@ma-garderie.tn",
  horaires: "Lundi - Samedi : 7h00 - 18h00",
  capacite: 60
};

const services = [
  { id: 1, titre: "Crèche (3 mois - 2 ans)", description: "Accueil des tout-petits avec un rythme respecté : repas, siestes et éveil sensoriel.", icone: "🍼" },
  { id: 2, titre: "Jardin d'enfants (3 - 6 ans)", description: "Préparation à l'école : langage, graphisme, mathématiques ludiques.", icone: "🎒" },
  { id: 3, titre: "Restauration saine", description: "Repas équilibrés préparés chaque jour sur place.", icone: "🥗" },
  { id: 4, titre: "Transport scolaire", description: "Ramassage et retour des enfants en toute sécurité.", icone: "🚌" },
  { id: 5, titre: "Suivi médical", description: "Visites régulières d'un pédiatre partenaire.", icone: "🩺" },
  { id: 6, titre: "Garde périscolaire", description: "Accueil après l'école et pendant les vacances.", icone: "🏠" }
];

const activites = [
  { id: 1, nom: "Peinture et dessin", jour: "Lundi", age: "2 - 6 ans" },
  { id: 2, nom: "Musique et chant", jour: "Mardi", age: "1 - 6 ans" },
  { id: 3, nom: "Éveil à l'anglais", jour: "Mercredi", age: "3 - 6 ans" },
  { id: 4, nom: "Jeux de plein air", jour: "Jeudi", age: "2 - 6 ans" },
  { id: 5, nom: "Heure du conte", jour: "Vendredi", age: "1 - 6 ans" },
  { id: 6, nom: "Petits jardiniers", jour: "Samedi", age: "3 - 6 ans" }
];

module.exports = { garderie, services, activites };
