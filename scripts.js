
const title = document.querySelector('.title');
const timeDisplay = document.querySelector('.time');
const breakDisplay = document.querySelector('.breakVal');
const playButton = document.querySelector('.btn-play');
const pauseButton = document.querySelector('.btn-pause');
const stopButton = document.querySelector('.btn-stop');
let breakCount = 0;
let paused = false;
let time_left;
let timeInterval;
const time_in_minutes = 1;
const current_time = Date.parse(new Date());
let deadline = new Date(current_time + time_in_minutes * 60 * 1000);
timeDisplay.textContent = `${time_in_minutes}:00`;

function time_remaining(endtime) {
  const t = Date.parse(endtime) - Date.parse(new Date());
  let seconds = Math.floor( (t/1000) % 60);
  let minutes = Math.floor((t/1000/60) % 60);
  return {
    'total': t,
    'minutes': minutes,
    'seconds': seconds
  };
}


function run_clock(endtime) {
  function update_clock() {
    let t = time_remaining(endtime);
    timeDisplay.textContent = `${t.minutes}:${t.seconds}`;
    if(t.total <= 0) {
      clearInterval(timeInterval);
    }
  }
  update_clock();
  timeInterval = setInterval(update_clock, 1000);
}

function pause_clock() {
  if (!paused) {
    paused = true;
    clearInterval(timeInterval); // stop the clock
    time_left = time_remaining(deadline).total;
  
  }
}

function stop_clock() {
  paused = true;
  clearInterval(timeInterval);
  timeDisplay.textContent = `${time_in_minutes}:00`
}

function startTimer(e) {
  if(paused) {
    paused = false;
    deadline = new Date(Date.parse(new Date()) + time_left);
    run_clock(deadline);
  } else if (timeInterval == null){
    run_clock(deadline);
  }
  
}

playButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', pause_clock);
stopButton.addEventListener('click', stop_clock);