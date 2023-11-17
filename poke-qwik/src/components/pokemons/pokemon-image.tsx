import { component$, useComputed$, useSignal, useTask$ } from '@builder.io/qwik';

interface PokemonImageProps {
    pokemonId: number | string;
    width?: number;
    height?: number;
    backImage?: boolean;
    isVisible?: boolean;
}


export const PokemonImage = component$(({ pokemonId, width, height, backImage = false, isVisible = false }: PokemonImageProps) => {

    const imageLoaded = useSignal(false);

    useTask$(({ track }) => {
        track(() => pokemonId);
        if (!imageLoaded.value) {
            imageLoaded.value = true
        } else {
            imageLoaded.value = false
        }
    }); 

    const imageUrl = useComputed$(() => {
        return (backImage)
        ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${pokemonId}.png`
        : `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`;
    });   

    return (
        <div style={{ width: `${width}px`, height: `${height}px` }} class="flex items-center justify-center">
            {!imageLoaded.value && <span>Cargando...</span>}

            <img class={[{
                'hidden': !imageLoaded.value,
                'brightness-0': !isVisible,

            }, 'transition-all']} onLoad$={() => {
                imageLoaded.value = true
            }} width={width || 200} height={height || 200} src={imageUrl.value} alt="pokemon" />

        </div>
    );
});