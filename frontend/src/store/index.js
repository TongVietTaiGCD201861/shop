import { combineReducers } from "redux";
import { createStore, applyMiddleware, compose } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import counter from "./reducers/counter";
import user from "./reducers/user";
import cart from "./reducers/cart"

const allReducers = combineReducers({
  counter,
  user,
  cart

  // add more if needed
});

const persistsConfig = {
  key: "root",
  storage,
  whitelist: ["counter", "user", "cart"],
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const persistedReducer = persistReducer(persistsConfig, allReducers);

export const store = createStore(
  persistedReducer,
  composeEnhancers(applyMiddleware())
);

export const persistor = persistStore(store);
