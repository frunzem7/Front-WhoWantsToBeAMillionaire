import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MatAccordion} from "@angular/material/expansion";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {QuestionDto} from "../../@core/dtos/QuestionDto";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {AnswerDto} from "../../@core/dtos/AnswerDto";

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {
  @ViewChild(MatAccordion) accordion!: MatAccordion;
  panelOpenState = false;
  form!: FormGroup;
  editing: boolean = false;
  public questions: QuestionDto[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<QuestionComponent>,
  ) {
  }

  ngOnInit(): void {
    this.initForm();
    for (let i = 0; i < 15; i++) {
      let x = new QuestionDto();
      this.questions.push(x);
    }
  }

  initForm(data?: QuestionDto): void {
    this.form = this.formBuilder.group({
      id: [data && data.id ? data.id : [0]],
      question: [data && data.question ? data.question : '', [Validators.required]]
    },)
  }
}
