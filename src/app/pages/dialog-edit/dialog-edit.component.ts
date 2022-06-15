import {Component, Inject, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {QuestionDto} from "../../@core/dtos/QuestionDto";
import {AnswerDto} from "../../@core/dtos/AnswerDto";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {AnswerComponent} from "../answer/answer.component";
import {QuestionComponent} from "../question/question.component";
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatRadioChange} from "@angular/material/radio";
import {QuestionService} from "../../@core/services/question/question.service";
import {AnswerService} from "../../@core/services/answer/answer.service";
import {MatSelectChange} from "@angular/material/select";

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
  actionButton = 'Save';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<DialogEditComponent>,
    private questionService: QuestionService,
    private answerService: AnswerService,
    private formBuilder: FormBuilder,
  ) {
  }

  ngOnInit(): void {
    console.log("data ", this.data);
    this.initForm();
    if (this.data) {
      this.actionButton = 'Update';
    }
    console.log("form ", this.form);
  }

  initForm(): void {
    const correctAnswer = this.data?.answers?.filter((item: AnswerDto) => item.isCorrect);
    this.answers = [...this.data?.answers];
    this.form = this.formBuilder.group({
      question: [this.data?.question?.question ?? '', [Validators.required]],
      answerGroup: this.formBuilder.group({
        answers: this.formBuilder.array(this.answers)
      })
    })
  }

  patch() {
    const control = <FormArray>this.form.get('answerGroup.answers');
    console.log(control.value);
    console.log(this.answers);
    // control.setValue([]);
    this.answers.forEach(x => {
      control.push(this.patchValues(x.isCorrect, x.answer, x.id))
    });
  }

// assign the values
  patchValues(isCorrect: boolean, answer: string | undefined, id: number) {
    return this.formBuilder.group({
      isCorrect: [isCorrect],
      answer: [answer],
      id: [id]
    })
  }

  onAnswerChange(event: any) {
  //   // console.log(this.answers);
  //   console.log(event);
  //   const answerToSave = this.answers.filter(a=>a.id == event.value);
  //   answerToSave.isCorrect = true;
  //   this.answerService.update(this.answers,)

    (this.form.get('answerGroup.answers')?.value as any[]).forEach(answer=>{
        answer.isCorrect = answer.id === event.value;
        this.answerService.update(answer);
    });

    // console.log(this.form);
    //
    // this.correctAnswer = event.value;
    // console.log(this.correctAnswer);
    // for (let i = 0; i < this.answers.length; i++) {
    //   this.answers[i].isCorrect = false;
    //   if (this.answers[i].id == this.correctAnswer) {
    //     this.answers[i].isCorrect = true;
    //   }
    // }
    //
    // console.log(this.answers);
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

  public async update(): Promise<void> {
    // try {
    //   const data = await this.answerService.update(this.answersDto);
    //   console.log(data);
    // } catch (error) {
    //   console.log(error);
    // } finally {
    //   this.form.reset();
    // }
    // this.dialogRef.close();
    //await this.questionService
  }

  cancel() {
    this.dialogRef.close();
  }

  onSubmit() {
    console.log(this.answers);
    this.form.get('answers')?.setValue([]);
    console.log("form ", this.form)
  }

  async updateAnswer(answer: any, event: any) {
    // console.log(event);
    // console.log(answer);
    // for (let i = 0; i < this.answers.length; i++) {
    //   if (this.answers[i].id == answer.id) {
    //     this.answers[i].answer = event.srcElement.value;
    //   }
    // }
    // console.log(this.answers);
    await this.answerService.update(answer);
  }

  async updateQuestion(){
    const question = this.form.get('question')?.value;
   await this.questionService.update(question);
  }
}
