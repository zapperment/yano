import { component$, Slot } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";

import { Header, Footer } from "../components/layout";

export const useServerTimeLoader = routeLoader$(() => {
  return {
    date: new Date().toISOString(),
  };
});

export default component$(() => (
  <>
    <Header />
    <main>
      <Slot />
    </main>
    <Footer />
  </>
));
