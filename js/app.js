/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * app.js */

//const phrase = new Phrase('Life is like a box of chocolates');
//console.log(`Phrase - phrase: ${phrase.phrase}`);

/* const game = new Game();
game.phrases.forEach((phrase, index) => {
console.log(`Phrase ${index} - phrase: ${phrase.phrase}`);
}); */

/*  const logPhrase = (phrase) => {
    console.log(`Phrase - phrase: `, phrase.phrase);
    };

    const game = new Game();

    logPhrase(game.getRandomPhrase());
    logPhrase(game.getRandomPhrase());
    logPhrase(game.getRandomPhrase());
    logPhrase(game.getRandomPhrase());
    logPhrase(game.getRandomPhrase()); 

 */
//     const game = new Game();
// game.getRandomPhrase().addPhraseToDisplay();


/* $(document).ready(() => {

let game;

    $("#btn__reset").click(() => {
        game = new Game();
        game.resetGameBoard();
        game.startGame(); 

    });

});
 */

// const game = new Game();
// const randomPhrase = game.getRandomPhrase();
// const phrase = new Phrase(randomPhrase.phrase);
// phrase.addPhraseToDisplay();

/* const game = new Game();
game.startGame();
console.log(`Active Phrase - phrase: ${game.activePhrase.phrase}`); */


/* $('#btn__reset').click(function () { //add 'click' event listener to "startGame" button{ which }
    resetDisplay(event.target);
    game = new Game(); // creates new Game object and starts by callin startGame()
    game.startGame(); //calls startGame()method on object
});

function resetDisplay() {
    $('#overlay').animate(
    { opacity: '0' }, 1000,
function () {
    $('#overlay').hide();
    game.active = true;
    });
}
 */


let game; //declare a new variable called `game` that’s not set to anything
$("#btn__reset").click(() => { //add a "click" event listener to the HTML `<button>` element with an `id` of `btn__reset`
   game = new Game(); 
   game.resetGameBoard(); //resets game
   game.startGame();      //starts new game
});

$("#qwerty .key").click((e) => { //keyboard
  const $target = $(e.target); //button that was clicked
  game.handleInteraction($target);
});

