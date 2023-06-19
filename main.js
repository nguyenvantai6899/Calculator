let number = document.querySelectorAll(".numbers");
let result = document.querySelector("#result");
let input = document.querySelector("#input");
let clear = document.querySelector("#clear");
let opr = document.querySelector(".operators");

let resultInput = 0;
let operators = [];
let numOpr = [];
let value ;
numberString = '';
//cut array

//result
function finalResult(string) {
  for (let i = 0; i < string.length; i++) {
    value = string[i];
    if (value != "+" && value != "-" && value != "*" && value != "/") {    
      numberString += value
    } else {
      numOpr.push(parseFloat(numberString));
      numberString = '';
      if (
        operators.length > 0 &&
        compareOpr(value) >= compareOpr(operators[operators.length - 1])
      ) {
        resultInput = calculator(numOpr, operators);
      }      
      operators.push(value);
    }
  }
  numOpr.push(parseFloat(numberString));
  numberString = '';
  while (operators.length > 0) {
    resultInput = calculator(numOpr, operators);
  }
  return resultInput;
}

//order of calculations
function compareOpr(opr) {
  if (opr == "+" || opr == "-") {
    return 1;
  } else {
    return 0;
  }
}

//do the math
function calculator(numOpr, operators) {
  var operator = operators.pop();
  var number_2 = numOpr.pop();
  var number_1 = numOpr.pop();
  switch (operator) {
    case "+":
      resultInput = number_1 + number_2;
      break;
    case "-":
      resultInput = number_1 - number_2;
      break;
    case "*":
      resultInput = number_1 * number_2;
      break;
    case "/":
      resultInput = number_1 / number_2;
      break;
    default:
      break;
  }
  numOpr.push(resultInput);
  return resultInput;
}

//enter number
number.forEach((number) => {
  for (const key of number.children) {
    key.onclick = (event) => {
      if (key.innerHTML != "C") {
        input.innerText += key.innerHTML;
      }
    };
  }
});

//choose operator
opr.onclick = (event) => {
  if (event.target.className != "operators") {
    input.innerText += event.target.innerHTML;
  }
};

// fress "="
var equalSign = (result.onclick = (event) => {
  let inputValue = input.innerText;
  inputValue = inputValue.split(/([^0-9])/);
  let inputResult = finalResult(inputValue);
  if (isNaN(inputResult)) {
    input.innerText = "Wrong calculation";
  } else {
    input.innerText = inputResult;
  }
});

//clear monitor
var clearMonitor = (clear.onclick = (event) => {
  input.innerText = "";
});


//enter from keyboard
var keyArr = [
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "+",
  "-",
  "*",
  "/",
  ".",
];
document.addEventListener("keydown", (event) => {
  var key = event.key;
  for (let i = 0; i < keyArr.length; i++) {
    if (key === keyArr[i]) {
      input.innerText += key;
    }
    if (key === "Enter") {
      equalSign();
    }
    if (key === "Backspace"){
      clearMonitor();
    }
  }

  // do something
});

//
