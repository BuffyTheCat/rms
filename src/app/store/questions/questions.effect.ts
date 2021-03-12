import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, map, catchError } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '..';
import { SentAnswerAction, ClearQuestionsErrorsAction, QuestionsErrorAction, QuestionsSuccessAction, SentAnswersAction } from './questions.action';

@Injectable()
export class QuestionsEffects {

constructor(
    private actions$: Actions,
    private auth: AuthenticationService,
    private store: Store<AppState>,
    private router: Router
) { }

questions$ = createEffect(() =>
  this.actions$.pipe(
    ofType(SentAnswerAction),
    switchMap(({answer, rememberMe}) => this.auth.checkAnswer({answer, rememberMe}).toPromise()),
    map(() => {
      this.router.navigateByUrl('/home')
      return QuestionsSuccessAction()
    }),
    catchError((caught) => {        
      this.store.dispatch(ClearQuestionsErrorsAction())
      this.store.dispatch(QuestionsErrorAction({error: 'WRONG_ANSWER'}))
      return caught})
  ), { dispatch: false });

  answers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SentAnswersAction),
      switchMap(({answers}) => this.auth.sendAnswer({answers}).toPromise()),
      map(() => {
        this.router.navigateByUrl('/home')
        return QuestionsSuccessAction()
      })
    ), { dispatch: false });
}