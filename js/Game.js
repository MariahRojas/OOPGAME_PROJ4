/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Game.js */

 class Game{
     constructor(){
         this.missed = 0;   //Used to track the number of missed guesses by the player. The initial value is `0`, since no guesses have been made at the start of the game.
         this.phrases = this.createPhrases();//An array of Phrase objects to use with the game. For now, initialize the property to an empty array. In the next step you'll work on initializing this property with an array of Phrase objects.
         this.activePhrase = null; //This is the Phrase object that’s currently in play. The initial value is `null`.
     }

     /** 
    * Creates phrases for use in game
    * @return {array} An array of phrases that could be used in the game
    */   
     createPhrases() { // creates my phrases //Inside the Game class, create a method called `createPhrases()`, that creates and returns an array of 5 new Phrase objects, and then set the `phrases` property to call that method.
        const phrases = [
                        new Phrase('Muggle  Born'), 
                        new Phrase('      He  Who  Shall  Not  Be               Named'), 
                        new Phrase('Mudblood'), 
                        new Phrase('Always'), 
                        new Phrase('I  solemnly  swear  that  I  am  up  to  no  good')];
        return phrases;
    } 

    /**
    * Selects random phrase from phrases property
    * @return {Object} Phrase object chosen to be used
    */
    getRandomPhrase() {              //This method should select and then return a random phrase from the array of phrases stored in the Game class’s `phrases` property.
        return this.phrases[Math.floor(Math.random() * this.phrases.length)];
    }

    /**
    * Begins game by selecting a random phrase and displaying it to user
    */
    startGame(){
        $('#overlay').hide() //hides start game overlay
        this.activePhrase = this.getRandomPhrase();
        this.activePhrase.addPhraseToDisplay();

        $("body").on('keyup', (e) => {
            if (e.which !== 0) {
                const charTyped = String.fromCharCode(e.which).toLowerCase(); // turns key to string
                if (charTyped.match(/[a-z]/)) {
                    const $correspondingButton = $('#qwerty button:contains("' + charTyped +'")');
                    if (!$correspondingButton.prop('disabled')) //The .prop() method gets the property value for only the first element in the matched set. It returns undefined for the value of a property that has not been set, or if the matched set has no elements.
                    {
                        this.handleInteraction($correspondingButton);
                    }
                }
            }
        }); 
    }


    /**
    * Checks for winning move
    * @return {boolean} True if game has been won, false if game wasn't
    won
    */
    checkForWin() { //This method checks to see if the player has revealed all of the letters in the active phrase.
        const $hidden = $("#phrase li.hide");
        if ($hidden.length == 0) {        
            return true;
        }
            return false;
    }; 

    /**
     * Increases the value of the missed property
     * Removes a life from the scoreboard
     * Checks if player has remaining lives and ends game if player is out
     */
    removeLife() {
        this.missed = this.missed + 1;
        const lostHeartLoc = "images/lightning.png";
        const $availHeart = $('#scoreboard li:not(.lost)').last();
        const $availHeartImg = $availHeart.find('img');
        
        $availHeartImg.attr('src', lostHeartLoc);
        $availHeart.addClass('lost');

        if (this.missed >= 5){
            this.gameOver(false);
        }
    }; //This method removes a life from the scoreboard, by replacing one of the `liveHeart.png` images with a `lostHeart.png` image (found in the `images`
                //folder) and increments the `missed` property. If the player has five missed guesses (i.e they're out of lives), then end the game by calling the `gameOver()` method
    
    /**
     * Displays game over message
     * @param {boolean} gameWon - Whether or not the user won the game
     */
    gameOver(gameWon){
        const $overlay = $('#overlay');
        $overlay.show();

        if (gameWon){
            $('#game-over-message').text("That was Brilliant!");
            $overlay.removeClass('start');
            $overlay.addClass('win');
        } else {
            $('#game-over-message').text("Try again filthy mudblood!");
            $overlay.removeClass('start');
            $overlay.addClass('lose');
        }

        $("body").off('keyup');
    };//This method displays the original start screen overlay, and depending on the outcome of the game, updates the overlay `h1` element with a friendly win or loss message, and replaces the overlay’s `start` CSS class with
                //either the `win` or `lose` CSS class.

    /**
    * Resets game board to start a new game
    *
    */
    resetGameBoard() {
        $('#phrase ul').empty(); //makes phrase section empty
        const $allButtons = $("#qwerty button"); //$allButton = keyboard
        $allButtons.prop('disabled', false); //makes disabled buttons active
        $allButtons.removeClass('chosen'); //removes chosen class
        $allButtons.removeClass('wrong'); //removes wrong class
       
        const liveHearts = "images/livelightning.png"; 
        const $allHearts = $('#scoreboard li');
        
        $allHearts.find('img').attr('src', liveHearts); //puts all the blue hearts back inn the scoreboard section 
        $allHearts.removeClass('lost'); //removes lost class

        $('#overlay').removeClass('lose'); //takes away lose screen
        $('#overlay').removeClass('win'); //takes away win screen 
    }

    /**
    * Handles onscreen keyboard button clicks
    * @param (HTMLButtonElement) button - The clicked button element
    */
    handleInteraction(button){ //This method controls most of the game logic. It checks to see if the onscreen keyboard button clicked by the player matches a letter in the phrase, and
    //then directs the game based on a correct or incorrect guess button.prop('disabled', true);
    const letterPicked = button.text();

    if (this.activePhrase.checkLetter(letterPicked)){
        button.addClass('chosen'); //If the phrase includes the guessed letter
        this.activePhrase.showMatchedLetter(letterPicked);
            if (this.checkForWin()) { //
                this.gameOver(true); //If the player has won the game.
                $(this).prop("disabled", true); 
            }
        } else {
            button.addClass('wrong').prop("disabled", true); //If the phrase does not include the guessed letter, the class gets sets to wrong and becomes disabled incase user clicks it again
            this.removeLife();
        }                 
    };
}