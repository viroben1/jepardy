import {GRID_SIZE, CELL_SIZE, OBJECT_TYPE, CLASS_LIST} from "./startup";

class GameBoard {
   constructor(DOMGrid) {
    this.dotCount = 0;
    this.grid = [];
    this.DOMGrid = DOMGrid;
   }

   showGameStatus(gameWin) {
    const div = document.createElement('div');
    div.classList.add('game-status');
    div.innerHTML = `${gameWin ? 'WIN!' : 'GAME OVER!'}`;
    this.DOMGrid.appendChild(div);
   }

   createGrid(LEVEL) {
    this.dotCount = 0;
    this.grid = [];
    this.DOMGrid.innerHTML = '';
    this.DOMGrid.style.cssText = `grid-templete-columns: repeat(${GRID_SIZE} ,${CELL_SIZE }px);`;
    
    level.array.forEach((square, i) => {
        const div = document.createElement('div');
        div.classList.add('square' , CLASS_LIST[square]);
        div.style.cssText = `width: ${CELL_SIZE}px; height: ${CELL_SIZE}px;`;
        this.DOMGrid.appendChild(div);
        this.grid.push(div);

        if (CLASS_LIST[square] === OBJECT_TYPE.DOT)this.dotCount++; 
    
     }); 
        
    }

    addObject(pos, classes) {
      this.grid[pos].classList.add(...classes);  
    }

    removeObject(pos, classes) {
        this.grid[pos].classList.remove(...classes);  
      }
}








