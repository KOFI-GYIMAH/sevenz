export const state = () => ({
  categories: [],
  tests: [],
});

export const mutations = {
  SET_CATEGORIES(state, payload) {
    state.categories = payload;
  },

  SET_TESTS(state, payload) {
    state.tests = payload;
  },
};

export const actions = {
  async loadCategories({ commit }, payload) {
    commit("SET_CATEGORIES", payload);
  },

  async loadTests({ commit }, payload) {
    commit("SET_TESTS", payload);
  },
};
