import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {QuestionDto} from "../../@core/dtos/QuestionDto";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {QuestionService} from "../../@core/services/question/question.service";
import {DialogAddComponent} from "../dialog-add/dialog-add.component";
import {AnswerDto} from "../../@core/dtos/AnswerDto";
import {AnswerService} from "../../@core/services/answer/answer.service";
import {MatRadioChange} from "@angular/material/radio";

@Component({
  selector: 'app-dialog-settings',
  templateUrl: './dialog-settings.component.html',
  styleUrls: ['./dialog-settings.component.scss']
})
export class DialogSettingsComponent implements OnInit {
  questionsDto: QuestionDto = new QuestionDto();
  answersDto: AnswerDto = new AnswerDto();
  questions: QuestionDto[] = [];
  answers: AnswerDto[] = [];
  currentQuestion = '';
  currentAnswer = '';
  form!: FormGroup;
  editing: boolean = false;
  correct: any;
  panelOpenState = false;
  correctAnswer!: number;

  constructor(
    public dialogRef: MatDialogRef<DialogSettingsComponent>,
    public dialog: MatDialog,
    private formBuilder: FormBuilder,
    private questionService: QuestionService,
    private answerService: AnswerService,
    @Inject(MAT_DIALOG_DATA) public data: { question: string, answer: string, id: number },
  ) {
  }

  async ngOnInit(): Promise<void> {
    this.initForm();
    await this.getAll();
    await this.getAllByQuestionId('id');
    for (let i = 0; i < 4; i++) {
      let x = new AnswerDto();
      this.answers.push(x);
    }
  }

  initForm(data?: AnswerDto): void {
    this.form = this.formBuilder.group({
      answer: [data && data.answer ? data.answer : '', [Validators.required]],
    })
  }

  onAnswerChange(event: MatRadioChange) {
    console.log(event.value)
    this.correctAnswer = event.value;
  }

  public async getAll(): Promise<void> {
    try {
      this.questions = await this.questionService.getAll();
      console.log(this.questions);
    } catch (error) {
      console.log(error);
    }
  }

  cancel() {
    this.dialogRef.close();
  }

  openDialogAdd() {
    this.dialog.open(DialogAddComponent).afterClosed().subscribe(response => {
    });
  }

  async save(): Promise<void> {
    this.editing = false;
    this.questionsDto.id = this.form.get('id')?.value;
    this.questionsDto.question = this.form.get('question')?.value;
    this.answersDto.answer = this.form.get('answer')?.value;
    console.log(this.form);
    let data1 = await this.questionService.save(this.questionsDto);
    let data2 = await this.answerService.save(this.answersDto);
  }

  async deleteById(questionId: number): Promise<void> {
    console.log(questionId)
    await this.questionService.deleteById(questionId);
  }

  public async update(): Promise<void> {
    try {
      const data1 = await this.questionService.update(this.questionsDto);
      const data2 = await this.answerService.update(this.answersDto);
      this.dialogRef.close(data1);
      this.dialogRef.close(data2);
    } catch (error) {
      console.log(error);
    } finally {
      this.form.reset();
    }
  }

  public async getAllByQuestionId(id: string): Promise<void> {
    try {
      await this.answerService.getAllByQuestionId(id);
      console.log(this.questions);
    } catch (error) {
      console.log(error);
    }
  }
}
