const initState = {
  user: {
    name: null,
    uid: null,
    email: null,
    status: null,
  },
  isAuthenticated: false,
};

export const auth = (state = initState, action) => {
  switch (action.type) {
    case "LOGIN":
      const { user, token } = action.payload;
      localStorage.setItem("FbIdToken", JSON.stringify(token));
      localStorage.setItem("user", JSON.stringify(user));
      return {
        user: { ...user },
        isAuthenticated: true,
      };
    case "LOGOUT":
      localStorage.removeItem("FbIdToken");
      localStorage.removeItem("user");
      return initState;

    default:
      return state;
  }
};
