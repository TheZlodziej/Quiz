class Game
{
    //TODO:
    //  TIMER
    //  DISPLAYING WRONG/CORRECT ANSWER/NEXT QUESTION BUTTON
    //  DROPDOWN MENU:
    //    -> REMAKE GAME BUTTON
    //    -> CLOSE GAME BUTTON
    //  QUESTION MAKER
    //  QUESTION EDITOR
    //  ONHOVER EVENTS TO BUTTONS
    //  ??? MORE POINTS FOR NON-PLAYER-TYPE QUESTION ???

    players = [];
    nonSortedQuestions = [];
    questions = [];
    gameSection;

    currentPlayer = 0;
    currentQuestion = [];
    types = [];
    currentType = 0;

    constructor(players, questions)
    {
       this.players = players;

        for(let el of questions)
        {
            let question = new Question(el.contents, el.answers, el.correctAnswer, el.type);
            this.nonSortedQuestions.push(question);
        }

        this.sortQuestions();
        this.gameSection = this.createGameSection();
    }

    updateScoreboard()
    {
        let scoreboard = document.getElementById("scoreboardSection");

        scoreboard.innerHTML = ""; //remove old values

        for(let i in this.players)
        {
            let row = document.createElement("section");
            let playerNameSection = document.createElement("section");
            let playerScoreSection = document.createElement("section");

            row.style.cssText = "width: 100%; display: flex; justify-content: space-between; align-items: center;";

            if(i == this.currentPlayer)
                row.style.cssText += "color: red; border: 1px solid red;"; //if (player) turn, change his scoreboard color

            playerNameSection.innerHTML = this.players[i].name;
            playerScoreSection.innerHTML = this.players[i].points;

            row.appendChild(playerNameSection);
            row.appendChild(playerScoreSection)
            
            scoreboard.appendChild(row);
        }
    }

    isType(type)
    {
        for(let el of this.types)
        {   
            if(el == type)
                return true;
        }

        return false;
    }

    addQuestionToType(q)
    {
        for(let i in this.types)
        {
            if(this.types[i] == q.type)
            {
                this.questions[i].push(q);
                break;
            }
        }
    }

    sortQuestions()
    {
        for(let el of this.nonSortedQuestions)
        {
            if(!this.isType(el.type))
            {
                this.types.push(el.type);
                this.questions.push([]);
            }

            this.addQuestionToType(el);
        }
    }

    createGameSection()
    {
        let gameSection = document.createElement("section");
        let questionSection = document.createElement("section");
        let answersSection = document.createElement("section");
        let typesSection = document.createElement("section");
        let scoreboardSection = document.createElement("section");
        
        /*attributes*/
        gameSection.id="gameSection";
        questionSection.id="questionSection";
        answersSection.id="answersSection";
        typesSection.id="typesSection";
        scoreboardSection.id="scoreboardSection";
        
        for(let i in this.types)
        {
            this.currentQuestion.push(0);

            typesSection.appendChild(
                createButton(this.types[i], "width: 100%;", () => { 
                    this.currentType = i; this.displayQuestion();
                })
            );
        }  

        /*css*/
        gameSection.style.cssText = "width: 100%; height: 100vh; background: blue; display: flex; flex-direction: column; flex-wrap: wrap; justify-content: center; align-items: center;";
        questionSection.style.cssText = "width: 90%; height: 45vh; background: yellow; text-align: center; font-size: 30px; display: flex; justify-content: center; align-items: center;";
        answersSection.style.cssText = "width: 90%; height: 40vh; background: green; margin-top: 5vh; display: flex; justify-content: space-evenly; align-content: space-around; flex-wrap: wrap;";
        typesSection.style.cssText = "width: 200px; background: purple; position: absolute; top: 5vh; right: 10%;";
        scoreboardSection.style.cssText = "position: fixed; left: 10%; top: 5vh; width: 150px; background: orange;";

        /*event listeners*/

        gameSection.appendChild(questionSection);
        gameSection.appendChild(answersSection);
        gameSection.appendChild(typesSection);
        gameSection.appendChild(scoreboardSection);

        return gameSection;
    }

    nextQuestion()
    {
        //check if the type is correct
        this.currentPlayer = this.currentPlayer != this.players.length-1 ? this.currentPlayer + 1 : 0;
        this.currentQuestion[this.currentType] = this.currentQuestion[this.currentType] != this.questions[this.currentType].length-1 ? this.currentQuestion[this.currentType] + 1 : 0;
        this.displayQuestion();
    }

    answerResult(answer)
    {
        if(answer == this.questions[this.currentType][this.currentQuestion[this.currentType]].correctAnswer)
        {
            console.log("correct answer"); //displayCorrectAnswer???
            this.players[this.currentPlayer].points++;
        } else {
            console.log("wrong answer");
        }

         this.nextQuestion();
         this.updateScoreboard();
    }

    displayQuestion()
    {
        let answers = this.questions[this.currentType][this.currentQuestion[this.currentType]].answers;
        let answersSection = document.getElementById("answersSection") || alert("answers section was not created yet");
        let questionSection = document.getElementById("questionSection") || alert("question section was not created yet");
        
        answersSection.innerHTML = ""; //remove old answers
        questionSection.innerHTML = this.questions[this.currentType][this.currentQuestion[this.currentType]].contents;
        
        for(let i in answers)
        {
            answersSection.appendChild(createButton(answers[i], "font-size: 30px; height: 30%;", ()=>this.answerResult(i)));
        }
    }

    start()
    {
        document.body.prepend(this.gameSection);
        this.updateScoreboard();
        this.displayQuestion(this.questions[0].contents, this.questions[0].answers, this.questions[0].correctAnswer);
    }
}