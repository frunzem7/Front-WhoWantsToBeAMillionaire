import {Component, Inject, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {QuestionDto} from "../../@core/dtos/QuestionDto";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {AnswerDto} from "../../@core/dtos/AnswerDto";
import {QuestionComponent} from "../question/question.component";
import {AnswerService} from "../../@core/services/answer/answer.service";
import {MatRadioChange} from "@angular/material/radio";
import {AnswerComponent} from "../answer/answer.component";
import {QuestionService} from "../../@core/services/question/question.service";

@Component({
  selector: 'app-dialog-add',
  templateUrl: './dialog-add.component.html',
  styleUrls: ['./dialog-add.component.scss']
})
export class DialogAddComponent implements OnInit {
  @ViewChildren(AnswerComponent) answersComponents!: QueryList<AnswerComponent>;
  @ViewChild(QuestionComponent) questionComponent!: QuestionComponent;
  question: QuestionDto = new QuestionDto();
  answersDto: AnswerDto = new AnswerDto();
  answers: AnswerDto[] = [];
  editing: boolean = false;
  form!: FormGroup;
  isCorrect!: number;
  correctAnswer!: number;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog,
    private answerService: AnswerService,
    private questionService: QuestionService,
    public dialogRef: MatDialogRef<DialogAddComponent>,
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

  public async save(): Promise<void> {
    console.log(this.question);
    console.log(this.questionComponent);
    this.question.question = this.questionComponent.form.get("question")?.value;
    let questionDto = await this.questionService.save(this.question);
    this.editing = false;
    console.log(this.questionComponent.form)
    console.log(questionDto)
    console.log(this.answers[this.correctAnswer])
    console.log(this.correctAnswer)
    console.log(this.answersComponents)
    for (let i = 0; i < this.answers.length; i++) {
      this.answers[i].answer = this.answersComponents.get(i)?.answer;
      this.answers[i].question = questionDto;
    }
    console.log(this.answers)
    this.answers[this.correctAnswer].isCorrect = true;
    for (let i = 0; i < this.answers.length; i++) {
      let a = await this.answerService.save(this.answers[i]);
    }
  }

  public async update(): Promise<void> {
    try {
      const data1 = await this.questionService.update(this.question);
      const data2 = await this.answerService.update(this.answersDto);
      this.dialogRef.close(data1);
      this.dialogRef.close(data2);
    } catch (error) {
      console.log(error);
    } finally {
      this.form.reset();
    }
  }

  cancel() {
    this.dialogRef.close();
  }
}
