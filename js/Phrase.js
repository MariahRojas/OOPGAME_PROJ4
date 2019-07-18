/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Phrase.js */

class Phrase{                               //Create the Phrase class in the Phrase.js file.
    constructor(phrase){                    //constructor method that receives a phrase parameter
        this.phrase = phrase.toLowerCase(); //makes phrase lowercase
    }
  
    /**
    * Display phrase on game board ${this.phrase[i]}
    */
    addPhraseToDisplay() {
        for (let i = 0; i < this.phrase.length; i++) {
            if (this.phrase[i] !== ' ') {
                $('#phrase ul').append(`<li class="hide letter ${this.phrase[i]}">${this.phrase[i]}</li>`); //collects phrases in array and gives it an li and a class of "hide letter" if it doesnt have a space     
            } else {
                $('#phrase ul').append(`<li class="space">&nbsp;</li>`); //if it does have a space(&nbsp;) then give it the class "space"
            }
        }
    }

    /**
    * Checks if passed letter is in phrase
    * @param (string) letter - Letter to check
    */
    checkLetter(letter) {       //  Checks to see if the letter selected by the player matches a letter in the phrase.
        return this.phrase.includes(letter);
    };

    /**
    * Displays passed letter on screen after a match is found
    * @param (string) letter - Letter to display
    */
    showMatchedLetter(letter){
        $("#phrase li." + letter).addClass('show').removeClass('hide'); 
    };
}