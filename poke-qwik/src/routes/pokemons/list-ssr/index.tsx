import { component$, useComputed$ } from '@builder.io/qwik';
import { Link, type DocumentHead, routeLoader$, useLocation } from '@builder.io/qwik-city';
import { type BasicPokemonInfo } from '../../../interfaces/pokemon-list.response';
import { getSmallPokemons } from '~/helpers/get-small-pokemons';
import { PokemonImage } from '~/components/pokemons/pokemon-image';


export const usePokemonList = routeLoader$<BasicPokemonInfo[]>(async ({query, redirect}) => {

  const queryParams = new URLSearchParams(query);

  const currentOffset = Number(queryParams.get('offset') || 0);  

  if (isNaN(currentOffset)) throw redirect(302, '/');   
  if (currentOffset < 0) throw redirect(302, '/');
  if (currentOffset > 1000) throw redirect(302, '/');

  const pokemons = await getSmallPokemons(currentOffset);

  return pokemons;

  // const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=10&offset=${currentOffset}`);

  // const data = await response.json() as PokemonListResponse;
  // return data.results;
});

export default component$(() => {

  const pokemons = usePokemonList();

  const location = useLocation();

  const currentOffset = useComputed$<number>(() => {    

    const offsetString = new URLSearchParams(location.url.search).get('offset');  
    return Number(offsetString || 0);
  });

  return (
    <>
      <div class="flex flex-col">
        <span class="my-5 text-5xl">Status</span>
        <span>Offset: {currentOffset}</span>
        {location.isNavigating ? <span>..Cargando</span> : ""}
      </div>

      <div class="mt-10">
        <Link href={`/pokemons/list-ssr/?offset=${currentOffset.value - 10}`} class="btn btn-primary mr-2">
          Anteriores
        </Link>

        <Link href={`/pokemons/list-ssr/?offset=${currentOffset.value + 10}`} class="btn btn-primary mr-2">
          Siguientes
        </Link>
      </div>

      <div class="grid grid-cols-5 mt-5">
        {
          pokemons.value.map(({ name, id }) => (
            <div key={name} class="m-5 flex flex-col justify-center items-center">
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
  title: "LIST SSR 😄",
  meta: [
    {
      name: "description",
      content: "SSR list of pokemons",
    },
  ],
};
