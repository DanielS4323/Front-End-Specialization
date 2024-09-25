import { RootState } from '../rootReducer';

export const getAuthors = (state: RootState) => state.authors.authorsList;
export const isLoadingAuthors = (state: RootState) => state.authors.loading;
export const isErrorAuthors = (state: RootState) => state.authors.error;
