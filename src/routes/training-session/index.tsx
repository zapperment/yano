/* eslint-disable qwik/jsx-img */
import { component$ } from "@builder.io/qwik";

import type { DocumentHead } from "@builder.io/qwik-city";
import { useTrainingSession } from "./hooks";
import {TrainingSessionPage} from "./components";

export default component$(() => {
  const { flashCard, results } = useTrainingSession();
  return <TrainingSessionPage flashCard={flashCard.value} results={results.value}/>;
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
