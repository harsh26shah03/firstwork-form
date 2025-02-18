import { createContext } from "react";
import { initialState } from "../store/initialState";
import { Action } from "../store/reducer";

export const Context = createContext({
  state: initialState,
  dispatch: (() => {}) as React.Dispatch<Action>
})