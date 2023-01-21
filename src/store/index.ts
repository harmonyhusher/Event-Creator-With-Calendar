import {createStore, combineReducers, applyMiddleware} from "redux"
import thunk from "redux-thunk"
import auth from "./reducers/auth"

const rootReducer = combineReducers({
    auth
})

export const store = createStore(rootReducer, applyMiddleware(thunk))

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch