import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {DialogSettingsComponent} from "../dialog-settings/dialog-settings.component";
import {DialogStartGameComponent} from "../dialog-start-game/dialog-start-game.component";

@Component({
  selector: 'app-start-page',
  templateUrl: './start-page.component.html',
  styleUrls: ['./start-page.component.scss'],
})
export class StartPageComponent implements OnInit {
  public form!: FormGroup;

  constructor(
    public dialog: MatDialog,
    public formBuilder: FormBuilder,
  ) {
  }

  ngOnInit(): void {

  }

  openDialog() {
    this.dialog.open(DialogStartGameComponent).afterClosed().subscribe(response => {
    });
  }

  openDialogSettings() {
    this.dialog.open(DialogSettingsComponent).afterClosed().subscribe(response => {
    });
  }
}
