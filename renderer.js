const $ = (selector) => document.querySelector(selector);

const teams = [
  {
    incrementId: "#increment-1",
    decrementId: "#decrement-1",
    countId: "#count",
  },
  {
    incrementId: "#increment-2",
    decrementId: "#decrement-2",
    countId: "#count-2",
  },
];

const MAX_COUNT = 15;

teams.forEach((team) => {
  const $incrementButton = $(team.incrementId);
  const $decrementButton = $(team.decrementId);
  const $count = $(team.countId);

  $incrementButton.addEventListener("click", () => {
    const count = +$count.innerText;

    if (count < MAX_COUNT) {
      $count.innerHTML = (count + 1).toString();
    }
  });

  $decrementButton.addEventListener("click", () => {
    const count = +$count.innerText;

    if (count > 0) {
      $count.innerHTML = (count - 1).toString();
    }
  });
});

window.tableroAPI.onUpdateTheme((event, theme) => {
  const root = document.documentElement;
  const timeMatch = document.getElementById('time-match')
  console.log({ event, theme })
  root.style.setProperty("--scheme", theme);
  timeMatch.style.classList.add('.dark')
});

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(
    remainingSeconds
  ).padStart(2, "0")}`;
}

let countdownInterval;
let remainingTime = 5400;

const matchTime = document.getElementById('time-match');
const initButton = document.getElementById('init');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset')

matchTime.innerHTML = formatTime(remainingTime)

function updateDisplay() {
  matchTime.innerHTML = formatTime(remainingTime);
}

initButton.onclick = () => {
  if (!countdownInterval) {
    countdownInterval = setInterval(() => {
      if (remainingTime > 0) {
        remainingTime--;
        updateDisplay();
      } else {
        clearInterval(countdownInterval);
        countdownInterval = null;
        alert('Partido Finalizado!');
      }
    }, 1000);
  }
};

updateDisplay();

pauseButton.onclick = () => {
  clearInterval(countdownInterval)
  countdownInterval = null
}

resetButton.onclick = () => {
  window.location.reload()
}

// External Dev Link
const devHouse = document.getElementById('dev-house')

devHouse.onclick = () => {
  const href = 'https://solidsnk86.netlify.app/'
  window.open(href)
}

const addPlayerOneButton = document.getElementById('player-1');
const addPlayerTwoButton = document.getElementById('player-2');
const playerNameInputOne = document.getElementById('players-1');
const playerNameInputTwo = document.getElementById('players-2');
const teamOneList = document.querySelector('.player-one');
const teamTwoList = document.querySelector('.player-two');

addPlayerOneButton.addEventListener('click', function() {
    const playerNameOne = playerNameInputOne.value.trim();
    if (playerNameOne !== '') {
        const playerListItem = document.createElement('li');
        playerListItem.textContent = playerNameOne;
        
        teamOneList.appendChild(playerListItem);

        
        playerNameInputOne.value = '';
    }
});

addPlayerTwoButton.addEventListener('click', function() {
    const playerNameTwo = playerNameInputTwo.value.trim();
    if (playerNameTwo !== '') {
        const playerListItem = document.createElement('li');
        playerListItem.textContent = playerNameTwo;
        
        teamTwoList.appendChild(playerListItem);
        
        playerNameInputTwo.value = '';
    }
});


