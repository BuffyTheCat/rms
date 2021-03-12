import { ActionReducerMap } from '@ngrx/store';
import { AuthEffects } from './login/login.effect';
import * as login from './login/login.reducer';
import * as queue from './main/main.reducer';
import { LogoutEffects } from './logout/logout.effect';
import { ResetPasswordEffects } from './reset-password/reset-password.effect';
import { QuestionsEffects } from './questions/questions.effect';
import { QueueEffects } from './main/main.effect';

export interface AppState {
    login: login.LoginState;
    queue: queue.QueueState;
}

export const appReducers: ActionReducerMap<AppState> = {
    login: login.reducer,
    queue: queue.reducer,
};

export const APP_EFFECTS = [
    AuthEffects,
    LogoutEffects,
    ResetPasswordEffects,
    QuestionsEffects,
    QueueEffects
];
