import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import styles from "./homepage.module.css"

export default component$(() => {
  return (
    <section class={styles.homePage}>
      <h1>Welcome to Yano!</h1>
      <h2>
        <a href="/training-session/">Start new training session</a>
      </h2>
    </section>
  );
});

export const head: DocumentHead = {
  title: "Yano",
  meta: [
    {
      name: "description",
      content: "Patrick's qwik piano webapp",
    },
  ],
};
