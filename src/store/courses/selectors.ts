import { RootState } from '../rootReducer';

export const getCourses = (state: RootState) => state.courses.courses;
export const isLoadingCourses = (state: RootState) => state.courses.loading;
export const isErrorCourses = (state: RootState) => state.courses.error;
