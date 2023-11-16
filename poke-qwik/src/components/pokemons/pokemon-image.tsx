import { component$, useSignal, useTask$ } from '@builder.io/qwik';

interface PokemonImageProps {
    pokemonId: number;
    width?: number;
    height?: number;
    backImage?: boolean;
    isVisible?: boolean;
}


export const PokemonImage = component$(({ pokemonId, width, height, backImage = false, isVisible = false }: PokemonImageProps) => {

    const imageLoaded = useSignal(false);

    useTask$(({ track }) => {
        track(() => pokemonId);
        imageLoaded.value = true;
    });


    let imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId.value}.png`;

    if (backImage) {
        imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${pokemonId.value}.png`;
    }

    return (
        <div style={{ width: `${width}px`, height: `${height}px` }} class="flex items-center justify-center">
            {!imageLoaded.value && <span>Cargando...</span>}

            <img class={[{
                'hidden': !imageLoaded.value,
                'brightness-0': !isVisible,

            }, 'transition-all']} onLoad$={() => {
                imageLoaded.value = true
            }} width={width || 200} height={height || 200} src={imageUrl} alt="pokemon" />

        </div>
    );
});