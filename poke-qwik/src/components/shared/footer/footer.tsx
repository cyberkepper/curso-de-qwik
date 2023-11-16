import { component$ } from "@builder.io/qwik";
import { useServerTimeLoader } from "~/routes/layout";
import styles from "./footer.module.css";
import { Link } from "@builder.io/qwik-city";

export default component$(() => {
  const serverTime = useServerTimeLoader();

  return (
    <footer>
      <div class="container flex justify-center">
        <Link class="text-white" href="/">
          <span class="mr-2">Made with ♡ by Alex Grande</span>
          <span class={styles.spacer}>|</span>
          <span>{serverTime.value.date}😆</span>      
        </Link>
      </div>
    </footer>
  );
});
