import { Component } from '@angular/core';

@Component({
  selector: 'app-calculator',
  standalone: false,
  templateUrl: './calculator.component.html',
  styleUrl: './calculator.component.css'
})
export class CalculatorComponent {

  // user input
  input: string = ''

  // onclick event
  onButtonClick(value: string) {

    // if user selects '=', calc result
    if (value === '=') {

      try {

        // replace division symbol with /
        if (this.input.includes('÷')) {
          this.input = this.input.replaceAll('÷', '/')
        }

        // replace x symbol with *
        if (this.input.includes('x')) {
          this.input = this.input.replaceAll('x', '*')
        }

        // handle modulo/perc toggle
        if (this.input.includes('%')) {

          // check if it is perc (not modulo function ie. no num before + after one %)
          // applies globally for all % numstrings
          const isPerc = !this.input.match(/(\d+)%(\d+)/)

          // global regex for perc num
          const percRegex = /(\d+)%/g
          
          // while there is perc match, replace all perc nums with perc num/100
          if (isPerc) {
            this.input = this.input.replace(percRegex, (match, p1) => { // match is each numstring that matches perc regex, p1 is the number before each %
              return (parseFloat(p1)/100).toString() // converts % into decimal
            })
          }

        }

        this.input = eval(this.input)
      } catch {
        this.input = 'Error' // for errors
      } 

    } else if (value === 'AC') {
      this.clear() // clear display if AC button selected
    } else if (value === '⌫') {
      this.input = this.input.substring(0, this.input.length - 1) // delete last char of input
    } else if (value === '+/-') {
      const lastNum = this.input.match(/[-+]?\d*\.?\d+$/) // get last avail number match as array
      if (lastNum != null) {

        const lastNumStr = lastNum[0] // get last num of array as string

        let toggleNumStr: string = '' // empty string to hold converted num

        if (
          this.input.indexOf(lastNumStr) != 0 && // accounts for if num is at first idx (no + sign)
          lastNumStr.startsWith('-') // accounts for if last num is in sub equation (insert + sign)
        ) {
          toggleNumStr = '+' + (parseFloat(lastNumStr) * -1).toString() // convert num by * -1 and add + sign if previously -
        } else {
          toggleNumStr = (parseFloat(lastNumStr) * -1).toString() // convert num by * -1
        }

        this.input = this.input.replace(lastNumStr, toggleNumStr) // replace old num with converted num

      }
    } else {
      this.input += value // append button selected to input
    }

  }

  // clear display
  clear() {
    this.input = ''
  }

}
