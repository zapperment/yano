import { component$ } from "@builder.io/qwik";
import styles from "./failure.module.css";

export default component$(() => (
  <span
    class={[styles.icon, styles.fadeOut]}
    role="img"
    aria-label="thumbs down"
  >
    👎
  </span>
));
