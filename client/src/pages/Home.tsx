import Header from "../components/Header";
import Contacts from "./Contacts";
import Hero from "./Hero";
import Portfolio from "./Portfolio";
import Services from "./Services";
import Studio from "./Studio";

const SonusStudio = () => {
  return (
    <div className="min-h-screen bg-zinc-950 text-white font-sans selection:bg-white/30">
      <Header />
      <Hero />

      <div className="px-5">
        <Services />
        <Portfolio />
        <Studio />
        <Contacts />
      </div>
    </div>
  );
};

export default SonusStudio;
