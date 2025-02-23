import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CalculatorComponent } from './components/calculator.component';
import { DisplayComponent } from './components/display.component';
import { ButtonsComponent } from './components/buttons.component';
import { ButtonComponent } from './components/button.component';

@NgModule({
  declarations: [
    AppComponent,
    CalculatorComponent,
    DisplayComponent,
    ButtonsComponent,
    ButtonComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
