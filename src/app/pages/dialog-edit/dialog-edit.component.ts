import {Component, Inject, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {QuestionDto} from '../../@core/dtos/QuestionDto';
import {AnswerDto} from '../../@core/dtos/AnswerDto';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef,} from '@angular/material/dialog';
import {QuestionService} from '../../@core/services/question/question.service';
import {AnswerService} from '../../@core/services/answer/answer.service';
import {AnswerComponent} from "../answer/answer.component";
import {QuestionComponent} from "../question/question.component";

@Component({
  selector: 'app-dialog-edit',
  templateUrl: './dialog-edit.component.html',
  styleUrls: ['./dialog-edit.component.scss'],
})
export class DialogEditComponent implements OnInit {
  @ViewChildren(AnswerComponent) answersComponents!: QueryList<AnswerComponent>;
  @ViewChild(QuestionComponent) questionComponent!: QuestionComponent;
  question: QuestionDto = new QuestionDto();
  answers: AnswerDto[] = [];
  correctAnswerId?: number;
  actionButton = 'Save';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<DialogEditComponent>,
    private questionService: QuestionService,
    private answerService: AnswerService
  ) {
    this.answers = data.answers;
    this.question = data.question;
    this.correctAnswerId = data.answers.filter((x: AnswerDto) => x.isCorrect)[0].id;
  }

  ngOnInit(): void {
    if (this.data) {
      this.actionButton = 'Update';
    }
  }

  cancel() {
    this.dialogRef.close();
  }

  update() {
    console.log('question ', this.question);
    console.log('answers ', this.answers);

    this.questionService.update(this.question);
    this.answers.forEach((answer: AnswerDto) => {
      answer.isCorrect = answer.id === this.correctAnswerId;
      answer.question = this.question;
      this.answerService.update(answer);
    });
    this.dialogRef.close();
  }
}
