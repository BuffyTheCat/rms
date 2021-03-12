import { createAction, props } from '@ngrx/store';
import { ChangePass } from 'src/app/shared/interfaces/global-info-interface';

export const ResetPasswordAction = createAction(
    '[Reset password Page] reset password',
    props<ChangePass>()
);