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

    constructor(players, questions)
    {
       this.players = players;
       this.nonSortedQuestions = [];
       this.gameSection;
       this.questions = [];
       this.currentPlayer = 0;
       this.currentQuestion = [];
       this.types = [];
       this.currentType = 0;

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
            if(!this.types.includes(el.type))
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
        gameSection.style.cssText = "color: #f3f4f6; width: 100%; height: 100vh; display: flex; flex-direction: column; flex-wrap: wrap; justify-content: center; align-items: center;";
        questionSection.style.cssText = "font-size: 2.3rem; width: 90%; height: 45vh; text-align: center; display: flex; justify-content: center; align-items: center;";
        answersSection.style.cssText = "overflow-y: auto; overflow-x: hidden; width: 90%; height: 40vh; margin-top: 5vh; display: flex; flex-wrap: wrap;";
        typesSection.style.cssText = "width: 200px; background: purple; position: absolute; top: 5vh; right: 10%;";
        scoreboardSection.style.cssText = "position: absolute; left: 10%; top: 5vh; width: 150px; background: orange;";

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
        let colors = ["#689eb8", "#ff5a60", "#8bc064", "#ffdb5a", "#ff5a78", "#25c2ba", "#a27dd1", "#d17dc9", "#c43b5b", "#faa55a", "#c4b333", "#a7c433"];
        
        function getRandomColor()
        {
            let colorIndex = Math.floor(Math.random() * colors.length);
            let color = colors[colorIndex];
            colors.splice(colorIndex, 1);
            return color;
        }

        function getAnswerLength()
        {
            if(window.innerWidth < 500)
                return '100%';
            
            return '50%';
        }

        function getAnswerHeight()
        {
            if(window.innerWidth < 500)
                return '7vh';
            
            return '30%';
        }

        answersSection.innerHTML = ""; //remove old answers
        questionSection.innerHTML = this.questions[this.currentType][this.currentQuestion[this.currentType]].contents;
        
        for(let i in answers)
        {
            //fix questions overflow (cant see some part of the questions if there's too many of them)
            answersSection.appendChild(createButton(answers[i], `background: ${getRandomColor() || '#97cc76'}; min-width: 200px; min-height: 40px; height: ${getAnswerHeight()}; font-size: 1.1rem; color: #f3f4f6; font-weight: bold; border-radius: 50px; margin: 5px 20px; font-size: 30px; width: calc(${getAnswerLength()} - 40px);text-shadow: -1px -1px 0 rgba(61, 61, 62, .5),  1px -1px 0 rgba(61, 61, 62, .5), -1px 1px 0 rgba(61, 61, 62, .5), 1px 1px 0 rgba(61, 61, 62, .5);`, ()=>this.answerResult(i)));
        }
    }

    start()
    {
        clearBody();
        document.body.prepend(this.gameSection);
        this.updateScoreboard();
        this.displayQuestion(this.questions[0].contents, this.questions[0].answers, this.questions[0].correctAnswer);
    }
}