import { component$, Slot, useStyles$ } from "@builder.io/qwik";

import Navbar from "~/components/shared/navbar/navbar";
import Footer from "~/components/shared/footer/footer";
import { PokemonProvider } from "~/context";
import styles from "./styles.css?inline";


export default component$(() => {
  useStyles$(styles);
  
  return (
    <PokemonProvider>
      <Navbar />
      <main class="flex flex-col items-center justify-center">
        <Slot />
      </main>
      <Footer />    
    </PokemonProvider>
  );
});
