import { combineReducers } from "redux";
import { auth } from "./auth";
import { validation } from "./validation";

export const root = combineReducers({
  auth: auth,
  validation: validation,
});
