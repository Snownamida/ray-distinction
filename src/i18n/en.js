// English copy. Terminology verified against Florida Museum, FishBase, Wikipedia.
export default {
  lang: "en",
  htmlLang: "en",
  siteUrl: "https://ray.snownamida.top/en/",

  appTitle: "Ray Identifier",
  question: "Look at the body and tail — which one is it?",
  imgAlt: "A skate, stingray or eagle ray to identify",
  bestTitle: "Best streak",
  correctTitle: "Correct this round",
  scoreBar: (c, t, a) => `This round: ${c}/${t} · ${a}% correct`,
  kofi: "☕ Buy me a coffee",

  correct: "Correct!",
  wrong: "Not quite…",
  share: "Share",
  why: (name) => `Why is it a ${name}?`,
  next: "Next",
  celebrateBig: "SPOT ON!",
  celebrateSmall: "Nice work!",

  copied: "Score copied to clipboard!",
  copyFail: "Couldn't copy — please share manually 😢",
  shareTitle: "Skate vs Stingray vs Eagle Ray",
  shareText: (c, t, a, best) =>
    `I scored ${c}/${t} (${a}%) on the Ray ID quiz, best streak ${best}! Can you tell a skate from a stingray? 🐟`,

  species: {
    skate: {
      name: "Skate (Rajidae)",
      simpleName: "Skate",
      desc: "Diamond-shaped bottom-dweller, often mistaken for a stingray. The giveaway is the tail: short, thick and fleshy, with no venomous spine — it defends itself with blunt thorns and usually has two small dorsal fins near the tip. Egg-laying (the “mermaid's purse”).",
    },
    stingray: {
      name: "Stingray (Dasyatidae)",
      simpleName: "Stingray",
      desc: "Also lies flat on the seabed, but its tail is long, thin and whip-like, armed with one or more serrated, venomous spines. Dorsal fin reduced or absent. Gives birth to live young rather than laying eggs.",
    },
    eagleray: {
      name: "Eagle ray (Myliobatidae)",
      simpleName: "Eagle ray",
      desc: "Doesn't hug the bottom — it “flies” through open water, beating pointed, wing-like fins like an underwater bird. Tell-tale feature: a distinct, protruding duck-bill head. Most carry a venomous tail spine. (Its cousin the manta, family Mobulidae, filter-feeds and has no sting.)",
    },
  },
};
