import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import { reducerRoot } from "./reducerRoot";
import { initialState } from "./initialState";

export function configureStore() {
  const middlewares = [thunk];

  const finalCreateStore = composeWithDevTools(applyMiddleware(...middlewares))(
    createStore
  );

  const store = finalCreateStore(reducerRoot, initialState);

  return store;
}
