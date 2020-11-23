import { createStore, applyMiddleware } from "redux";
import { root } from "./redux/reducers/root";

export const store = createStore(root);
