class Question
{
    contents;
    answers = [];
    correctAnswer; //index of the right answer
    type; 

    constructor(contents, answers, correctAnswer, type)
    {
        this.contents = contents;
        this.answers = answers;
        this.correctAnswer = correctAnswer;
        this.type = type;
    }

    isCorrectAnswer(answer)
    {
        return (answers[this.correctAnswer] == answer);
    }
}