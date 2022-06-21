import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {DialogSettingsComponent} from "../dialog-settings/dialog-settings.component";
import {DialogStartGameComponent} from "../dialog-start-game/dialog-start-game.component";
import {AnswerDto} from "../../@core/dtos/AnswerDto";
import {QuestionDto} from "../../@core/dtos/QuestionDto";
import {QuestionService} from "../../@core/services/question/question.service";

@Component({
  selector: 'app-start-page',
  templateUrl: './start-page.component.html',
  styleUrls: ['./start-page.component.scss'],
})
export class StartPageComponent implements OnInit {
  public form!: FormGroup;
  answers: AnswerDto[] = [];
  questions: QuestionDto[] = [];

  constructor(
    public dialog: MatDialog,
    public formBuilder: FormBuilder,
    private questionService: QuestionService,
  ) {
  }

  ngOnInit(): void {

  }

  openDialog() {
    this.dialog.open(DialogStartGameComponent).afterClosed().subscribe(response => {
    });
    // this.dialog.open(DialogStartGameComponent, {
    //   data: {
    //     question,
    //     answers: this.answers
    //   }
    // })
    //   .afterClosed()
    //   .subscribe(response => {
    //   });
  }

  openDialogSettings() {
    this.dialog.open(DialogSettingsComponent).afterClosed().subscribe(response => {
    });
  }
}
