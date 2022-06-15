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
  questionsDto: QuestionDto = new QuestionDto();
  answersDto: AnswerDto = new AnswerDto();
  questions: QuestionDto[] = [];
  answers: AnswerDto[] = [];
  form!: FormGroup;
  editing: boolean = false;

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
    console.log("data ", this.data);
    this.initForm();
  }

  initForm(data?: AnswerDto): void {
    this.form = this.formBuilder.group({
      question: [data && data.question ? data.question : '', [Validators.required]],
      answer: [data && data.answer ? data.answer : '', [Validators.required]],
    });
  }

  public async getById(id: number): Promise<void> {
    try {
      this.questionsDto = await this.questionService.getById(id);
      console.log(this.questionsDto);
    } catch (error) {
      console.log(error);
    }
  }

  public async getAllByQuestionId(id: number): Promise<any> {
    try {
      const answer: AnswerDto[] = await this.answerService.getAllByQuestionId(id);
      this.answers = answer;
      console.log(answer);
    } catch (error) {
      console.log(error);
    }
  }
}
