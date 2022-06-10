import {Injector, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {createCustomElement} from "@angular/elements";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {DemoMaterialModule} from "./material-module";
import {HttpClientModule} from "@angular/common/http";
import {StartPageComponent} from './pages/start-page/start-page.component';
import {DialogSettingsComponent} from './pages/dialog-settings/dialog-settings.component';
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {DialogStartGameComponent} from './pages/dialog-start-game/dialog-start-game.component';
import {DialogAddComponent} from './pages/dialog-add/dialog-add.component';
import {QuestionComponent} from './pages/question/question.component';
import {AnswerComponent} from './pages/answer/answer.component';
import {MatNativeDateModule} from "@angular/material/core";
import { DialogEditComponent } from './pages/dialog-edit/dialog-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    StartPageComponent,
    DialogStartGameComponent,
    DialogSettingsComponent,
    DialogAddComponent,
    QuestionComponent,
    AnswerComponent,
    DialogEditComponent,
  ],

  imports: [
    BrowserModule,
    DemoMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatIconModule,
    MatButtonModule,
    MatNativeDateModule,
  ],
  bootstrap: [
    AppComponent,
    StartPageComponent,
    DialogStartGameComponent,
    DialogSettingsComponent,
    DialogAddComponent,
    QuestionComponent,
    AnswerComponent,
  ]
})
export class AppModule {
  constructor(private injector: Injector) {
    const mainPage = createCustomElement(StartPageComponent, {injector: this.injector});
    customElements.define('main-page', mainPage);
  }
}
