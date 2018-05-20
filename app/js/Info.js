export default class InfoBoard {
    constructor() {
      this.timerBox = document.querySelector('#timer');
      this.scoreBox = document.querySelector('#score');
      this.livesBox = document.querySelector('#lives');
      this.lives = 5;
      this.score = 0;
      this.timer = 20;
    }
  
    set(info, value) {
      this[info] = value;
      this[info+'Box'].textContent = (info === 'timer') ? `${value}`.padStart(2,0) : value;
    }
  
    correctAnswer() {
      this.set('score', this.score+1)
      this.set('timer', this.timer+3)
    }
  
    wrongAnswer() {
      this.set('lives', this.lives-1)
      this.set('score', this.score-1)
    }
  
    reset() {
      this.set('lives', 5);
      this.set('score', 0);
      this.set('timer', 20);

    }
  }