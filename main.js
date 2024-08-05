const gameName = "Guess The Word";
document.title = gameName;
document.querySelector("h1").innerHTML = gameName;
document.querySelector("footer").innerHTML = `${gameName} Game By A.Shams`;

const NumOfTries = 6;
const NumOfLetters = 6;
let currentIndex = 1;
const programmingWords = [
  "python",
  "github",
  "binary",
  "object",
  "string",
  "method",
];

let dir = {
  python: " y , t , h , a , e , l , r , z , q , w , p , o , n , u ",
  github: " m , o , k , x , j , s , g , h , b , i , c , u , t , p ",
  binary: " w , t , z , q , l , b , a , i , y , m , n , f , r , u ",
  object: " d , e , t , v , b , n , j , s , k , o , m , c , r , l ",
  string: " o , k , d , h , l , s , r , b , e , i , g , n , m , t ",
  method: " q , d , h , p , l , m , c , r , e , s , a , t , n , o ",
};



const wordGuess = String(
  programmingWords[
    Math.floor(Math.random() * programmingWords.length)
  ].toLowerCase()
);
let numberOfHints = 2;
let msessage_success = document.querySelector(".message");
document.querySelector(".hint span").innerHTML = numberOfHints;
const getHintButton = document.querySelector( ".hint" );
let wordes = document.querySelector(".words");

if (wordGuess === "python") wordes.innerHTML = `[ ${dir.python} ]`;
if (wordGuess === "github") wordes.innerHTML = `[ ${dir.github} ]`;
if (wordGuess === "binary") wordes.innerHTML = `[ ${dir.binary} ]`;
if (wordGuess === "object") wordes.innerHTML = `[ ${dir.object} ]`;
if (wordGuess === "string") wordes.innerHTML = `[ ${dir.string} ]`;
if (wordGuess === "method") wordes.innerHTML = `[ ${dir.method} ]`;

console.log(wordGuess);

function genInputs() {
  let inn = document.querySelector(".inputs");
  for (let i = 1; i <= NumOfTries; i++) {
    let MyDiv = document.createElement("div");
    MyDiv.classList.add(`try-${i}`);
    MyDiv.innerHTML = `<span>Try ${i}</span>`;
    inn.appendChild(MyDiv);

    if (i !== 1) MyDiv.classList.add("disabled-inputs");

    for (let j = 1; j <= NumOfLetters; j++) {
      let MyInput = document.createElement("input");
      MyInput.type = "text";
      MyInput.id = `guess-${i}-letter-${j}`;
      MyInput.setAttribute("maxlength", "1");
      MyDiv.appendChild(MyInput);
    }
  }

 
  inn.children[0].children[1].focus();

  const inputsInDisabledDiv = document.querySelectorAll(
    ".disabled-inputs input"
  );
  inputsInDisabledDiv.forEach((i) => i.setAttribute("disabled", "true"));

  const inputs = document.querySelectorAll("input");
  inputs.forEach((input, index) => {
    input.addEventListener("input", function () {
    input.value = input.value.toUpperCase();
    let nextInput = inputs[index + 1];

    // Move focus to the next input if the current input is not empty
    if ( nextInput) {
        
        if ( nextInput.value !== "" ) {
            nextInput = inputs[index + 2];
            nextInput.focus(); 
            console.log(1)
        } 
        else {
            nextInput.focus();
        }
    }
    });
    input.addEventListener("keydown", function (e) {
      const currentIndex = Array.from(inputs).indexOf(e.target);
      if (e.key === "ArrowRight") {
        const nextInput = currentIndex + 1;
        if (nextInput < inputs.length) inputs[nextInput].focus();
      }
      if (e.key === "ArrowLeft") {
        const prevInput = currentIndex - 1;
        if (prevInput >= 0) inputs[prevInput].focus();
      }
    });
  });
}

const guessButton = document.querySelector(".check");
guessButton.addEventListener("click", handleGuesses);

function handleGuesses() {
  let success = true;

  for (let i = 1; i <= NumOfLetters; i++) {
    let inputWord = document.querySelector(
      `#guess-${currentIndex}-letter-${i}`
    );
    console.log(inputWord);

    let car = inputWord.value.toLowerCase();
    let correctWord = wordGuess[i - 1];
    console.log(car);
    console.log(correctWord);
    if (car == correctWord) {
      inputWord.classList.add("yes-in-place");
    } else if (wordGuess.includes(car) && car !== "") {
      inputWord.classList.add("not-in-place");
      success = false;
    } else {
      inputWord.classList.add("no");
      success = false;
    }
  }

  if (success) {
      msessage_success.innerHTML = `You Win The Word Is <span>${ wordGuess }</span>`;
        document.querySelector(".rest").innerHTML =
          "<button>Play Again</button>";
      document.querySelector(".rest").style.marginTop="20px"
    if (numberOfHints === 2) {
        msessage_success.innerHTML = `<p>You Win The Word Is <span>${ wordGuess }</span></p> <p>Congratz You Didn't Use Hints</p>`;
       document.querySelector(".rest").style.marginTop = "0px";
    }
    getHintButton.disabled = true;
    guessButton.disabled = "true";
    let dis = document.querySelectorAll(".inputs > div");
    dis.forEach((disabledd) => disabledd.classList.add("disabled-inputs"));
  } else {
    document
      .querySelector(`.try-${currentIndex}`)
      .classList.add("disabled-inputs");
    const currentTryInputs = document.querySelectorAll(
      `.try-${currentIndex} input`
    );
    currentTryInputs.forEach((input) => (input.disabled = true));

    currentIndex++;

    const nextTryInputs = document.querySelectorAll(
      `.try-${currentIndex} input`
    );
    nextTryInputs.forEach((input) => (input.disabled = false));
    let el = document.querySelector(`.try-${currentIndex}`);
    if (el) {
      document
        .querySelector(`.try-${currentIndex}`)
        .classList.remove("disabled-inputs");
      el.children[1].focus();
    } else {
      // Disable Guess Button
      guessButton.disabled = true;
      getHintButton.disabled = true;
        msessage_success.innerHTML = `You Lose The Word Is <span>${ wordGuess }</span>`;
        document.querySelector(
          ".rest"
        ).innerHTML = "<button>Play Again</button>";
        document.querySelector(".rest").style.marginTop = "20px";
    }
  }
}

getHintButton.addEventListener("click", getHint);

function getHint() {
  if (numberOfHints > 0) {
    numberOfHints--;
    document.querySelector(".hint span").innerHTML = numberOfHints;
  }
  if (numberOfHints == 0) {
    getHintButton.disabled = true;
  }

  const not_dis_input = document.querySelectorAll("input:not([disabled])");
  const empty = Array.from(not_dis_input).filter((input) => input.value === "");
  if (empty.length > 0) {
    const randomIndex1 = Math.floor(Math.random() * empty.length);
    randomInput = empty[randomIndex1];
    const inputR = Array.from(not_dis_input).indexOf(randomInput);
    console.log(inputR);

    if (empty.length !== -1) {
      randomInput.value = wordGuess[inputR].toUpperCase();
    }
  }
}

let c = 0;
function handleBack(e) {
  if (e.key === "Backspace") {
    const inputs = document.querySelectorAll("input:not([disabled])");
    const currentIndex = Array.from(inputs).indexOf(document.activeElement);

    if (currentIndex >= 0) {
      if (currentIndex === inputs.length - 1 && c === 0) {
        inputs[currentIndex].value = "";
        c = 1;
      } else if (currentIndex > 0) {
        inputs[currentIndex].value = "";
        inputs[currentIndex - 1].value = "";
        inputs[currentIndex - 1].focus();
        c = 0;
      }
      e.preventDefault();
    }
  }
}

let res = document.querySelector(".rest");
res.onclick = function () {
  window.location.reload();
};

document.addEventListener("DOMContentLoaded", () => {
  const toggleButton = document.querySelector(".toggle");
  const body = document.body;

  // Load the user's mode preference from localStorage if available
  if (localStorage.getItem("theme") === "dark") {
    body.classList.add("dark-mode");
    toggleButton.classList.remove("fa-moon");
    toggleButton.classList.add("fa-sun");
  }

  toggleButton.addEventListener("click", () => {
    body.classList.toggle("dark-mode");

    // Change icon based on the current mode
    if (body.classList.contains("dark-mode")) {
      toggleButton.classList.remove("fa-moon");
      toggleButton.classList.add("fa-sun");
      localStorage.setItem("theme", "dark");
    } else {
      toggleButton.classList.remove("fa-sun");
      toggleButton.classList.add("fa-moon");
      localStorage.setItem("theme", "light");
    }
  });
});



document.addEventListener("keydown", handleBack);
window.onload = genInputs();
