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

var cardGrid = cardsArray.concat(cardsArray);



/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


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
