import { component$ } from "@builder.io/qwik";
import styles from "./Footer.module.css";

export default component$(() => (
  <footer class={styles.footer}>
    Made with ♡ by&nbsp;<a href="http://zapperment.rocks/">Zapperment</a>
  </footer>
));
