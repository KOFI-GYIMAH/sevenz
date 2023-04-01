import { computed, useStore } from "@nuxtjs/composition-api";

export function useState(arr) {
  const store = useStore();
  const keypair = arr.map((s) => [s, computed(() => store.state[s])]);
  return Object.fromEntries(keypair);
}
