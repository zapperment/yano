import { component$ } from "@builder.io/qwik";
import { useServerTimeLoader } from "~/routes/layout";
import styles from "./footer.module.css";

export default component$(() => (
  <footer class={styles.footer}>Made with ♡ by Zapperment</footer>
));
