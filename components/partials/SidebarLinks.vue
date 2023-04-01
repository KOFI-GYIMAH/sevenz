<template>
  <ul class="nav flex-column w-100">
    <li class="nav-link active">
      <NuxtLink to="/">
        <i class="bx bxs-dashboard"></i>
        <span class="mx-2">Dashboard</span>
      </NuxtLink>
    </li>

    <li class="nav-link">
      <NuxtLink to="/">
        <i class="bx bxs-user"></i>
        <span class="mx-2">Profile</span>
      </NuxtLink>
    </li>

    <li class="nav-link d-flex justify-content-between align-items-center">
      <NuxtLink to="/">
        <svg
          width="16"
          height="14"
          viewBox="0 0 16 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 6.37079L1.73034 4.16854L7.55056 6.52809L5.74157 8.80899L0 6.37079Z"
            fill="#A0A0A0"
          />
          <path
            d="M2.1236 4.01124L0.314607 1.73034L6.29214 0L7.78652 2.04494L9.2809 0L15.1798 1.73034L13.4494 4.01124L7.86517 2.35955L2.1236 4.01124Z"
            fill="#A0A0A0"
          />
          <path
            d="M9.67416 8.80899L7.86517 6.37079L13.6854 4.16854L15.4944 6.52809L9.67416 8.80899Z"
            fill="#A0A0A0"
          />
          <path
            d="M9.51685 9.1236L8.02247 7.23596V14L13.6854 11.7191V7.47191L9.51685 9.1236Z"
            fill="#A0A0A0"
          />
          <path
            d="M5.97753 9.1236L7.55056 7L7.62921 13.9213L1.80899 11.7191V7.55056L5.97753 9.1236Z"
            fill="#A0A0A0"
          />
        </svg>

        <span class="mx-2">Services</span>
      </NuxtLink>
      <i class="bx bx-chevron-down"></i>
    </li>

    <li v-for="link in linksA" :key="link.name" class="nav-link">
      <NuxtLink to="/">
        <i :class="link.icon"></i>
        <span class="mx-2">{{ link.name }}</span>
      </NuxtLink>
    </li>

    <hr />

    <li v-for="link in linksB" :key="link.name" class="nav-link">
      <NuxtLink to="/">
        <i :class="link.icon"></i>
        <span class="mx-2">{{ link.name }}</span>
      </NuxtLink>
    </li>

    <li class="nav-link" @click="signOut">
      <a href="#">
        <i class="bx bx-log-out"></i>
        <span class="mx-2">Logout</span>
      </a>
    </li>
  </ul>
</template>

<script setup>
import { useContext } from "@nuxtjs/composition-api";

const linksA = [
  {
    icon: "bx bxs-notepad",
    name: "Medical Records",
  },
  {
    icon: "bx bxs-wallet-alt",
    name: "Care Wallet",
  },
  {
    icon: "bx bxs-message-alt",
    name: "Messages",
  },
  {
    icon: "bx bx-library",
    name: "Resources",
  },
];

const linksB = [
  {
    icon: "bx bxs-cog",
    name: "Account Settings",
  },
  {
    icon: "bx bxs-buoy",
    name: "Contact Support",
  },
];

const { app, $auth, store } = useContext();

const signOut = async () => {
  await $auth.logout();
  store.dispatch("loadCategories", []);
  store.dispatch("loadTests", []);
  app.$toast.global.defaultSuccess({
    msg: "Logged Out Successfully🤔.",
  });
};
</script>

<style scoped>
.active,
.nav-link:active,
.nav-link:focus,
.nav-link:hover {
  background-color: var(--blue);
  cursor: pointer;
}

.active a i,
.active a,
.nav-link:active,
.nav-link:focus,
.nav-link:hover a,
.nav-link:hover a i {
  color: #fff;
}

.active-nav {
  margin-left: 0;
}

a,
i {
  color: var(--light-gray);
}

.nav-link {
  line-height: 2.5rem;
}
</style>
