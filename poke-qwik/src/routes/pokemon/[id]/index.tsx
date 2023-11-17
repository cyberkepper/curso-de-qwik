import { component$, useContext } from '@builder.io/qwik';
import { routeLoader$ } from '@builder.io/qwik-city';
import { PokemonImage } from '~/components/pokemons/pokemon-image';
import { PokemonGameContext } from '~/context';


export const usePokemonId = routeLoader$<number>((event) => {
    const pokemonId = Number(event.params.id);    

    if (isNaN(pokemonId)) throw event.redirect(302, '/');   
    if (pokemonId <= 0) throw event.redirect(302, '/');
    if (pokemonId > 1000) throw event.redirect(302, '/');

    return pokemonId;
});


export default component$(() => {

    const pokemonId = usePokemonId();

    const pokemonGame = useContext(PokemonGameContext); 

    return (
        <>
            <span class="text-5xl">Pokemon: {pokemonId.value || pokemonGame.pokemonId}</span>

            <PokemonImage pokemonId={pokemonId.value || pokemonGame.pokemonId} width={250} height={250} backImage={pokemonGame.showBackImage} isVisible={pokemonGame.isPokemonVisible} />
        </>
    );
});