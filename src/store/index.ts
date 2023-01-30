import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import auth from "./reducers/auth";
import event from "./reducers/auth/event";

const rootReducer = combineReducers({
  auth,
  event,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
