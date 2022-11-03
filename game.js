class TriviaGameShow {
    constructor(element, options={}) {
       
       //Which categories we should use (or use default is nothing provided)
       this.useCategoryIds = options.useCategoryIds || [ 1892, 4483, 88, 218]; 
         
 
       //Database
       this.categories = [];
       this.clues = {};
       
       //State
       this.currentClue = null;
       this.score = 0;
       
       //Elements
       this.boardElement = element.querySelector(".board");
       this.scoreCountElement = element.querySelector(".score-count");
       this.formElement = element.querySelector("form");
       this.inputElement = element.querySelector("input[name=user-answer]");
       this.modalElement = element.querySelector(".card-modal");
       this.clueTextElement = element.querySelector(".clue-text");
       this.resultElement = element.querySelector(".result");
       this.resultTextElement = element.querySelector(".result_correct-answer-text");
       this.successTextElement = element.querySelector(".result_success");
       this.failTextElement = element.querySelector(".result_fail");
    }
 
    initGame() {

    }
}