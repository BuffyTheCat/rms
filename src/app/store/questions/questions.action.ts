import { createAction, props } from '@ngrx/store';
import { SentAnswer } from 'src/app/shared/interfaces/global-info-interface';

export const SentAnswerAction = createAction(
    '[Questions Page] Sent Answer',
    props<SentAnswer>()
);

export const SentAnswersAction = createAction(
    '[Questions Page] Sent Answers',
    props<{answers: Array<string>}>()
);

export const ClearQuestionsErrorsAction = createAction(
    '[Questions Page] ClearErrors'
);

export const QuestionsErrorAction = createAction(
    '[Questions Page] QuestionError',
    props<{error: string}>()
);

export const QuestionsSuccessAction = createAction(
    '[Questions Page] QuestionsSuccess'
);