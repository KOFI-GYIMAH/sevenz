<template>
  <div class="position-relative">
    <PartialsSidebar />

    <HomeMainContent :isLoading="isLoading" />
  </div>
</template>

<script setup>
import { onMounted, useContext } from "@nuxtjs/composition-api";
import { useAuthentication } from "~/composable/auth";

const { $auth } = useContext();
const { login, fetchData, isLoading } = useAuthentication();

onMounted(async () => {
  if ($auth.$state.loggedIn === false) {
    await login();
  } else {
    await fetchData();
  }
});
</script>
