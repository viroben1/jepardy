// https://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array
function shuffle(a) {
    let j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}
class TriviaGameShow {
    constructor(element, options={}) {

        //Which categories we should use (or use default is nothing provided)
     this.useCategoryIds = options.useCategoryIds || [ 1892, 4483, 88, 218]; 
     /*
        Default Categories pulled from https://jservice.io/search:
        ---
        1892: Video Games
        4483: Three Letter Animals
        88: Geography
        218: Science and Nature
     */ 
    
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
        //Render initial state of score
        this.updateScore(0);
        
        //Kick off the category fetch
        this.fetchCategories();
      
      
      //Bind event handlers
        this.boardElement.addEventListener("click", event => {
           if (event.target.dataset.clueId) {
              this.handleClueClick(event);
           }
        });
        this.formElement.addEventListener("submit", event => {
           this.handleFormSubmit(event);
        });
        
        
     }

     updateScore(change) {
        this.score += change;
        this.scoreCountElement.textContent = this.score;
     }

     fetchCategories() {
     //Fetch all of the data from the API
    const categories = this.useCategoryIds.map(category_id => {
      return new Promise((resolve, reject) => {
       fetch(`https://jservice.io/api/category?id=${category_id}`)
          .then(response => response.json()).then(data => {
             
            resolve(data);
          });
      });
    });

    //Sift through the data when all categories come back
    Promise.all(categories).then(results => {

        //Build up our list of categories
        results.forEach((result, categoryIndex) =>{
            //Start with a blank category
            let newCategory = {
                title: result.title,
                clues: []
             }

             shuffle(result.clues).splice(0,5).forEach((clue, index) => {
                //Create unique ID for this clue
               let clueId = categoryIndex + "-" + index;
               newCategory.clues.push(clueId);
               
               //Add clue to DB
               this.clues[clueId] = {
                  question: clue.question,
                  answer: clue.answer,
                  value: (index + 1) * 100
               };
             })

             //Add this category to our DB of categories
            this.categories.push(newCategory);
        })
        
         //Render each category to the DOM
         this.categories.forEach((c) => {
            this.renderCategory(c);
         });
       })
     }

     renderCategory(category) {   
        let column = document.createElement("div");
        column.classList.add("column");
        column.innerHTML = (
           `<header>${category.title}</header>
           <ul>
           </ul>`
        ).trim();
        
        let ul = column.querySelector("ul");
        category.clues.forEach(clueId => {
           let clue = this.clues[clueId];
           ul.innerHTML += `<li><button data-clue-id=${clueId}>${clue.value}</button></li>`
        })
        this.boardElement.appendChild(column);
   } 

   handleClueClick(event) {
      let clue = this.clues[event.target.dataset.clueId];

      //Mark this button as used
      event.target.classList.add("used");
      
      //Clear out the input field
      this.inputElement.value = "";
      
      //Update current clue
      this.currentClue = clue;

      //Update the text
      this.clueTextElement.textContent = this.currentClue.question;
      this.resultTextElement.textContent = this.currentClue.answer;

      //Hide the result
      this.modalElement.classList.remove("showing-result");
      
      //Show the modal
      this.modalElement.classList.add("visible");
      this.inputElement.focus();
   }
}    
        

const game = new TriviaGameShow( document.querySelector(".app"), {});
game.initGame();