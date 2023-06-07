import { component$ } from "@builder.io/qwik";
import styles from "./emoji.module.css";

type Props = {
  symbol: string;
  ariaLabel: string;
};

export default component$(({ symbol, ariaLabel }: Props) => (
  <span class={[styles.icon, styles.fadeOut]} role="img" aria-label={ariaLabel}>
    {symbol}
  </span>
));
