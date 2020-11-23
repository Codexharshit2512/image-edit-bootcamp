import React from "react";
import { useSelector } from "react-redux";
import AppRouter from "./router/AppRouter";
import jwt_decode from "jwt-decode";
import { store } from "./store";

const token = localStorage.getItem("FbIdToken");
if (token) {
  const decodedToken = jwt_decode(token);
  const expDate = new Date(decodedToken.exp * 1000);
  const currentDate = new Date();
  if (currentDate < expDate) {
    const user = JSON.parse(localStorage.getItem("user"));
    store.dispatch({
      type: "LOGIN",
      payload: { user, token },
    });
  } else store.dispatch({ type: "LOGOUT" });
} else store.dispatch({ type: "LOGOUT" });

function App() {
  return (
    <div className="App">
      <AppRouter />
    </div>
  );
}

export default App;
