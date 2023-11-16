import { component$, useSignal, $ } from '@builder.io/qwik';
import { type DocumentHead, useNavigate } from "@builder.io/qwik-city";
import { PokemonImage } from '~/components/pokemons/pokemon-image';

export default component$(() => {

  const pokemonId = useSignal(1); // primitivos, bookeans, strings, numbers  
  const changePokemonId = $((value: Number) => {
    if ((pokemonId.value + value) <= 0) {
      return;
    }

    pokemonId.value += value;
  });


  const showBackImage = useSignal(false);
  const showBackImageToggle = $(() => {
    showBackImage.value = !showBackImage.value;
  });

  const showPokemon = useSignal(false);
  const revealPokemon = $(() => {
    showPokemon.value = true;
  });

  const hidePokemon = $(() => {
    showPokemon.value = false;
  });

  const nav = useNavigate();

  const goToPokemon = $((pokemonId) => {
    nav(`/pokemon/${pokemonId}`);
  });

  return (
    <>
      <span class="text-2xl">Buscador simple</span>
      <span class="text-9xl">{pokemonId}</span>

      <div class="cursor-pointer" onClick$={async () => await goToPokemon(pokemonId.value)}>
        <PokemonImage pokemonId={pokemonId.value} width={250} height={250} backImage={showBackImage.value} isVisible={showPokemon.value} />
      </div>

      <div class="mt-2">
        <button onClick$={() => changePokemonId(-1)} class="btn btn-primary mr-2">Anterior</button>
        <button onClick$={() => changePokemonId(+1)} class="btn btn-primary mr-2">Siguiente</button>
        <button onClick$={() => showBackImageToggle()} class="btn btn-primary mr-2">Girar</button>
        <button onClick$={() => revealPokemon()} class="btn btn-primary mr-2">Revelar</button>
        <button onClick$={() => hidePokemon()} class="btn btn-primary">Ocultar</button>
      </div>

    </>
  );
});

export const head: DocumentHead = {
  title: "pokeQwik!",
  meta: [
    {
      name: "description",
      content: "Curso oficial del framework Qwik",
    },
  ],
};
