export default {
  head: {
    title: "Sevenz Health Frontend Developer Test",
    htmlAttrs: {
      lang: "en",
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: "Sevenz Health Frontend Developer Test",
      },
      { name: "format-detection", content: "telephone=no" },
    ],
    link: [
      {
        rel: "stylesheet",
        href: "https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.1.3/css/bootstrap.min.css",
        integrity:
          "sha512-GQGU0fMMi238uA+a/bdWJfpUGKUkBdgfFdgBm72SUQ6BeyWjoY/ton0tEjH+OSH9iP4Dfh+7HM0I9f5eR0L/4w==",
        crossorigin: "anonymous",
        referrerpolicy: "no-referrer",
      },
      {
        rel: "stylesheet",
        href: "https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css",
      },
    ],
    script: [
      {
        src: "https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.1.3/js/bootstrap.bundle.min.js",
        integrity:
          "sha512-pax4MlgXjHEPfCwcJLQhigY7+N8rt6bVvWLFyUMuxShv170X53TRzGPmPkZmGBhk+jikR8WBM4yl7A9WMHHqvg==",
        crossorigin: "anonymous",
        referrerpolicy: "no-referrer",
        body: true,
      },
      {
        src: "/main.js",
        body: true,
      },
    ],
  },

  css: ["~/assets/css/styles.css"],

  components: true,

  buildModules: ["@nuxtjs/composition-api/module"],

  modules: [
    "@nuxtjs/axios",
    "@nuxtjs/apollo",
    "@nuxtjs/auth-next",
    "@nuxtjs/toast",
    "vue-sweetalert2/nuxt",
  ],

  auth: {
    strategies: {
      graphql: {
        scheme: "~/schemes/graphqlScheme.js",
      },
    },
  },

  apollo: {
    clientConfigs: {
      default: {
        httpEndpoint: process.env.GRAPHQL_API_URL,
      },
    },
  },

  toast: {
    position: "bottom-right",
    iconPack: "fontawesome",
    duration: 5000,
    keepOnHover: true,
    register: [
      {
        name: "defaultSuccess",
        message: (payload) => (!payload.msg ? "Success" : payload.msg),
        options: {
          type: "success",
          icon: "check",
        },
      },
      {
        name: "defaultError",
        message: (payload) =>
          !payload.msg
            ? "Oops.. Something went wrong. Try Again!"
            : payload.msg,
        options: {
          type: "error",
          icon: "times",
        },
      },
    ],
  },
};
