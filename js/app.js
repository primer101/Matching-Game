/*
 * List that holds all of cards
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

let listOpened;

let moves;

let amountStars;

// dealy to see the second opened card
const delay = 1000;

resetGame();

function resetGame() {
  listOpened = [];
  moves = 0;
  amountStars = 3;
  cardGrid = shuffle(cardGrid);
  displayCards();
}

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
function displayCards() {

  displayMove();

  const game = document.getElementById('game');

  game.style.visibility = "hide";

  //remove the old desk
  let element;
  if (element = game.firstElementChild) {
    element.remove();
  }

  const deck = document.createElement('ul');
  deck.setAttribute('class', 'deck');

  cardGrid.forEach(item => {
    const card = document.createElement('li');
    card.classList.add('card');
    card.dataset.name = item.name;
    card.style.backgroundImage = 'none';
    card.addEventListener('click', cardClickHandler)
    deck.appendChild(card);
  });

  game.appendChild(deck);

  game.style.visibility = "show";
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
  if (amountStars != 1) {
    if ((amountStars === 3 && moves > 12) || (amountStars === 2 && moves > 18)) {
      removeStar();
    }
  }
}

function removeStar() {
  const element = document.querySelector('.stars .fa');
  element.remove();
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
  for (item of cardsArray) {
    if (item.name === element.dataset.name) {
      element.classList.add('open');
      element.style.backgroundImage = `url(${item.img})`;;
      break;
    }
  }
}

function addCardOpened(element) {
  listOpened.push(element);
}

function isCardMatching() {
  return listOpened[0].dataset.name === listOpened[1].dataset.name;
}

function closeCards() {

  listOpened[0].style.backgroundImage = 'none';
  listOpened[1].style.backgroundImage = 'none';
  listOpened[0].classList.remove('open');
  listOpened[1].classList.remove('open');
  // new empty array
  listOpened = [];
}

function matchCards() {
  //remove the event listener to lock the cards
  listOpened[0].removeEventListener('click', cardClickHandler);
  listOpened[1].removeEventListener('click', cardClickHandler);

  // Style match
  listOpened[0].classList.add('match');
  listOpened[1].classList.add('match');
  // new empty array
  listOpened = [];
}

function incrementMove() {

}

function cardClickHandler(event) {
  const element = event.target;
  if (element.nodeName = 'LI') {
    if (listOpened.length == 1 && listOpened[0] == element) {
      // Its the same card
      return;
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
        setTimeout(closeCards, delay);
      }
    }
  }
}

document.querySelector('.restart').addEventListener('click', function () {
  addStars(amountStars);
  resetGame();
})


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
