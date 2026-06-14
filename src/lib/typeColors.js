// Canonical Pokemon type colors, plus a couple of helpers used across the UI.

export const TYPE_COLORS = {
  normal: "#A8A77A",
  fire: "#EE8130",
  water: "#6390F0",
  electric: "#F7D02C",
  grass: "#7AC74C",
  ice: "#96D9D6",
  fighting: "#C22E28",
  poison: "#A33EA1",
  ground: "#E2BF65",
  flying: "#A98FF3",
  psychic: "#F95587",
  bug: "#A6B91A",
  rock: "#B6A136",
  ghost: "#735797",
  dragon: "#6F35FC",
  dark: "#705746",
  steel: "#B7B7CE",
  fairy: "#D685AD",
};

export const typeColor = (type) =>
  TYPE_COLORS[String(type || "").toLowerCase()] || "#777";

// A soft two-color gradient derived from a Pokemon's (up to two) types,
// used as the card / hero background.
export const typeGradient = (types = []) => {
  const colors = types.map((t) => typeColor(t.type || t));
  if (colors.length === 0) return "linear-gradient(135deg, #777, #999)";
  if (colors.length === 1) return `linear-gradient(135deg, ${colors[0]}, ${colors[0]}cc)`;
  return `linear-gradient(135deg, ${colors[0]}, ${colors[1]})`;
};

export const GEN_LABELS = {
  1: "Gen I · Kanto",
  2: "Gen II · Johto",
  3: "Gen III · Hoenn",
  4: "Gen IV · Sinnoh",
  5: "Gen V · Unova",
  6: "Gen VI · Kalos",
  7: "Gen VII · Alola",
  8: "Gen VIII · Galar",
  9: "Gen IX · Paldea",
};
