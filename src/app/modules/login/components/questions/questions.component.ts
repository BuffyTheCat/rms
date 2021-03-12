import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AppState } from '../../../../store';
import { Store } from '@ngrx/store';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { selectError } from 'src/app/store/selectors';
import { SentAnswerAction, SentAnswersAction } from 'src/app/store/questions/questions.action';

@Component({
  selector: 'rms-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class QuestionsComponent implements OnInit {
  logoPath: string = '../../../../../assets/icons/logo.svg';
  answerForm: FormGroup;
  attempts: number = 3;
  errors = this.store.select(selectError);
  question: string = 'What is the name of the city you were born?';
  questionCount: number = 5;
  answers: Array<string> = ['', '', '', '', '', '', '', '', '', '']
  selectedValue: string = 'pet';
  indexOfSelected: number = 0;
  rememberMe: boolean = false;
  hasQuestions;

  questions = [
    {value: 'pet', name: 'What was the name of your first pet?', disabled: false},
    {value: 'street', name: 'What was the street name you lived on when growing up?', disabled: false},
    {value: 'mother', name: 'What is your mother\'s maiden name?', disabled: false},
    {value: 'color', name: 'What is your favorite color?', disabled: false},
    {value: 'school', name: 'What was the name of your high school?', disabled: false},
    {value: 'animal', name: 'What is your favorite animal?', disabled: false},
    {value: 'mascot', name: 'What was your high school mascot?', disabled: false},
    {value: 'car', name: 'What was the make of your first car?', disabled: false},
    {value: 'friend', name: 'What was the name of your best friend growing up?', disabled: false},
    {value: 'city', name: 'What is the name of the city you were born in?, disabled: false'}
  ];

  constructor(private fb: FormBuilder, private router: Router, private store: Store<AppState>, private auth: AuthenticationService) {
    this._createForm()
  }

  questionsControl = new FormControl(this.questions[0].value);


  private _createForm() {
    this.answerForm = this.fb.group({
      answer: ['', [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(128),
        Validators.pattern('(^[a-zA-Z0-9,\s\-]*$)')
      ]],
    })
  }

  get _answer() {
    return this.answerForm.get('answer')
  }

  onChange() {
    this.indexOfSelected = this.questions.findIndex(item => item.value === this.selectedValue);
  }

  onRemember(event) {
    this.rememberMe = event.checked
  }

  onSubmit() {
    if (this.answerForm.invalid) {
      return
    }

    if ( this.hasQuestions ) {
      this.store.dispatch(SentAnswerAction({answer: this.answerForm.value.answer, rememberMe: this.rememberMe}));
    } else {
      if (this.questionCount === 0) {
        this.store.dispatch(SentAnswersAction({answers: this.answers}));
        return
      }
      if (this.answers[this.indexOfSelected] !== this.answerForm.value.answer) {
        this.answers[this.indexOfSelected].length === 0 ? this.questionCount -= 1 : this.questionCount = this.questionCount;
        this.answers[this.indexOfSelected] = this.answerForm.value.answer;
        this.questions[this.indexOfSelected].disabled = true;
        this.selectedValue = this.questions[this.indexOfSelected + 1].value;
        this.answerForm.setValue({answer: ''});
        this.answerForm.markAsPristine();
      }
    }
  }

  ngOnInit(): void {
    this.errors.subscribe((error) => {
      if (error === 'WRONG_ANSWER') {
        this.answerForm.setErrors({ ...this.answerForm.errors, 'invalidAnswer': true });
      }
    })

    this.store.subscribe((store) => {
      this.hasQuestions = store.login.user.hasQuestions;
    })
  }
}
