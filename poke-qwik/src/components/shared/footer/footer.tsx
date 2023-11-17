import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";

export default component$(() => {

  return (
    <footer>
      <div class="container flex justify-center">
        <Link class="text-white" href="/">
          <span class="mr-2">Made with ♡ by Alex Grande</span>        
        </Link>
      </div>
    </footer>
  );
});
