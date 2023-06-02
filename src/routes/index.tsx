import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

export default component$(() => {
  return (
    <section>
      <h1>Welcome to Yano!</h1>
      <h2>
        <a href="/flash-card/">Start</a>
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
