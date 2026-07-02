// Texte français. Terminologie vérifiée : DORIS (FFESSM), INPN, FishBase, Wikipédia.
// NB : en français « raie » désigne aussi bien les skates que les rays anglais ;
// les trois options sont donc distinguées par « raie vraie / pastenague / raie aigle ».
export default {
  lang: "fr",
  htmlLang: "fr",
  siteUrl: "https://ray.snownamida.top/fr/",

  appTitle: "Reconnaître les raies",
  question: "Observe le corps et la queue — laquelle est-ce ?",
  imgAlt: "Une raie, pastenague ou raie aigle à identifier",
  bestTitle: "Meilleure série",
  correctTitle: "Bonnes réponses",
  scoreBar: (c, t, a) => `Cette partie : ${c}/${t} · ${a}% de réussite`,
  kofi: "☕ Offrez-moi un café",

  correct: "Correct !",
  wrong: "Raté…",
  share: "Partager",
  why: (name) => `Pourquoi est-ce une ${name} ?`,
  next: "Suivant",
  celebrateBig: "BRAVO !",
  celebrateSmall: "Bien vu !",

  copied: "Score copié dans le presse-papiers !",
  copyFail: "Échec de la copie — partagez manuellement 😢",
  shareTitle: "Raie, pastenague ou raie aigle",
  shareText: (c, t, a, best) =>
    `J'ai fait ${c}/${t} (${a}%) au quiz des raies, meilleure série ${best} ! Sauras-tu distinguer raie, pastenague et raie aigle ? 🐟`,

  species: {
    skate: {
      name: "Raie vraie (Rajidés)",
      simpleName: "Raie vraie",
      desc: "Poisson plat en losange, souvent confondu avec la pastenague. Le détail qui tranche : une queue courte, épaisse et charnue, sans aiguillon venimeux — elle se défend avec des épines émoussées (boucles) et porte souvent deux petites nageoires dorsales vers le bout. Ovipare (les « bourses de sirène »).",
    },
    stingray: {
      name: "Pastenague (Dasyatidés)",
      simpleName: "Pastenague",
      desc: "Posée elle aussi sur le fond, mais sa queue fine et effilée en fouet la trahit : elle est armée d'un ou plusieurs aiguillons dentelés et venimeux. Nageoire dorsale réduite ou absente. Vivipare : elle met bas des petits déjà formés.",
    },
    eagleray: {
      name: "Raie aigle / aigle de mer (Myliobatidés)",
      simpleName: "Raie aigle",
      desc: "Ne rase pas le fond : elle « vole » en pleine eau en battant ses pectorales pointues, comme un oiseau sous-marin. Signe distinctif : une tête proéminente, prolongée par un museau bombé en bec. La plupart gardent un aiguillon venimeux à la base de la queue.",
    },
  },
};
