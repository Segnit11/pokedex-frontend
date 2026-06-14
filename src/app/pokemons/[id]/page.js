import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PokemonDetails from "@/components/PokemonDetails";

export default function PokemonDetailPage({ params }) {
  return (
    <>
      <Navbar />
      <PokemonDetails id={Number(params.id)} />
      <Footer />
    </>
  );
}
