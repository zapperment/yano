import { component$ } from "@builder.io/qwik";
import styles from "./Header.module.css";

export default component$(() => {
  return (
    <header class={styles.header}>
      <h1 class={styles.logo}>
        <a href="/">Yano</a>
      </h1>
    </header>
  );
});
