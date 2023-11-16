import { component$ } from "@builder.io/qwik";
import { QwikLogo } from "../../icons/qwik";
import styles from "./navbar.module.css";

export default component$(() => {
  return (
    <header class={styles.header}>
      <div class={["container", styles.wrapper]}>
        <div class={styles.logo}>
          <a href="/" title="qwik">
            <QwikLogo height={50} />
          </a>
        </div>
        <ul>
          <li>
            <a
              href="https://qwik.builder.io/docs/components/overview/"
              target="_blank"
            >
              Documentación
            </a>
          </li>         
        </ul>
      </div>
    </header>
  );
});
