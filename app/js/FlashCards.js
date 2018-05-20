export default class FlashCards {
    constructor() {
      this.questionBox = document.querySelector('#question');
      this.answersBox = document.querySelector('#answers');
      this.buttonA = document.querySelector('#a');
      this.buttonB = document.querySelector('#b');
      this.drum = document.querySelector('#drum');
      this.questions = [];
      this.playing = false;
    }
  
    shuffle(array) {
      for(let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    }

    hideDrum() {
      this.drum.classList.add('displayNone');
    }
  
    initEventListener(fn, fn2) {
      this.answersBox.addEventListener('click', fn); 
      this.answersBox.addEventListener('click', fn2);
    }
  
    end(value) {
      this.set('questionBox', value);
      this.set('buttonA', 'Play again');
      this.hideBtn();
      setTimeout( () => this.playing = false, 0);
    }

    hideBtn() {
      this.buttonB.parentElement.classList.add('displayNone')
    }

    showBtn() {
      this.buttonB.parentElement.classList.remove('displayNone')
    }
  
    set(el, value) {
      this[el].textContent = value;
    }
  
    setQuestions(questions) {
      this.questions = this.shuffle(questions.map(question => {
          this.shuffle(question.answers)
          return question
        }));
    }
  
    insertQA() {
      this.questionBox.textContent = this.questions[this.questions.length-1].question;
      this.buttonA.textContent = this.questions[this.questions.length-1].answers[0].answer;
      this.buttonB.textContent = this.questions[this.questions.length-1].answers[1].answer;  
    }
  
    reset() {
      this.questions = [];
    }
  
    checkAnswer(e) {
      return this.questions[this.questions.length-1].answers[e.target.dataset.id].correct;
    }
  
    correctAnswer(audio, infoboard, fn) {
      this.questions.pop();
      infoboard.correctAnswer()
  
      this.questions.length !== 0 ? 
      [
       this.insertQA(), 
       audio.play('sounds', 'correct.wav', .05)
      ] : 
      [
       fn(),
       this.drum.classList.remove('displayNone')
      ];
    }
  
    wrongAnswer(audio, infoboard, fn) {
      this.questions = [this.questions.pop(), ...this.questions];
      infoboard.wrongAnswer();
  
      infoboard.lives >= 1 ? 
      [
       this.insertQA(), 
       audio.play('sounds', 'wrong.wav', .05)
      ] : 
       fn('Game over! Too many wrong answers!');
    }

  }