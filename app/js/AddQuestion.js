import FlashCard from './FlashCard';

export default class AddQuestion {
    constructor() {
        this.openModalBtn = document.querySelector('#openModal');
        this.closeModalBtn = document.querySelector('#closeModal');
        this.modal = document.querySelector('#modal');
        this.questionInput = document.querySelector('#customQuestion');
        this.answerAInput = document.querySelector('#customAnswerA');
        this.answerBInput = document.querySelector('#customAnswerB');
        this.checkboxA = document.querySelector('#checkbox-1');
        this.checkboxB = document.querySelector('#checkbox-2');
        this.addBtn = document.querySelector('#addCustomQuestion');
        this.errorBox = document.querySelector('#errorMsg');
    }

    initEventListener() {
        this.addBtn.addEventListener('click', this.createCustomQuestion);
        this.openModalBtn.addEventListener('click', this.openCloseModal);
        this.closeModalBtn.addEventListener('click', this.openCloseModal);
    }

    openCloseModal = () => {
        if(this.modal.classList.contains('open')) {
            this.modal.classList.remove('open');
            this.resetInputs();
        } else {
            this.modal.classList.add('open');
        }
    }

    resetInputs() {
        this.questionInput.value = '';
        this.answerAInput.value = '';
        this.answerBInput.value = '';
        this.checkboxA.checked = false;
        this.checkboxB.checked = false;
        this.questionInput.classList.remove('sg-input--invalid');
        this.answerAInput.classList.remove('sg-input--invalid');
        this.answerBInput.classList.remove('sg-input--invalid');
    }



    setErrorMsg(value) {
        this.errorBox.textContent = value;
    }

    createCustomQuestion = () => {

        const question = this.questionInput.value;
        const answerA = this.answerAInput.value;
        const answerB = this.answerBInput.value;
        const checkedA = this.checkboxA.checked;
        const checkedB = this.checkboxB.checked;

        if(question.trim().length < 15) {
            this.setErrorMsg("Question is too short");
            this.questionInput.classList.add('sg-input--invalid');
            return;
        } else {
            this.questionInput.classList.remove('sg-input--invalid');
        }

        if(answerA.trim() === '') {
            this.setErrorMsg("Answer A is required");
            this.answerAInput.classList.add('sg-input--invalid');
            return;
        } else {
            this.answerAInput.classList.remove('sg-input--invalid');
        }

        if(answerB.trim() === '') {
            this.setErrorMsg("Answer B is required");
            this.answerBInput.classList.add('sg-input--invalid');
            return;
        } else {
            this.answerBInput.classList.remove('sg-input--invalid');
        }

        if(checkedA && checkedB) {
            this.setErrorMsg("There can't be two correct answer");
            return;
        }

        if(!checkedA && !checkedB) {
            this.setErrorMsg("Check correct answer");
            return;
        }

        this.setErrorMsg("");
        
        const newFlashcard = new FlashCard(question, answerA, answerB, checkedA, checkedB);

        this.sendToLS(newFlashcard);
    }

    sendToLS(question) {
        if(window.localStorage) {
            let customQuestions = localStorage.getItem('questions_flashcards');

            customQuestions = customQuestions === null ? [] : JSON.parse(customQuestions);

            localStorage.setItem('questions_flashcards', JSON.stringify([question, ...customQuestions]));

            this.openCloseModal();
            return;
        };
        this.setErrorMsg("No support for Local Storage :("); 
    }





}