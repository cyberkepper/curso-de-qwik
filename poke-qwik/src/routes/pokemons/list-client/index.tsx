import { component$, useOnDocument, useStore, useTask$, useVisibleTask$, $ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import type { SmallPokemon } from '~/interfaces';
import { PokemonImage } from '~/components/pokemons/pokemon-image';
import { getSmallPokemons } from '~/helpers/get-small-pokemons';

interface PokemonPageState {
    currentPage: number;
    pokemons: SmallPokemon[];  
    isLoading?: boolean; 
}

export default component$(() => {   

    const pokemonState = useStore<PokemonPageState>({
        currentPage: 0,
        pokemons: [],
        isLoading: false,
    })

    // se ejecuta del lado del servidor y del lado del cliente
    useTask$(async ({track}) => {
        track(() => pokemonState.currentPage); //cada vez que nos cambie nuestro currentPage se dispara de nuevo el useTask$
        const pokemons = await getSmallPokemons(pokemonState.currentPage * 10, 30);
        pokemonState.pokemons = [...pokemonState.pokemons, ...pokemons];

        pokemonState.isLoading = false;
    });

    useOnDocument('scroll', $(() => {
        const maxScroll = document.body.scrollHeight;
        const currentScroll = window.scrollY + window.innerHeight;
    
        if ( (currentScroll + 200) >= maxScroll && !pokemonState.isLoading   ) {
          pokemonState.isLoading = true;
          pokemonState.currentPage++;
        }
      }))

    //solo lo ve el cliente
    // useVisibleTask$(async ({track}) => {
    //     track(() => pokemonState.currentPage); //cada vez que nos cambie nuestro currentPage se dispara de nuevo el useVisibleTask$
    //     const pokemons = await getSmallPokemons(pokemonState.currentPage * 10);
    //     pokemonState.pokemons = [...pokemonState.pokemons, ...pokemons];

    // });

    return (
        <>
          <div class="flex flex-col">
            <span class="my-5 text-5xl">Status</span>
            <span>Pagina actual: {pokemonState.currentPage}</span>
         
          </div>
    
          <div class="mt-10">
            {/* <button onClick$={() => pokemonState.currentPage--} class="btn btn-primary mr-2">
              Anteriores
            </button> */}
    
            <button onClick$={() => pokemonState.currentPage++} class="btn btn-primary mr-2">
              Siguientes
            </button>
          </div>
    
          <div class="grid sm:grid-cols-2 md:grid-cols-5 xl:grid-cols-7 mt-5">
            {
               pokemonState.pokemons.map(({ name, id }) => (
                 <div key={id} class="m-5 flex flex-col justify-center items-center">
                   <PokemonImage pokemonId={id} width={200} height={200} backImage={false} isVisible={true} />
                  <span class="capitalize"> {name} </span>
                 </div>
              ))
            }
          </div>
    
        </>
      )
});

export const head: DocumentHead = {
    title: "LIST CLIENT 😇",
    meta: [
        {
            name: "description",
            content: "Client list of pokemons",
        },
    ],
};
