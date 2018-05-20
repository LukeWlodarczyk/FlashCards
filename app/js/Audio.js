export default class AudioInterface {
    constructor() {
      this.theme = new Audio();
      this.sounds = new Audio();
      this.muteBtn = document.querySelector('#muteBtn');
    }
  
    initEventListener() {
      this.muteBtn.addEventListener('click', this.mute)
    }
  
    play(audio, name, volume, loop=false) {
      this[audio].src = `../sounds/${name}`;
      this[audio].volume = volume;
      loop && (this[audio].loop = true);
      this[audio].play();
    }
  
    mute = () => {
      if(this.theme.muted === true) {
        this.theme.muted = false;
        this.sounds.muted = false;
        return;
      }
      this.theme.muted = true;
      this.sounds.muted = true;
    }
  }