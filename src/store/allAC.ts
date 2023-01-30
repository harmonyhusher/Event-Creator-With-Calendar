import { AuthActionCreators } from "./reducers/auth/action-creators";
import { EventActionCreators } from "./reducers/auth/event/action-creators";

export const allActionCreators = {
    ...AuthActionCreators,
    ...EventActionCreators
}