import { createAction, props } from '@ngrx/store';
import { User } from 'src/app/shared/interfaces/global-info-interface';

export const loginAction = createAction(
    '[Login Page] Login',
    props<User>()
);

export const loginSuccessAction = createAction(
    '[Login Page] LoginSuccess'
);

export const ClearloginErrorsAction = createAction(
    '[Login Page] ClearErrors'
);

export const loginErrorAction = createAction(
    '[Login Page] LoginError',
    props<{error: string}>()
);