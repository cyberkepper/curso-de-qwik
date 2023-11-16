import { component$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';

export default component$(() => {
    return <div>Hola mundo - CLIENT 😇</div>;
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
