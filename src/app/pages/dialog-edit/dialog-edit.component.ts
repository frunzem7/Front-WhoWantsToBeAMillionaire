import {Component, Inject, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {QuestionDto} from "../../@core/dtos/QuestionDto";
import {AnswerDto} from "../../@core/dtos/AnswerDto";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {AnswerComponent} from "../answer/answer.component";
import {QuestionComponent} from "../question/question.component";
import {FormGroup} from "@angular/forms";
import {MatRadioChange} from "@angular/material/radio";
import {QuestionService} from "../../@core/services/question/question.service";
import {AnswerService} from "../../@core/services/answer/answer.service";

@Component({
  selector: 'app-dialog-edit',
  templateUrl: './dialog-edit.component.html',
  styleUrls: ['./dialog-edit.component.scss']
})
export class DialogEditComponent implements OnInit {
  @ViewChildren(AnswerComponent) answersComponents!: QueryList<AnswerComponent>;
  @ViewChild(QuestionComponent) questionComponent!: QuestionComponent;
  question: QuestionDto = new QuestionDto();
  answersDto: AnswerDto = new AnswerDto();
  questions: QuestionDto[] = [];
  answers: AnswerDto[] = [];
  editing: boolean = false;
  form!: FormGroup;
  isCorrect!: number;
  correctAnswer!: number;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<DialogEditComponent>,
    private questionService: QuestionService,
    private answerService: AnswerService,
  ) {
  }

  ngOnInit(): void {
    for (let i = 0; i < 4; i++) {
      let x = new AnswerDto();
      this.answers.push(x);
    }
  }

  onAnswerChange(event: MatRadioChange) {
    console.log(event.value)
    this.correctAnswer = event.value;
  }


  public async getById(id: number): Promise<void> {
    try {
      this.question = await this.questionService.getById(id);
      console.log(this.question);
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

  cancel() {
    this.dialogRef.close();
  }
}
