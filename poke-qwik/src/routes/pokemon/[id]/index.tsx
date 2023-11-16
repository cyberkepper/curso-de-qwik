import { component$ } from '@builder.io/qwik';
import { useLocation } from '@builder.io/qwik-city';
import { PokemonImage } from '~/components/pokemons/pokemon-image';

export default component$(() => {
    const location = useLocation();   
    
    const pokemonId = Number(location.params.id);

    console.log('pokemonId', pokemonId);

    return (
        <>
            <span class="text-5xl">Pokemon: {pokemonId}</span>

            <PokemonImage pokemonId={pokemonId} width={250} height={250} backImage={false} isVisible={true} />
        </>
    );
});