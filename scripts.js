let countdown;
let isPaused;
let secondsLeft = 0;
let seconds;
let breakCount = 0;
const longBreak = 900; // 15 minutes in seconds
const title = document.querySelector('.title');
const timeDisplay = document.querySelector('.time');
const endTime = document.querySelector('.endTime');
const pauseIcon = document.querySelector('.pause');
const playIcon = document.querySelector('.play');
const pauseButton = document.querySelector('.btn-pause');
const buttons = document.querySelectorAll('[data-time]');
const alarm = document.createElement('audio');
alarm.setAttribute("src", "https://www.soundjay.com/misc/sounds/bell-ringing-05.mp3");

function timer(seconds) {
  // clear existing timers
  clearInterval(countdown);

  const now = Date.now();
  const then = now + seconds * 1000;
  displayTimeLeft(seconds);
  displayEndTime(then);

  countdown = setInterval(() => {
    if (!isPaused) {
      secondsLeft = Math.round((then - Date.now()) / 1000);
    }

    // check if we should stop it!
    if(secondsLeft < 0) {
      clearInterval(countdown);
      alarm.currentTime = 0;
      alarm.play();
      return;
    }

    // display it
    displayTimeLeft(secondsLeft);
  }, 1000);
}

function displayTimeLeft(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainderSeconds = seconds % 60;
  const display = `${minutes}:${remainderSeconds < 10 ? '0' : '' }${remainderSeconds}`;
  document.title = display;
  timeDisplay.textContent = display;
}

function displayEndTime(timestamp) {
  const end = new Date(timestamp);
  const hour = end.getHours();
  const adjustedHour = hour > 12 ? hour - 12 : hour;
  const minutes = end.getMinutes();
  endTime.textContent = `Stop At ${adjustedHour}:${minutes < 10 ? '0' : ''}${minutes}`;
}

function startTimer() {
  isPaused = false;
  seconds = parseInt(this.dataset.time);
  if(this.textContent == "Work") {
    title.textContent = "work";
  } else if (this.textContent == "Break") {
    title.textContent = "break";
    breakCount = breakCount + 1;
    if(breakCount >= 4) {
      breakCount = 0;
      seconds = parseInt(longBreak);
    }
  }
  timer(seconds);
}

function pauseTimer() {
  if (countdown != undefined) {
    if(!isPaused) {
      isPaused = true;
      clearInterval(countdown);
      pauseIcon.classList.add("pause-clicked");
      playIcon.classList.add("play-clicked");

    } else if (isPaused) {
      isPaused = false;
      pauseIcon.classList.remove("pause-clicked");
      playIcon.classList.remove("play-clicked");

      seconds = secondsLeft;
      timer(seconds);
    }
  } 
}

pauseButton.addEventListener('click', pauseTimer);
buttons.forEach(button => button.addEventListener('click', startTimer));