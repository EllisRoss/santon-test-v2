import { Store } from "../common/store/store";
import { Registry } from "../common/store/registry";

export const SET_IS_AUTH = "SET_IS_AUTH";

const AuthStore = new Store("auth", {
  data: {
    isAuth: false,
  },
  options: {
    shouldInitFromState: true,
    stateKey: "auth",
  },
  reducers: [
    {
      type: SET_IS_AUTH,
      action(state, payload) {
        const { isAuth } = payload;

        document.cookie = `isAuth: ${isAuth}`
        alert(document.cookie)

        return {
          ...state,
          isAuth,
        };
      },
    },
  ],
});

Registry.addStore(AuthStore);

export { AuthStore };
