import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

let userSelectedDate;

const startBtn = document.querySelector('[data-start]');
startBtn.disabled = true;

const userDays = document.querySelector('[data-days]');
const userHours = document.querySelector('[data-hours]');
const userMinutes = document.querySelector('[data-minutes]');
const userSeconds = document.querySelector('[data-seconds]');
const userInput = document.querySelector('#datetime-picker');

let timerInterval;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] > Date.now()) {
      userSelectedDate = selectedDates[0];
      startBtn.disabled = false;
    } else {
      userSelectedDate = undefined;
      startBtn.disabled = true;
      iziToast.error({
        message: 'Please choose a date in the future',
        position: 'topRight',
      });
    }
  },
};

function startTimer() {
  startBtn.disabled = true;
  userInput.disabled = true;

  timerInterval = setInterval(updateTimerDisplay, 1000);
}

startBtn.addEventListener('click', () => {
  if (userSelectedDate) {
    startTimer();
  }
});

function stopTimer() {
  if (timerInterval) {
    clearInterval(timerInterval);

    userDays.textContent = '00';
    userHours.textContent = '00';
    userMinutes.textContent = '00';
    userSeconds.textContent = '00';

    timerInterval = null;

    startBtn.disabled = false;
    userInput.disabled = false;
  }
}

function updateTimerDisplay() {
  const timeDifference = userSelectedDate - Date.now();
  const { days, hours, minutes, seconds } = convertMs(timeDifference);

  if (!isNaN(days) && !isNaN(hours) && !isNaN(minutes) && !isNaN(seconds)) {
    userDays.textContent = addLeadingZero(days);
    userHours.textContent = addLeadingZero(hours);
    userMinutes.textContent = addLeadingZero(minutes);
    userSeconds.textContent = addLeadingZero(seconds);
  }

  if (timeDifference <= 0) {
    stopTimer();
  }
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}

flatpickr('#datetime-picker', options);