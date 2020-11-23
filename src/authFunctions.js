import { validateSignUp, validateLogin } from "./validation/validation";
import firebase from "./config/firebaseConfig";
import { store } from "./store";

export const signUp = (creds) => {
  return new Promise((resolve, reject) => {
    const { name, email, password, role, track } = creds;
    const result = validateSignUp(email, name, password);
    if (result.errors) {
      store.dispatch({ type: "SIGNUP_FAILED", payload: result.errors });
      return reject();
    } else {
      let signedUser, tokenPromise;
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((res) => {
          signedUser = {
            email: res.user.email,
            uid: res.user.uid,
            status: role,
            name,
          };

          const newUser = {
            email,
            username: name,
            role,
          };
          if (role == "Student") newUser.track = track;
          tokenPromise = res.user.getIdToken();
          return firebase
            .firestore()
            .doc(`/users/${res.user.uid}`)
            .set(newUser);
        })
        .then(() => {
          return tokenPromise;
        })
        .then((token) => {
          store.dispatch({
            type: "LOGIN",
            payload: { user: signedUser, token },
          });
          store.dispatch({ type: "CLEAR_ALL_ERRORS" });
        })
        .catch((err) => {
          if (err.code === "auth/email-already-in-use") {
            store.dispatch({
              type: "SIGNUP_FAILED",
              payload: [{ field: "email", message: "Email already in use" }],
            });
            reject();
          }
        });
    }
  });
};

export const signIn = ({ email, password }) => {
  return new Promise((resolve, reject) => {
    const result = validateLogin(email, password);
    if (result.errors) {
      store.dispatch({ type: "LOGIN_FAILED", payload: result.errors });
      return reject();
    } else {
      let tokenPromise, signedUser;

      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then((res) => {
          tokenPromise = res.user.getIdToken();
          return firebase.firestore().doc(`/users/${res.user.uid}`).get();
        })
        .then((doc) => {
          const user = doc.data();
          signedUser = {
            email: user.email,
            uid: doc.id,
            status: user.role,
            name: user.username,
          };
          return tokenPromise;
        })
        .then((token) => {
          store.dispatch({
            type: "LOGIN",
            payload: { user: signedUser, token },
          });
          store.dispatch({ type: "CLEAR_ALL_ERRORS" });
        })
        .catch((err) => {
          let errors = [];
          if (err.code == "auth/wrong-password") {
            errors.push({
              field: "password",
              message: "Password entered is wrong",
            });
          } else if (err.code == "auth/user-not-found") {
            errors.push({ field: "email", message: "Email entered is wrong" });
          }
          store.dispatch({ type: "LOGIN_FAILED", payload: errors });
          reject();
        });
    }
  });
};

export const logout = () => {
  store.dispatch({ type: "LOGOUT" });
};
