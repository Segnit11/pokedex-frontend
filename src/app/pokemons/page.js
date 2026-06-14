import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import PokemonGrid from "@/components/PokemonGrid";
import CompareTray from "@/components/CompareTray";
import Footer from "@/components/Footer";

export default function PokemonsPage() {
  return (
    <>
      <Navbar />
      <Hero />
      <PokemonGrid />
      <CompareTray />
      <Footer />
    </>
  );
}
