import API from './API.js';
import AudioInterface from './Audio.js';
import Timer from './Timer.js';
import InfoBoard from './Info.js';
import FlashCards from './FlashCards.js';
import AddQuestion from './AddQuestion.js';
import '../scss/style.scss';

export default class Game {
  constructor() {
    this.API = new API();
    this.Audio = new AudioInterface();
    this.Timer = new Timer();
    this.InfoBoard = new InfoBoard()
    this.FlashCards = new FlashCards();
    this.AddQuestion = new AddQuestion();
  } 
  
  init() {
    this.FlashCards.initEventListener(this.checkAnswer, this.startGame);
    this.Audio.initEventListener();
    this.AddQuestion.initEventListener();
    this.Audio.play('theme', 'theme.mp3', .02, true);
  }

  gameWin = () => {
    this.Timer.stop();
    this.Audio.play('sounds', 'winner.wav', .05);
    this.FlashCards.end('Congrats!');
  }

  gameOver = (message) => {
    this.Timer.stop();
    this.Audio.play('sounds', 'gameover.wav', .05);
    this.FlashCards.end(message);
  }

  isValidClick(e) {
    return (
      e.target.nodeName !== 'BUTTON' ||
      this.FlashCards.questions.length === 0 || 
      !this.FlashCards.playing ||
      this.InfoBoard.lives === 0 || 
      this.InfoBoard.timer <= 0 
    )
  }
  
  checkAnswer = (e) => {
    if(this.isValidClick(e)) return;

    this.FlashCards.checkAnswer(e) ?  
      this.FlashCards.correctAnswer(this.Audio, this.InfoBoard, this.gameWin) :
      this.FlashCards.wrongAnswer(this.Audio, this.InfoBoard, this.gameOver);
  }

  restartGame() {
    this.InfoBoard.reset();
    this.FlashCards.reset();
  }
   
  startGame = async () => {
    if(this.FlashCards.playing) return;
    try {
        this.restartGame();
        const questions = await this.API.getQuestions();
        this.Audio.play('sounds', 'start.wav', .1);
        this.FlashCards.setQuestions(questions);
        this.FlashCards.insertQA();
        this.Timer.start(this.InfoBoard, this.Audio, this.gameOver);
        this.FlashCards.showBtn();
        this.FlashCards.hideDrum();
        this.FlashCards.playing = true;
    } catch (err) {
        this.FlashCards.end('Sorry, there was an error while fetching questions. Please try again later.')
    }
  }
} 
