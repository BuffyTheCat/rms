import { createSelector } from '@ngrx/store';
import { AppState } from '.';

const getErrors = (state: AppState) => state.login;
const getMultifactorAccess = (state: AppState) => state.login.user.questionIsAnswered;
const getMultifactorSetting = (state: AppState) => state.login.user.mfa;

export const selectError = createSelector(
    getErrors,
    ({error}) => error
);

export const selectMultifactorAccess = createSelector(
    getMultifactorAccess,
    (questionIsAnswered) => questionIsAnswered
);

export const selectMultifactorSetting = createSelector(
    getMultifactorSetting,
    (mfa) => mfa
);