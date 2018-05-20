export default class API {   
    constructor() {
      this.url = 'https://gist.githubusercontent.com/vergilius/6d869a7448e405cb52d782120b77b82c/raw/e75dc7c19b918a9f0f5684595899dba2e5ad4f43/history-flashcards.json';
    }
    getQuestions() { 

      let customQuestions;

      if(window.localStorage) {
        customQuestions = localStorage.getItem('questions_flashcards');   
        customQuestions = customQuestions !== null ? JSON.parse(customQuestions) : [];
      }


      return fetch(this.url)
        .then( res => res.json())
        .then( data => {
          const questions = [...data, ...customQuestions ]
          return questions;
        }) 
        .catch( err => {
          return err;
      })
    }  
  }