// script.js

let clickCount = 0;

function handleClick() {
  clickCount = clickCount + 1;
  let outputBox = document.getElementById("output");
  outputBox.textContent = "Button clicked " + clickCount + " time(s)!";
}

function greet() {
  let input  = document.getElementById("nameInput");
  let result = document.getElementById("greeting");
  let name   = input.value.trim();

  if (name === "") {
    result.textContent = "Please type your name first.";
  } else {
    result.textContent = "Hello, " + name + "! Welcome to the web.";
  }
}