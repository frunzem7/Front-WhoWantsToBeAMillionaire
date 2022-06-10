import {Component, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AnswerDto} from "../../@core/dtos/AnswerDto";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.scss']
})
export class AnswerComponent implements OnInit {
  @Output() answer = '';
  form!: FormGroup;
  editing: boolean = false;
  mainPage: AnswerDto = new AnswerDto();


  constructor(
    public dialog: MatDialog,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<AnswerComponent>,
  ) {
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(data?: AnswerDto): void {
    this.form = this.formBuilder.group({
      answer: [data && data.answer ? data.answer : '', [Validators.required]],
    })
  }

  onAnswerChange() {
    this.answer = this.form.get("answer")?.value;
  }
}
