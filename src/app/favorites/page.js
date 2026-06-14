import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FavoritesView from "@/components/FavoritesView";
import CompareTray from "@/components/CompareTray";

export default function FavoritesPage() {
  return (
    <>
      <Navbar />
      <FavoritesView />
      <CompareTray />
      <Footer />
    </>
  );
}
