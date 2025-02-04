
const store = new Vuex.Store({
    state: {
      token: localStorage.getItem("jwt") || null, 
    },
    mutations: {
      setToken(state, token) {
        state.token = token;
        localStorage.setItem("jwt", token);  
      },
      logout(state) {
        state.token = null;
        localStorage.removeItem("jwt"); 
      },
    },
    actions: {
      login({ commit }, token) {
        commit("setToken", token);
      },
      logout({ commit }) {
        commit("logout");
      },
    },
  });
  