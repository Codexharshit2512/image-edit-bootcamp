const initState = {
  signInErrors: [],
  signUpErrors: [],
};

export const validation = (state = initState, action) => {
  let errors,
    errorObj = {};
  switch (action.type) {
    case "LOGIN_FAILED":
      errors = action.payload;

      errors.forEach((error) => (errorObj[error.field] = error.message));

      console.log(errorObj);
      return { ...state, signInErrors: errorObj };
    case "SIGNUP_FAILED":
      errors = action.payload;

      errors.forEach((error) => (errorObj[error.field] = error.message));
      console.log(errorObj);
      return { ...state, signUpErrors: errorObj };
    case "CLEAR_ALL_ERRORS":
      return initState;
    default:
      return state;
  }
};
