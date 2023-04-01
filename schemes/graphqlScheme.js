import { LocalScheme } from "~auth/runtime";

import { LOGIN_MUTATION, LOGOUT_MUTATION } from "./mutations";
import { QUERY_USER_DETAILS } from "./query";

export default class GraphQLScheme extends LocalScheme {
  async login(credentials, { reset = true } = {}) {
    const {
      apolloProvider: { defaultClient: apolloClient },
      $apolloHelpers,
    } = this.$auth.ctx.app;

    // * Remove leftover tokens before log-in
    if (reset) this.$auth.reset({ resetInterceptor: false });

    const res = await apolloClient
      .mutate({ mutation: LOGIN_MUTATION })
      .then(({ data }) => data.login);

    this.token.set(res);
    await $apolloHelpers.onLogin(res);
    await this.fetchUser();

    return res;
  }

  fetchUser() {
    const {
      apolloProvider: { defaultClient: apolloClient },
    } = this.$auth.ctx.app;

    if (!this.check().valid) return;

    return apolloClient
      .query({
        query: QUERY_USER_DETAILS,
      })
      .then(({ data }) => {
        if (!data.me) {
          const error = new Error(`User Data response not resolved`);
          return Promise.reject(error);
        }

        this.$auth.setUser(data.me);
        return data.me;
      })
      .catch((error) => {
        this.$auth.callOnError(error, { method: "fetchUser" });
        return Promise.reject(error);
      });
  }

  async logout() {
    const {
      apolloProvider: { defaultClient: apolloClient },
      $apolloHelpers,
    } = this.$auth.ctx.app;

    await apolloClient
      .mutate({
        mutation: LOGOUT_MUTATION,
      })
      .catch((e) => {
        // console.log(e);
      });

    $apolloHelpers.onLogout();
    return this.$auth.reset({ resetInterceptor: false });
  }

  initializeRequestInterceptor() {}

  reset() {
    this.$auth.setUser(false);
    this.token.reset();
  }
}
