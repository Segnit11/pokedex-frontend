import PokedexLogo from "@/components/PokedexLogo";
import PokemonGrid from "@/components/PokemonGrid";
import Filters from "@/components/Filters";
import Footer from "@/components/Footer";
import Image from "next/image";
import React from "react";
import PokemonCard from "@/components/PokemonCard";

export default function Home() {
  return(
    <>
      <PokedexLogo/>
      <PokemonGrid/>
      <Footer/>
    </>
  )
}
