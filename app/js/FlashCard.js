export default class FlashCard {
    constructor(question, answerA, answerB, checkedA, checkedB) {
        this.flashCard = {
            question,
            answers: [
                {
                    answer: answerA,
                    correct: checkedA
                },
                {
                    answer: answerB,
                    correct: checkedB
                }
            ]
        }

        return this.flashCard;
    }
}