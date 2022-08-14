// # background random
const bgList = ["bg1.jpg", "bg2.jpg", "bg3.jpg"];
const randomBackground = bgList[Math.floor(Math.random() * bgList.length)];
document.body.style = `background-image: url(./images/${randomBackground})`;

// # clock
const secClock = document.querySelector(".clock-wrap");
const clock = secClock.querySelector(".time");
const date = secClock.querySelector(".date");
const colorList = ["#1abc9c", "#3498db", "#9b59b6", "#f39c12", "#e74c3c"];

function onColorChange() {
  let randomColor = colorList[Math.floor(Math.random() * colorList.length)];
  clock.style.color = randomColor;
}

function onClock() {
  const current = new Date();
  const hours = String(current.getHours()).padStart(2, "0");
  const minutes = String(current.getMinutes()).padStart(2, "0");
  const seconds = String(current.getSeconds()).padStart(2, "0");
  clock.innerText = `${hours}:${minutes}:${seconds}`;

  const year = current.getFullYear();
  const month = current.getMonth() + 1;
  const days = current.getDate();
  const weekArr = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const week = weekArr[current.getDay()];

  date.innerText = `${year}/${month}/${days} ${week}`;
}

onClock();
setInterval(onClock, 1000);
setInterval(onColorChange, 5000);

// # weather
const secWeather = document.querySelector(".weather-wrap");
const WEATHER_API_KEY = "7a0466a05b100ef57621688692f3a3c3";

function onWeatherSuccess(e) {
  const lat = e.coords.latitude;
  const lon = e.coords.longitude;
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`;
  console.log(url);

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const city = secWeather.querySelector(".city");
      const weather = secWeather.querySelector(".weather");

      city.innerText = data.name;
      weather.innerText = data.weather[0].main;

      const temp = document.createElement("span");
      temp.className = "temp";
      weather.appendChild(temp);
      temp.innerText = data.main.temp;

      const icon = data.weather[0].icon;
      weather.style = `background: url(http://openweathermap.org/img/wn/${icon}.png) no-repeat right 12px`;
    });
}
function onWeatherError() {
  alert("위치를 찾을 수 없습니다.");
}
navigator.geolocation.getCurrentPosition(onWeatherSuccess, onWeatherError);

// # login
const secLogin = document.querySelector(".login-wrap");
const loginForm = secLogin.querySelector(".form");
const loginInput = loginForm.querySelector("input");
const loginButton = loginForm.querySelector("button");
const loginWelcome = secLogin.querySelector(".welcome");
const logoutButton = loginWelcome.querySelector(".logout-btn");

const LOGIN_HIDDEN_CLASSNAME = "hidden";
const LOGIN_USERNAME_KEY = "username";

function onLoginSubmit(e) {
  e.preventDefault();
  loginForm.classList.add(LOGIN_HIDDEN_CLASSNAME);
  const typeUsername = loginInput.value;
  localStorage.setItem(LOGIN_USERNAME_KEY, typeUsername);
  paintWelcome(typeUsername);
}

function paintWelcome(typeUsername) {
  const target = loginWelcome.querySelector(".text");
  target.innerText = `반갑습니다 ${typeUsername}님! \n 아래에 오늘의 할 일을 입력해 주세요!`;
  loginWelcome.classList.remove(LOGIN_HIDDEN_CLASSNAME);
}
const savedUsername = localStorage.getItem(LOGIN_USERNAME_KEY);

if (savedUsername === null) {
  loginForm.classList.remove(LOGIN_HIDDEN_CLASSNAME);
  loginForm.addEventListener("submit", onLoginSubmit);
} else {
  paintWelcome(savedUsername);
}

function onLogoutSubmit(e) {
  localStorage.removeItem(LOGIN_USERNAME_KEY);
  loginForm.classList.remove(LOGIN_HIDDEN_CLASSNAME);
  loginWelcome.classList.add(LOGIN_HIDDEN_CLASSNAME);
}
logoutButton.addEventListener("click", onLogoutSubmit);

// # quote
const secQuote = document.querySelector(".quote-wrap");
const quote = secQuote.querySelector(".text");
const author = secQuote.querySelector(".name");

const quoteList = [
  {
    quote:
      "명분을 해치는 가장 비열한 방법은 일부러 잘못된 주장으로 명분을 옹호하는 것이다.",
    author: "프레드리히 니체",
  },
  {
    quote: "가장 용감한 행동은 자신만을 생각하는 것이다. 큰 소리로.",
    author: "코코 샤넬",
  },
  {
    quote: "내가 끔찍한 골칫덩이가 될까 두려워.",
    author: "이디스 시트웰",
  },
  {
    quote:
      "어떤 것이 당신이 계획대로 되지 않는 다고 해서 그것이 불필요한 것은 아니다.",
    author: "토머스 A 에디슨",
  },
  {
    quote: "오래 살기를 원하면 잘 살아라. 어리석음과 사악함이 수명을 줄인다.",
    author: "벤자민 프랭클린",
  },
  {
    quote: "덜 약속하고 더 해주어라",
    author: "톰 피터스",
  },
  {
    quote: "교육의 목적은 비어 있는 머리를 열려 있는 머리로 바꾸는 것이다.",
    author: "말콤 포브스",
  },
  {
    quote: "물살을 거슬러 헤엄치는 사람은 그 힘을 안다.",
    author: "우드로 윌슨",
  },
  {
    quote: "저녁 식사는 사업의 윤활유다.",
    author: "윌리엄 스토웰 경",
  },
  {
    quote:
      "풍요 속에서는 친구들이 나를 알게 되고, 역경 속에서는 내가 친구를 알게 된다.",
    author: "존 철튼 콜린스",
  },
];

function onRandomQuote(e) {
  const randomQuote = quoteList[Math.floor(Math.random() * quoteList.length)];
  quote.innerText = randomQuote.quote;
  author.innerText = `- ${randomQuote.author}`;
}

onRandomQuote();
setInterval(onRandomQuote, 5000);

// # todo
const secTodo = document.querySelector(".todo-wrap");
const todoForm = secTodo.querySelector(".form");
const todoInput = secTodo.querySelector("input");
const todoButton = secTodo.querySelector("button");
const todoUl = secTodo.querySelector("ul.list");

const TODO_INPUT_KEY = "todolist";

// - list 저장
let list = [];
function onSaveTodo() {
  localStorage.setItem(TODO_INPUT_KEY, JSON.stringify(list));
}

// - list 삭제
function onDeleteTodo(e) {
  const li = e.target.parentElement;
  li.remove();
  list = list.filter((item) => item.id !== parseInt(li.id));
  onSaveTodo();
}

// - ul 뒤에 li 생성해서 화면에 뿌리기
function onPrintTodo(newTodo) {
  const li = document.createElement("li");
  li.id = newTodo.id;
  const span = document.createElement("span");
  span.innerText = newTodo.text;

  const button = document.createElement("button");
  button.innerText = "delete";
  button.addEventListener("click", onDeleteTodo);
  li.appendChild(span); //li내부에 span을 집어넣기
  li.appendChild(button);

  todoUl.appendChild(li);
}

// - input 에 사용자가 입력한 값 가져와서 뿌리는 func에 넘겨주기
function onSubmitTodo(e) {
  e.preventDefault();
  const newTodo = todoInput.value;
  todoInput.value = "";
  const newTodoObj = {
    text: newTodo,
    id: Date.now(),
  };
  list.push(newTodoObj);
  onPrintTodo(newTodoObj);
  onSaveTodo();
}

// - input 에 입력(submit) 시 func 호출
todoForm.addEventListener("submit", onSubmitTodo);

// - localStroage 에 배열로 값을 변환하여 저장하기
const saveStroage = localStorage.getItem(TODO_INPUT_KEY);
if (saveStroage !== null) {
  const parsedToDos = JSON.parse(saveStroage);
  list = parsedToDos;
  parsedToDos.forEach(onPrintTodo);
}
