import { component$ } from "@builder.io/qwik";
import styles from "./footer.module.css";

export default component$(() => (
  <footer class={styles.footer}>
    Made with ♡ by&nbsp;<a href="http://zapperment.rocks/">Zapperment</a>
  </footer>
));
