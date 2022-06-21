import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {QuestionDto} from "../../@core/dtos/QuestionDto";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {QuestionService} from "../../@core/services/question/question.service";
import {AnswerDto} from "../../@core/dtos/AnswerDto";
import {AnswerService} from "../../@core/services/answer/answer.service";

@Component({
  selector: 'app-dialog-start-game',
  templateUrl: './dialog-start-game.component.html',
  styleUrls: ['./dialog-start-game.component.scss']
})
export class DialogStartGameComponent implements OnInit {
  question: QuestionDto = new QuestionDto();
  answersDto: AnswerDto = new AnswerDto();
  questions: QuestionDto[] = [];
  answers: AnswerDto[] = [];
  form!: FormGroup;
  currentQuestion: number = 0;
  questionList: any = [];
  answer = new Map<any, any>();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { question: string, answer: string, id: number },
    public dialog: MatDialog,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<DialogStartGameComponent>,
    private questionService: QuestionService,
    private answerService: AnswerService,
  ) {
  }

  ngOnInit(): void {
    this.getAll();
  }

  initForm(data?: AnswerDto): void {
    this.form = this.formBuilder.group({
      question: [data && data.question ? data.question : '', [Validators.required]],
      answer: [data && data.answer ? data.answer : '', [Validators.required]],
    });
  }

  public async getAll() {
    try {
      this.questions = await this.questionService.getAll();
      this.questionList = this.questions;
      console.log(this.questionList);
      console.log(this.questions);
    } catch (error) {
      console.log(error);
    }
  }

  nextQuestion() {
    this.currentQuestion++;
  }

  previousQuestion() {
    this.currentQuestion--;
  }

  disable(data: any, option: any) {
    var gvnAnswer = option;
    var correctAnswer = this.questionList[this.currentQuestion].answer;
    this.answer.set(this.currentQuestion, gvnAnswer);
    if (gvnAnswer == correctAnswer) {
      console.log('Right answer')
    } else {
      console.log('Incorrect answer')
    }
  }


  public async getAllByQuestionId(id: number): Promise<any> {
    try {
      const answer: AnswerDto[] = await this.answerService.getAllByQuestionId(id);
      this.answers = answer;
      console.log(answer);
      console.log(this.answers);
    } catch (error) {
      console.log(error);
    }
  }

  isChecked(answers: any) {
    return this.answer.get(this.currentQuestion) === answers;
  }
}
