import {Component, OnInit, ViewChild} from '@angular/core';
import {MatAccordion} from "@angular/material/expansion";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {QuestionDto} from "../../@core/dtos/QuestionDto";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";

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
    public dialog: MatDialog,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<QuestionComponent>,
  ) {
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(data?: QuestionDto): void {
    this.form = this.formBuilder.group({
      id: [data && data.id ? data.id : [0]],
      question: [data && data.question ? data.question : '', [Validators.required]]
    },)
  }
}
