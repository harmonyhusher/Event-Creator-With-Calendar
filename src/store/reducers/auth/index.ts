import { AuthAction, AuthActionsEnum, AuthState } from './types';

const initialState: AuthState = {
    isAuth: false
}

export default function auth(state = initialState, action: AuthAction): AuthState {
    switch (action.type) {
        case AuthActionsEnum.SET_AUTH:
            return {...state, isAuth: action.payload}
        default: 
        return state;
    }
} // указываем в конце тип ауфстейт тк редюсер всегда должен возвращать стейт