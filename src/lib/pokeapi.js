// Direct PokeAPI helpers for data the backend doesn't store (e.g. evolutions).

const POKEAPI = "https://pokeapi.co/api/v2";

const idFromUrl = (url) => Number(url.replace(/\/$/, "").split("/").pop());
const cap = (s) => (s ? s.charAt(0).toUpperCase() + s.slice(1) : s);

// Human-readable trigger for how a Pokemon evolves into the next stage.
function evolutionTrigger(details = []) {
  const d = details[0];
  if (!d) return "";
  if (d.min_level) return `Lv. ${d.min_level}`;
  if (d.item) return `Use ${cap(d.item.name.replace(/-/g, " "))}`;
  if (d.trigger?.name === "trade") return "Trade";
  if (d.min_happiness) return "Friendship";
  if (d.trigger?.name) return cap(d.trigger.name.replace(/-/g, " "));
  return "";
}

// Returns a flat list of evolution stages for the given Pokemon id:
// [{ id, name, from }] where `from` is the trigger to reach this stage.
export async function fetchEvolutionChain(id) {
  const speciesRes = await fetch(`${POKEAPI}/pokemon-species/${id}`);
  if (!speciesRes.ok) throw new Error("species not found");
  const species = await speciesRes.json();

  const chainRes = await fetch(species.evolution_chain.url);
  if (!chainRes.ok) throw new Error("evolution chain not found");
  const { chain } = await chainRes.json();

  const stages = [];
  const walk = (node, from) => {
    stages.push({
      id: idFromUrl(node.species.url),
      name: cap(node.species.name),
      from,
    });
    (node.evolves_to || []).forEach((child) =>
      walk(child, evolutionTrigger(child.evolution_details))
    );
  };
  walk(chain, "");

  return stages;
}
