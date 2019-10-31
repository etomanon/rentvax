import { createStore, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import { reducerRoot } from "./reducerRoot";
import { initialState } from "./initialState";

export function configureStore() {
  const middlewares = [thunk];
  let composeEnhancers = compose;
  if (
    process.env.NODE_ENV !== "production" &&
    (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ) {
    composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
  }

  const finalCreateStore = composeEnhancers(applyMiddleware(...middlewares))(
    createStore
  );

  const store = finalCreateStore(reducerRoot, initialState);

  return store;
}
