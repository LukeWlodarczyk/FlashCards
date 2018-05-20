export default class Timer {
    constructor() {
      this.interval = null;
    }
  
    start(infoboard, audio, fn) {
      this.interval = setInterval(() => {
        infoboard.set('timer', infoboard.timer-1);
        infoboard.timer === 2 && audio.play('sounds', 'hurryup.wav', .05);
        infoboard.timer < 1 && fn('Time is over!');
      }, 1000);
    }
  
    stop() {
      clearInterval(this.interval)
    }
  }