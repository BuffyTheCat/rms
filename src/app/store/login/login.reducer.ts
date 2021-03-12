import { loginSuccessAction, loginErrorAction, ClearloginErrorsAction } from './login.action';
import { Action, createReducer, on } from '@ngrx/store';
import { UserInfo } from 'src/app/shared/interfaces/global-info-interface';
import { QuestionsErrorAction, QuestionsSuccessAction } from '../questions/questions.action';

export interface LoginState {
    user: UserInfo
    error: any
}

export const initialState: LoginState = {
    user: {
        provider: 'RMS QA Domain',
        name: 'Lenny Belardo',
        system: 'St Johns RMS Health System',
        hasQuestions: false,
        questionIsAnswered: false,
        mfa: false
    },
    error: null
};    

const loginReducer = createReducer(
    initialState,
    on(loginSuccessAction, (state) => {
        // here you return user data to state
        const user = {
            role: 'Provider',
            company: 'RMS QA Domain',
            name: 'Clark Kent',
            system: 'St Johns RMS Health System'
        }

        return {
            ...state,
            user: {...state.user, user},
            error: null
        }
    }),
    on(loginErrorAction, (state, { error }) => {    
        return {
            ...state,
            error: error
        }
    }),
    on(QuestionsErrorAction, (state, { error }) => {    
        return {
            ...state,
            error: error
        }
    }),
    on(QuestionsSuccessAction, (state) => {    
        return {
            ...state,
            user: { 
                ...state.user,
                user: {
                    hasQuestions: true,
                    questionIsAnswered: true
                }
            }
        }
    }),
    on(ClearloginErrorsAction, (state) => {                             
        return {
            ...state,
            error: null
        }
    })
);

export function reducer(state: LoginState | undefined, action: Action) {
    return loginReducer(state, action)
}