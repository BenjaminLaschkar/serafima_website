export type Role = {
  composer: string;
  work: string;
  role: string;
  language: "FR" | "IT" | "DE" | "RU" | "EN" | "LA" | "GE";
  category:
    | "Prêt à présenter"
    | "En préparation"
    | "Art Song"
    | "En russe"
    | "Spécialité"
    | "Répertoire de niche";
  note?: string;
};

export const repertoire: Role[] = [
  // 1. Prêt à présenter (performed and ready)
  { composer: "G. F. Haendel", work: "Armida", role: "Rinaldo", language: "IT", category: "Prêt à présenter" },
  { composer: "G. F. Haendel", work: "Alcina", role: "Alcina", language: "IT", category: "Prêt à présenter" },
  { composer: "W. A. Mozart", work: "Così fan tutte", role: "Fiordiligi", language: "IT", category: "Prêt à présenter" },
  { composer: "G. Puccini", work: "La Bohème", role: "Musetta", language: "IT", category: "Prêt à présenter" },
  { composer: "V. Bellini", work: "I Capuleti e i Montecchi", role: "Giulietta", language: "IT", category: "Prêt à présenter" },
  { composer: "G. Puccini", work: "La Bohème", role: "Mimì", language: "IT", category: "Prêt à présenter" },

  // 2. En préparation (almost ready + in preparation, merged)
  { composer: "G. Donizetti", work: "L'elisir d'amore", role: "Adina", language: "IT", category: "En préparation" },
  { composer: "W. A. Mozart", work: "Le nozze di Figaro", role: "Susanna", language: "IT", category: "En préparation" },
  { composer: "W. A. Mozart", work: "Don Giovanni", role: "Zerlina", language: "IT", category: "En préparation" },
  { composer: "B. Britten", work: "A Midsummer Night's Dream", role: "Helena", language: "EN", category: "En préparation" },
  { composer: "C. Monteverdi", work: "L'incoronazione di Poppea", role: "Drusilla", language: "IT", category: "En préparation" },
  { composer: "W. A. Mozart", work: "Idomeneo", role: "Ilia", language: "IT", category: "En préparation" },
  { composer: "N. Rimski-Korsakov", work: "Sadko", role: "Volkhova", language: "RU", category: "En préparation" },
  { composer: "J. Massenet", work: "Manon", role: "Manon", language: "FR", category: "En préparation" },
  { composer: "W. A. Mozart", work: "Die Zauberflöte", role: "Pamina", language: "DE", category: "En préparation" },
  { composer: "G. Puccini", work: "Gianni Schicchi", role: "Lauretta", language: "IT", category: "En préparation" },
  { composer: "E. Humperdinck", work: "Hänsel und Gretel", role: "Gretel", language: "DE", category: "En préparation" },
  { composer: "G. Bizet", work: "Carmen", role: "Micaëla", language: "FR", category: "En préparation" },

  // 3. Art Song / Mélodie / Oratorio
  { composer: "J. S. Bach", work: "Magnificat", role: "Quia respexit", language: "LA", category: "Art Song" },
  { composer: "H. Purcell", work: "The Blessed Virgin's Expostulation", role: "See, even Night herself", language: "EN", category: "Art Song" },
  { composer: "G. B. Pergolesi", work: "Se tu m'ami", role: "Soprano", language: "IT", category: "Art Song" },
  { composer: "A. Scarlatti", work: "Sento nel core", role: "Soprano", language: "IT", category: "Art Song" },
  { composer: "A. Scarlatti", work: "O cessate di piagarmi", role: "Soprano", language: "IT", category: "Art Song" },
  { composer: "G. B. Pergolesi", work: "Stabat Mater", role: "Cuius animam gementem", language: "LA", category: "Art Song" },
  { composer: "G. B. Pergolesi", work: "Stabat Mater", role: "Vidit suum", language: "LA", category: "Art Song" },
  { composer: "F. Poulenc", work: "Banalités", role: "L'Hôtel", language: "FR", category: "Art Song" },
  { composer: "N. Rimski-Korsakov", work: "Plenivshis Rozoi Solovei", role: "Soprano", language: "RU", category: "Art Song" },
  { composer: "S. Rachmaninov", work: "Zdes' khorosho", role: "Soprano", language: "RU", category: "Art Song" },
  { composer: "S. Rachmaninov", work: "Siren'", role: "Soprano", language: "RU", category: "Art Song" },
  { composer: "S. Rachmaninov", work: "Son", role: "Soprano", language: "RU", category: "Art Song" },
  { composer: "M. Balakirev", work: "Ne poi, krasavitsa, pri mne", role: "Soprano", language: "RU", category: "Art Song" },
  { composer: "C. Debussy", work: "Fêtes galantes", role: "Fantoches", language: "FR", category: "Art Song" },
  { composer: "C. Debussy", work: "Fêtes galantes", role: "Nuit d'étoiles", language: "FR", category: "Art Song" },
  { composer: "C. Debussy", work: "Mélodies", role: "Rondeau", language: "FR", category: "Art Song" },
  { composer: "C. Reinecke", work: "Die wilden Schwäne", role: "Elfriedens Gruß", language: "DE", category: "Art Song" },
  { composer: "F. Schubert", work: "Mélodies", role: "Ich schleiche bang und still herum", language: "DE", category: "Art Song" },
  { composer: "G. Bizet", work: "Mélodies", role: "Guitare", language: "FR", category: "Art Song" },
  { composer: "N. Rimski-Korsakov", work: "Na kholmakh Gruzii", role: "Soprano", language: "RU", category: "Art Song" },
  { composer: "F. Mompou", work: "Combat del somni", role: "L'insinuant", language: "FR", category: "Art Song" },
  { composer: "F. Mompou", work: "Combat del somni", role: "Le sylphe", language: "FR", category: "Art Song" },
  { composer: "F. Mompou", work: "Combat del somni", role: "Les pas", language: "FR", category: "Art Song" },

  // 4. Répertoire en russe (langue maternelle)
  { composer: "N. Rimski-Korsakov", work: "Snegurotchka", role: "Snegurotchka", language: "RU", category: "En russe" },
  { composer: "J. Strauss II", work: "Die Fledermaus", role: "Rosalinde (en russe)", language: "RU", category: "En russe" },
  { composer: "B. Britten", work: "A Midsummer Night's Dream", role: "Helena (en russe)", language: "RU", category: "En russe" },
  { composer: "N. Rimski-Korsakov", work: "Sadko", role: "Volkhova", language: "RU", category: "En russe" },

  // 5. Répertoire de spécialité
  { composer: "Z. Paliashvili", work: "Abessalom et Eteri", role: "Marikh Stela", language: "GE", category: "Spécialité", note: "Teatro Massimo Bellini de Catane · 2024" },

  // 6. Répertoire de niche (+ Britten Midsummer contemporain)
  { composer: "B. Britten", work: "A Midsummer Night's Dream", role: "Helena", language: "EN", category: "Répertoire de niche" },
  { composer: "G. F. Haendel", work: "Armida", role: "Rinaldo", language: "IT", category: "Répertoire de niche" },
  { composer: "G. F. Haendel", work: "Alcina", role: "Alcina", language: "IT", category: "Répertoire de niche" },
  { composer: "W. A. Mozart", work: "Le nozze di Figaro", role: "Susanna", language: "IT", category: "Répertoire de niche" },
  { composer: "W. A. Mozart", work: "Don Giovanni", role: "Zerlina", language: "IT", category: "Répertoire de niche" },
  { composer: "W. A. Mozart", work: "Idomeneo", role: "Ilia", language: "IT", category: "Répertoire de niche" },
  { composer: "N. Rimski-Korsakov", work: "Sadko", role: "Volkhova", language: "RU", category: "Répertoire de niche" },
  { composer: "G. Bizet", work: "Carmen", role: "Micaëla", language: "FR", category: "Répertoire de niche" },
];

export const categories = [
  "Tous",
  "Prêt à présenter",
  "En préparation",
  "Art Song",
  "En russe",
  "Spécialité",
  "Répertoire de niche",
] as const;

// RU first, Latin (LA) at end
export const languages = ["Toutes", "RU", "FR", "IT", "DE", "EN", "GE", "LA"] as const;
