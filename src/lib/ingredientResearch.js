// Scientific research notes for known ingredients.
// Keyed by the normalized ingredient name (the part before the dose).
export const INGREDIENT_RESEARCH = {
  "l-citrulline": {
    name: "L-Citrulline",
    note: "L-Citrulline is converted to L-arginine in the kidneys, raising plasma arginine and nitric oxide production more effectively than arginine itself, supporting blood flow and vascular function.",
    ref: "Curis et al., J Nutr. 2007; Schwedhelm et al., Am J Physiol.",
  },
  "l-arginine": {
    name: "L-Arginine",
    note: "L-Arginine is the direct substrate for nitric oxide synthase, supporting nitric oxide production, vasodilation and blood flow — often paired with citrulline to sustain elevated plasma arginine levels.",
    ref: "Bode-Böger et al., Nutr Rev. 2006; McConell, Curr Opin Clin Nutr Metab Care.",
  },
  "beta-alanine": {
    name: "Beta-Alanine",
    note: "Beta-alanine is the rate-limiting precursor to carnosine. Sustained supplementation raises muscle carnosine, which buffers hydrogen ions during high-intensity exercise and delays neuromuscular fatigue.",
    ref: "Hill et al., Amino Acids. 2007; Derave et al., J Appl Physiol.",
  },
  "taurine": {
    name: "Taurine",
    note: "Taurine is an abundant amino acid in skeletal muscle with roles in calcium handling and membrane stabilisation. Supplementation has been associated with improved exercise capacity and reduced oxidative stress.",
    ref: "Waldman et al., Sports Med. 2018.",
  },
  "l-tyrosine": {
    name: "L-Tyrosine",
    note: "Tyrosine is a catecholamine precursor. Acute supplementation helps preserve cognitive performance and working memory under acute stress such as sleep deprivation and high cognitive load.",
    ref: "Young, J Psychiatr Res.; Deijen & Orlebeke, Brain Res Bull.",
  },
  "caffeine anhydrous": {
    name: "Caffeine Anhydrous",
    note: "Caffeine antagonises adenosine receptors, reducing perceived exertion and improving reaction time, focus and endurance performance. Effects are dose-dependent and well-established in controlled trials.",
    ref: "Goldstein et al., Int J Sport Nutr Exerc Metab. 2010.",
  },
  "caffeine": {
    name: "Caffeine",
    note: "Caffeine antagonises adenosine receptors, reducing perceived exertion and improving reaction time, focus and endurance performance.",
    ref: "Goldstein et al., Int J Sport Nutr Exerc Metab. 2010.",
  },
  "pine bark extract": {
    name: "Pine Bark Extract",
    note: "Standardised pine bark extract is rich in proanthocyanidins. It supports endothelial function and nitric oxide availability, complementing citrulline for circulatory support.",
    ref: "Drechsel et al., Hypertens Res. 2008.",
  },
  "black maca": {
    name: "Black Maca",
    note: "Black maca (Lepidium meyenii) has been studied for its effects on energy, stamina and male vitality, with preclinical and small human trials supporting adaptogenic and performance benefits.",
    ref: "Gonzales et al., Andrologia.",
  },
  "panax ginseng": {
    name: "Panax Ginseng",
    note: "Panax ginseng ginsenosides modulate the HPA axis and nitric oxide pathways. Supplementation is associated with reduced fatigue and improved subjective vitality in controlled studies.",
    ref: "Kim et al., J Ginseng Res. 2013.",
  },
  "premium protein blend": {
    name: "Premium Protein Blend",
    note: "Supplementing with ~20–40 g of high-quality protein post-exercise supports muscle protein synthesis. The International Society of Sports Nutrition recommends 1.4–2.0 g/kg/day for athletes.",
    ref: "Jäger et al., J Int Soc Sports Nutr. 2017.",
  },
  "l-theanine": {
    name: "L-Theanine",
    note: "L-Theanine is an amino acid found in tea leaves, commonly paired with caffeine in pre-workout formulas. Research suggests the combination supports focus and attention while smoothing out the jittery edge of stimulants alone.",
    ref: "Haskell et al., Biol Psychol. 2008 (L-theanine and caffeine combination on cognition).",
  },
  "maltodextrin": {
    name: "Maltodextrin",
    note: "Maltodextrin is a fast-digesting carbohydrate derived from starch. It empties from the stomach quickly and is readily absorbed, making it a practical fuel source around training and a common choice for supporting muscle glycogen replenishment after exercise.",
    ref: "Burke et al., J Sports Sci. 2011 (carbohydrates for training and competition).",
  },
  "oyster extract": {
    name: "Oyster Extract",
    note: "Oyster extract is a natural source of zinc, a mineral involved in testosterone metabolism, immune function and cellular repair, and has traditionally been associated with male vitality and reproductive health.",
    ref: "Fallah et al., Nutrients. 2018 (zinc and reproductive health review).",
  },
  "beetroot extract": {
    name: "Beetroot Extract",
    note: "Beetroot is a concentrated dietary source of nitrates, which are converted to nitric oxide in the body. This supports vasodilation, circulation and exercise performance, complementing citrulline's effects on the same pathway.",
    ref: "Jones, Sports Med. 2014 (dietary nitrate and exercise performance).",
  },
  "horny goat weed extract": {
    name: "Horny Goat Weed Extract",
    note: "Horny Goat Weed (Epimedium) contains icariin, a flavonoid studied for its effects on nitric oxide signalling and its traditional use supporting male vitality, desire and energy.",
    ref: "Zhang & Yang, J Sex Med. 2006 (icariin and PDE5 activity).",
  },
  "zinc": {
    name: "Zinc",
    note: "Zinc is an essential trace mineral that contributes to normal testosterone levels, fertility, reproduction and immune function. Deficiency is linked to reduced testosterone and impaired reproductive health.",
    ref: "Prasad et al., J Am Coll Nutr. 1996 (zinc and testosterone status).",
  },
  "black pepper extract": {
    name: "Black Pepper Extract",
    note: "Black pepper extract (piperine) is included in formulas to help enhance the bioavailability and absorption of co-ingested botanical compounds.",
    ref: "Shoba et al., Planta Med. 1998 (piperine and bioavailability).",
  },
  "magnesium": {
    name: "Magnesium",
    note: "Magnesium is an essential mineral that supports normal muscle and nervous-system function and energy metabolism. Magnesium glycinate is a well-absorbed form often selected for nighttime formulas.",
    ref: "Abbasi et al., J Res Med Sci. 2012 (magnesium supplementation and sleep quality).",
  },
  "valerian root extract": {
    name: "Valerian Root Extract",
    note: "Valerian is a traditional botanical studied for its calming properties, commonly used to support relaxation and help prepare the body for restful sleep.",
    ref: "Bent et al., Am J Med. 2006 (valerian and sleep quality, meta-analysis).",
  },
  "passionflower extract": {
    name: "Passionflower Extract",
    note: "Passionflower is traditionally used to support calmness and relaxation, and is often paired with valerian in nighttime botanical blends.",
    ref: "Akhondzadeh et al., J Clin Pharm Ther. 2001 (passionflower and anxiety).",
  },
  "l-tryptophan": {
    name: "L-Tryptophan",
    note: "L-Tryptophan is an essential amino acid used in the body's natural pathways associated with serotonin and melatonin production, which are involved in mood regulation and the normal sleep-wake cycle.",
    ref: "Silber & Schmitt, Neurosci Biobehav Rev. 2010 (tryptophan and sleep).",
  },
};

// Vitamins / minerals shown as a grouped system line — matched loosely.
export const VITAMIN_RESEARCH = {
  name: "Vitamins & Minerals",
  note: "A complete multivitamin and mineral foundation supports micronutrient status for energy metabolism (B-vitamins), immune function (vitamins C, D, zinc) and bone health (vitamin D, calcium), particularly under elevated training load.",
  ref: "Peeling et al., Int J Sport Nutr Exerc Metab. 2018.",
};

// Parse a product ingredient line and return a research entry (or null).
export function researchForIngredient(line) {
  const raw = String(line || "");
  // Split on em dash, en dash, or hyphen-with-spaces, take the name part.
  // Split on em dash or en dash only — NOT a plain hyphen, since several
  // ingredient names contain their own internal hyphen (L-Citrulline,
  // L-Tyrosine, Beta-Alanine). Splitting on a bare hyphen cut those names
  // in half (e.g. "L-Tyrosine" → "L"), which then fuzzy-matched onto the
  // wrong entry and made two different ingredients show the same card.
  const namePart = raw.split(/[—–]/)[0].trim();
  if (!namePart) return null;
  const norm = namePart.toLowerCase().replace(/\s+/g, " ").trim();

  // Group multi-vitamin lines under one entry
  if (/vitamin|b-complex|b1|b2|b3|b5|b6|b7|b9|b12|mineral|multivitamin/i.test(norm)) {
    return VITAMIN_RESEARCH;
  }
  if (INGREDIENT_RESEARCH[norm]) return INGREDIENT_RESEARCH[norm];
  // partial match
  const key = Object.keys(INGREDIENT_RESEARCH).find((k) => norm.includes(k) || k.includes(norm));
  return key ? INGREDIENT_RESEARCH[key] : null;
}
