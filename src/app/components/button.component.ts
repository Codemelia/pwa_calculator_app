import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: false,
  templateUrl: './button.component.html',
  styleUrl: './button.component.css'
})
export class ButtonComponent {

  // takes in button label as input
  // 0-9, + - / x =, <
  @Input()
  button: string = ""

  // emit button clicks as output
  @Output()
  buttonClick = new EventEmitter<string>()

  // sends button input to calc component
  onClick() {
    this.buttonClick.emit(this.button)
  }

}
