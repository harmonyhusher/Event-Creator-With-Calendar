import { AppDispatch } from "../..";
import { IUser } from "./../../../models/User";
import {
  AuthActionsEnum,
  SetAuthAction,
  SetIsLoadingAction,
  SetErrorAction,
  SetUserAction,
} from "./types";
import UserService from './../../../api/UserService';

export const AuthActionCreators = {
  setUser: (user: IUser): SetUserAction => ({
    type: AuthActionsEnum.SET_USER,
    payload: user,
  }),
  setIsAuth: (auth: boolean): SetAuthAction => ({
    type: AuthActionsEnum.SET_AUTH,
    payload: auth,
  }),
  setIsLoading: (payload: boolean): SetIsLoadingAction => ({
    type: AuthActionsEnum.SET_IS_LOADING,
    payload,
  }),
  setError: (payload: string): SetErrorAction => ({
    type: AuthActionsEnum.SET_ERROR,
    payload,
  }),
  login:
    (username: string, password: string) => async (dispatch: AppDispatch) => {
      try {
        dispatch(AuthActionCreators.setIsLoading(true));
        setTimeout(async () => {
          const response = await UserService.getUsers()
          const User = response.data.find(
            (user) => user.username === username && user.password === password
          );
          if (User) {
            localStorage.setItem("auth", "true");
            localStorage.setItem("username", User.username);
            dispatch(AuthActionCreators.setIsAuth(true));
            dispatch(AuthActionCreators.setUser(User));
          } else {
            dispatch(AuthActionCreators.setError("Некорректный логин или пароль!"));
          }
          dispatch(AuthActionCreators.setIsLoading(false));
        }, 1000); //имитация запроса
      } catch (error) {
        dispatch(AuthActionCreators.setError("Некорректный логин или пароль!"));
      }
    },
  logout: () => async (dispatch: AppDispatch) => {
    try {
      localStorage.removeItem('auth')
      localStorage.removeItem('username')
      dispatch(AuthActionCreators.setUser({} as IUser))
      dispatch(AuthActionCreators.setIsAuth(false))
    } catch (error) {
      dispatch(AuthActionCreators.setError("Ошибка!"));
    }
  },
};
