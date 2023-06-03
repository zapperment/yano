import { component$ } from "@builder.io/qwik";
import styles from "./success.module.css";

export default component$(() => (
  <span class={[styles.icon, styles.fadeOut]} role="img" aria-label="thumbs up">
    👍
  </span>
));
