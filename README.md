## The Odin Project: Calculator
This is the [final project](https://www.theodinproject.com/lessons/foundations-calculator) from the **Foundations** section.

### Assignment

- make an on-screen calculator using JavaScript, HTML, and CSS
- make functions for all the basic math operations - add, subtract, multiply, divide
- create a new function `operate` that takes an operator and 2 numbers and then calls one of the above functions on the numbers
- create buttons for each digit, each of the above functions and an 'equals' key
- there should also be a display for the calculator; create functions that populate the display when you click the number buttons

### Things to watch out for


- **calculator should not evaluate more than a single pair of numbers at a time**. Users should be able to string together 
several operations and get the right answer. `12 + 7 - 5 * 3 =` should yield `42`. Example: you press a number 
button (`12`), followed by an operator button (`+`), a second number button (`7`), and finally a second operator button (`-`).
Your calculator should then do the following: first, evaluate the first pair of numbers (`12 + 7`), second, display the 
result of that calculation (`19`), and finally, use that result (`19`) as the first number in your new calculation, along 
with the next operator (`-`).
- **do not use** `eval()`, you should build your own functions to evaluate expressions as part of this calculator project
- be sure to round answers with long decimals so that they don’t overflow the screen
- pressing `=` before entering all of the numbers or an operator could cause problems
- division by 0
- pressing `clear` should wipe out any existing data

### Extra credit
- add decimal numbers support and make sure to disable the decimal button if there’s already one decimal separator in 
the display
- add 'backspace' button
- add keyboard support
- add CSS styling

### Final result
- finished all the assignments (including the extra credit)
- added horizontal scrollbar to calculator display, for when user inputs long numbers
- design was (heavily) inspired by iOS calculator app

Live preview: https://humanathome.github.io/calculator/
