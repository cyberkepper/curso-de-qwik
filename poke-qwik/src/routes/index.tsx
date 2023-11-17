import { component$, $, useContext } from '@builder.io/qwik';
import { type DocumentHead, useNavigate } from "@builder.io/qwik-city";
import { PokemonImage } from '~/components/pokemons/pokemon-image';
import { PokemonGameContext } from '~/context';

export default component$(() => {

  const pokemonGame = useContext(PokemonGameContext);

  //const pokemonId = useSignal(1); // primitivos, bookeans, strings, numbers  
  //const showBackImage = useSignal(false);
  //const showPokemon = useSignal(false);

  const changePokemonId = $((id: number) => {
    if ((pokemonGame.pokemonId + id) <= 0) {
      return;
    }

    pokemonGame.pokemonId += id;
  });

  const showBackImageToggle = $(() => {
    pokemonGame.showBackImage = !pokemonGame.showBackImage;
  });

  const revealPokemon = $(() => {
    pokemonGame.isPokemonVisible = true;
  });

  const hidePokemon = $(() => {
    pokemonGame.isPokemonVisible = false;
  });

  const nav = useNavigate();

  const goToPokemon = $((pokemonId) => {
    nav(`/pokemon/${pokemonId}`);
  });


  return (
    <>
      <span class="text-2xl">Buscador simple</span>
      <span class="text-9xl">{pokemonGame.pokemonId}</span>

      <div class="cursor-pointer" onClick$={async () => await goToPokemon(pokemonGame.pokemonId)}>
        <PokemonImage pokemonId={pokemonGame.pokemonId} width={250} height={250} backImage={pokemonGame.showBackImage} isVisible={pokemonGame.isPokemonVisible} />
      </div>

      <div class="mt-2">
        <button onClick$={() => changePokemonId(-1)} class="btn btn-primary mr-2">Anterior</button>
        <button onClick$={() => changePokemonId(+1)} class="btn btn-primary mr-2">Siguiente</button>
        <button onClick$={() => showBackImageToggle()} class="btn btn-primary mr-2">Girar</button>
        { pokemonGame.isPokemonVisible ? 
          <button onClick$={() => hidePokemon()} class="btn btn-primary">Ocultar</button> : 
          <button onClick$={() => revealPokemon()} class="btn btn-primary mr-2">Revelar</button>
        }
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
