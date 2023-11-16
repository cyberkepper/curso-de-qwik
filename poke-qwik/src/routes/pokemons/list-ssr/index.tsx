import { component$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';

export default component$(() => {
  return <div>Hola mundo - SSR 😃</div>;
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
