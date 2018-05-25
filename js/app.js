/*
 * List all of cards
 */
const cardsArray = [{
    'name': 'captain-america',
    'img': 'img/5a356ffab33339.248349711513451514734.png',
  },
  {
    'name': 'black-panther',
    'img': 'img/kisspng-black-panther-captain-america-costume-cosplay-supe-black-panther-png-file-5a74470771eac5.6018781915175697994666.png',
  },
  {
    'name': 'black-widow',
    'img': 'img/kisspng-scarlett-johansson-marvel-avengers-alliance-black-black-widow-5ab80fd02496c3.6439007615220121121499.png',
  },
  {
    'name': 'iron-man',
    'img': 'img/kisspng-iron-man-edwin-jarvis-clip-art-iron-man-5a6b93b1ca3061.0709877215169996018282.png',
  },
  {
    'name': 'hulk',
    'img': 'img/kisspng-hulk-war-machine-iron-man-thor-thunderbolt-ross-hulk-png-transparent-image-5a75e2e9415ae5.4857790715176752412677.png',
  },
  {
    'name': 'spiderman',
    'img': 'img/kisspng-spider-man-homecoming-film-series-vulture-iron-ma-iron-spiderman-5ac4eaa23c3fc4.7406663515228545622468.png',
  },
  {
    'name': 'thor',
    'img': 'img/kisspng-thor-marvel-cinematic-universe-film-thor-5ab965e03988a2.5016592015220996802357.png',
  },
  {
    'name': 'scarlet-witch',
    'img': 'img/kisspng-wanda-maximoff-captain-america-quicksilver-rogue-m-scarlet-witch-png-transparent-picture-5a746e6a78d670.733027771517579882495.png',
  },
];

//multiply the aray for 2 to create the card matches
let cardGrid = cardsArray.concat(cardsArray);

// List of opened cards
let listOpened;

let moves;

let amountStars;

let countMatches;

// dealy to see the second opened card and the timer
const DELAY = 1000;

resetGame();

function resetGame() {
  addStars(amountStars);
  resetTimer();
  listOpened = [];
  moves = 0;
  amountStars = 3;
  cardGrid = shuffle(cardGrid);
  countMatches = 0;
  displayCards();
}

/*
 * Display the cards on the page
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
function displayCards() {

  displayMove();

  const game = document.querySelector('.game');
  game.style.visibility = 'hidden';

  //remove the old desk
  let element;
  if (element = game.firstElementChild) {
    element.parentNode.removeChild(element);
  }

  const deck = document.createElement('ul');
  deck.setAttribute('class', 'deck');

  cardGrid.forEach(function (item) {
    const card = document.createElement('li');
    card.classList.add('card');
    card.dataset.name = item.name;
    const back = document.createElement('div');
    back.classList.add('back');
    var front = document.createElement('div');
    front.classList.add('front');
    front.style.backgroundImage = 'url(' + item.img + ')';
    card.appendChild(back);
    card.appendChild(front);
    // Add a click event listener
    card.addEventListener('click', cardClickHandler)
    deck.appendChild(card);
  });

  game.appendChild(deck);

  game.style.visibility = 'visible';
}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function displayMove() {
  document.querySelector('.moves').textContent = moves;
  // update Star Rating
  if ((amountStars === 3 && moves > 14) || (amountStars === 2 && moves > 19)) {
    removeStar();
  }
}

function removeStar() {
  const element = document.querySelector('.stars .fa');
  element.parentNode.removeChild(element);
  amountStars--;
}

function addStars(amount) {
  const element = document.querySelector('.stars');
  const liList = element.children;
  for (let i = 1, count = liList.length; i <= count - amount; i++) {
    liList[i].insertAdjacentHTML('afterbegin', '<i class="fa fa-star">');
  }
}

function showCard(element) {
  element.parentNode.classList.add('open');
  element.style.visibility = 'hidden';
  element.nextSibling.style.visibility = 'visible';
}

function addCardOpened(element) {
  listOpened.push(element);
}

function isCardMatching() {
  return listOpened[0].parentNode.dataset.name === listOpened[1].parentNode.dataset.name;
}

function closeCards(element) {
  listOpened[0].parentNode.classList.remove('open');
  listOpened[1].parentNode.classList.remove('open');
  element.style.visibility = 'visible';
  element.nextSibling.style.visibility = 'hidden';
  listOpened[0].style.visibility = 'visible';
  listOpened[0].nextSibling.style.visibility = 'hidden';
  // new empty array
  listOpened = [];
}

function matchCards() {
  //remove the event listener to lock the cards
  listOpened[0].parentNode.removeEventListener('click', cardClickHandler);
  listOpened[1].parentNode.removeEventListener('click', cardClickHandler);

  // Style match
  listOpened[0].parentNode.classList.add('match');
  listOpened[1].parentNode.classList.add('match');
  // new empty array
  listOpened = [];
  countMatches++;
}

// Show a modal windows to congratas and show statistics
function showWinGame() {
  // Get the move span
  const movesSpan = document.getElementById('final-moves');
  movesSpan.textContent = moves;
  const time = document.getElementById('total-time');
  time.textContent = formatTime();
  const stars = document.getElementById('star-rating');
  stars.textContent = '';
  for (let i = 1; i <= amountStars; i++) {
    stars.insertAdjacentHTML('beforeEnd', '<i class="fa fa-star"></i>')
  }
  // Get the modal
  let modal = document.getElementById('myModal');
  modal.style.display = 'block';
}

function closeModal() {
  var modal = document.getElementById('myModal');
  modal.style.display = 'none';
}

// Format the time to words minuntes and seconds
function formatTime() {
  mins = minutes != 0 ? minutes + ' minutes and ' : '';
  return mins + seconds + ' seconds.';
}

// Click handler of cards
function cardClickHandler(event) {
  const element = event.target;
  if (element.nodeName = 'DIV' && listOpened.length < 2) {
    if (listOpened.length == 1 && listOpened[0].parentNode == element.parentNode) {
      // Its the same card
      return;
    }
    if (moves === 0) {
      startTime();
    }
    event.preventDefault();
    showCard(element);
    addCardOpened(element);
    if (listOpened.length == 2) {
      moves++;
      displayMove();
      if (isCardMatching()) {
        matchCards();
      } else {
        setTimeout(function () {
          closeCards(element);
        }, DELAY);
      }
    }
    if (countMatches === 8) {
      // Game finished
      stopTime();
      showWinGame();
    }
  }
}

// Restart event
document.querySelector('.restart').addEventListener('click', function () {
  stopTime();
  resetGame();
})

// Close modal event
document.querySelector('.close').addEventListener('click', function () {
  closeModal();
})

// Play again button event
document.querySelector('#play-again').addEventListener('click', function () {
  closeModal();
  resetGame();
})

// Declare and initialize timer variables
var clearTime;
var seconds = 0,
  minutes = 0;

function startWatch() {
  // check if minutes is equal to 60 to update min and sec
  if (seconds === 60) {
    seconds = 0;
    minutes++
  }
  // check if minutes is equal to 99 and restart
  if (minutes === 99) {
    minutes = 0;
  }
  displayTimer();
  // Update the Star Rating
  if ((amountStars === 3 && seconds > 30) || (amountStars === 2 && seconds > 39)) {
    removeStar();
  }
  seconds++;
  // call the setTimeout( ) again
  clearTime = setTimeout('startWatch( )', DELAY);
}

function displayTimer() {
  // format how the minutes and seconds should look and add 0 if less than 10
  const mins = (minutes < 10) ? ('0' + minutes + ':') : (minutes + ':');
  const secs = (seconds < 10) ? ('0' + seconds) : (seconds);
  // display the stopwatch
  var x = document.querySelector('.timer');
  x.textContent = mins + secs;
}

//create a function to start the stop watch
function startTime() {
  if (seconds === 0 && minutes === 0) {
    startWatch();
  }
}

//create a function to stop the time
function stopTime() {
  if (seconds !== 0 || minutes !== 0) {
    // clear the stop watch using the setTimeout( ) return value 'clearTime' as ID
    clearTimeout(clearTime);
    // Write a last time the timer
    displayTimer();
  }
}

// reset the stop watch
function resetTimer() {
  seconds = 0;
  minutes = 0;
  displayTimer();
}
