import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-buttons',
  standalone: false,
  templateUrl: './buttons.component.html',
  styleUrl: './buttons.component.css'
})
export class ButtonsComponent {

  // outputs button clicks
  @Output()
  buttonPress = new EventEmitter<string>()

  // button labels array
  buttons: string[] = [
    'AC', '+/-', '%', '÷',
    '7', '8', '9', 'x',
    '4', '5', '6', '-',
    '1', '2', '3', '+',
    '.', '0', '=', '⌫'
  ]

  // emits values to calc component
  onButtonClick(value: string) {
    this.buttonPress.emit(value)
  }

}
