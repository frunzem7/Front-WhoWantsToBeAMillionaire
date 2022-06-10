import {Component, Inject, Input, OnInit} from '@angular/core';
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
  @Input() title: string | undefined;
  questionsDto: QuestionDto = new QuestionDto();
  answersDto: AnswerDto = new AnswerDto();
  questions: QuestionDto[] = [];
  answers: AnswerDto[] = [];
  form!: FormGroup;
  editing: boolean = false;
  mainPage: QuestionDto = new QuestionDto();

  constructor(
    public dialog: MatDialog,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<DialogStartGameComponent>,
    private questionService: QuestionService,
    private answerService: AnswerService,
    @Inject(MAT_DIALOG_DATA) public data: { question: string, answer: string, id: number },
  ) {
  }

  ngOnInit(): void {
    this.initForm();
    this.getAll();
    this.getById(this.data.id);
    for (let i = 0; i < 4; i++) {
      let x = new AnswerDto();
      this.answers.push(x);
    }
  }

  initForm(data?: QuestionDto): void {
    this.form = this.formBuilder.group({
      id: [[data && data.id ? data.id : ''], [Validators.required]],
      question: [[data && data.question ? data.question : ''], [Validators.required]],
    });
  }

  public async getAll(): Promise<void> {
    try {
      this.questions = await this.questionService.getAll();
      console.log(this.questions);
    } catch (error) {
      console.log(error);
    }
  }

  public async getById(id: number): Promise<void> {
    try {
      this.answers = await this.answerService.getById(id);
      console.log(this.answers);
    } catch (error) {
      console.log(error);
    }
  }
}
