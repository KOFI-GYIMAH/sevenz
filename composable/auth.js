import { ref, useContext } from "@nuxtjs/composition-api";
import { mapArray } from "~/helpers";
import { QUERY_INVESTIGATIONS } from "~/schemes";

export const useAuthentication = () => {
  const data = ref([]);
  const isLoading = ref(true);

  const { app, $auth, store } = useContext();
  const { getCategories, getTests } = mapArray();

  const fetchData = async () => {
    isLoading.value = true;

    const client = app.apolloProvider.defaultClient;
    const res = await client.query({
      query: QUERY_INVESTIGATIONS,
    });

    data.value = res.data.investigations;
    isLoading.value = false;

    const categories = await getCategories(data.value);
    const tests = getTests(data.value);

    store.dispatch("loadCategories", categories);
    store.dispatch("loadTests", tests);
  };

  const login = async () => {
    try {
      await $auth.loginWith("graphql");
      await fetchData();

      app.$toast.global.defaultSuccess({
        msg: "Logged In Successfully✨.",
      });
    } catch (e) {
      app.$toast.global.defaultError({
        msg: "Log out and log in again.",
      });
    }
  };

  return {
    login,
    fetchData,
    isLoading,
    data,
  };
};
