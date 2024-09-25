import { RootState } from '../rootReducer';

export const getUserName = (state: RootState) => state.user.name;
export const getRole = (state: RootState) => state.user.role;
export const isRoleAdmin = (state: RootState) => state.user.isAdmin;
export const getUserEmail = (state: RootState) => state.user.email;
export const getUserToken = (state: RootState) => state.user.token;
export const getUserIsAuth = (state: RootState) => state.user.isAuth;
export const isUserLoading = (state: RootState) => state.user.loading;
