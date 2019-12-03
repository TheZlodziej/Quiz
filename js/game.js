class Game
{
    //TODO:
    //  DISPLAYING WRONG/CORRECT ANSWER/NEXT QUESTION BUTTON
    //  DROPDOWN MENU:
    //    -> REMAKE GAME BUTTON
    //    -> CLOSE GAME BUTTON
    //  QUESTION EDITOR
    //  STYLE INFO SECTION
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
        let typesSelect = document.createElement("select");
        let scoreboardSection = document.createElement("section");
        let infoBarSection = document.createElement("section");

        /*attributes*/
        gameSection.id="gameSection";
        questionSection.id="questionSection";
        answersSection.id="answersSection";
        scoreboardSection.id="scoreboardSection";
        
        for(let i in this.types)
        {
            this.currentQuestion.push(0); //sets every category question index to 0

            let typeOption = document.createElement("option");
            typeOption.textContent = this.types[i];
            typeOption.value = i;

            typesSelect.appendChild(typeOption);
        }  

        /*css*/
        gameSection.style.cssText = `${window.innerWidth < 600 ? "height: 200vh;" : "height: 100vh;"} overflow-y: auto; color: #f3f4f6; width: 100%; display: flex; flex-direction: column; flex-wrap: wrap; justify-content: center; align-items: center;`;
        questionSection.style.cssText = "font-size: 2.3rem; width: 90%; height: 45vh; text-align: center; display: flex; justify-content: center; align-items: center;";
        answersSection.style.cssText = "overflow-y: auto; overflow-x: hidden; width: 90%; height: 40vh; margin-top: 5vh; display: flex; flex-wrap: wrap; align-items: center; justify-content: center;";
        infoBarSection.style.cssText = `${window.innerWidth < 600 ? "height: 100vh; flex-direction: column;" : "position: fixed; z-index: 999; top: 0; left: 0; height: 100px;" } display: flex; justify-content: center; width: 100vw;`;
        typesSelect.style.cssText = `${window.innerWidth < 600 ? "width: 90%; " : "width: 10vw;"} min-width: 300px; cursor: pointer; height: 45px; font-size: 1.05em;`; //add styles
        scoreboardSection.style.cssText = `${window.innerWidth < 600 ? "width: 90%;" : "width: 10vw;"} min-width: 300px;`; //add styles


        /*event listeners*/
        window.addEventListener("resize", ()=>{
            if(window.innerWidth < 600)
            {
                gameSection.style.height = "200vh";

                infoBarSection.style.height = "100vh";
                infoBarSection.style.flexDirection = "column";
                infoBarSection.style.position = "static";

                typesSelect.style.width= "90%";

                scoreboardSection.style.width = "90%";
            }

            else 
            {
                gameSection.style.height = "100vh";

                infoBarSection.style.height = "100px";
                infoBarSection.style.flexDirection = "row";
                infoBarSection.style.position = "fixed";
                infoBarSection.style.zIndex = "999";
                infoBarSection.style.top = "0";
                infoBarSection.style.left = "0";

                typesSelect.style.width = "10vw";

                scoreboardSection.style.width = "10vw";
            }
        });

        typesSelect.addEventListener("change", ()=>{
            this.currentType = typesSelect.value;
            this.displayQuestion();
        });

        infoBarSection.appendChild(scoreboardSection);
        infoBarSection.appendChild(typesSelect);

        gameSection.appendChild(questionSection);
        gameSection.appendChild(answersSection);
        gameSection.appendChild(infoBarSection);

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

        answersSection.innerHTML = ""; //remove old answers
        questionSection.innerHTML = this.questions[this.currentType][this.currentQuestion[this.currentType]].contents;
        
        for(let i in answers)
        {
            answersSection.appendChild(createButton(answers[i], `background: ${getRandomColor() || '#97cc76'}; min-width: 300px; min-height: 40px; ${window.innerWidth < 600 ? "height: 7vh;" : "height: 30%;"};  max-height: 100px; font-size: 1.1rem; color: #f3f4f6; font-weight: bold; border-radius: 50px; margin: 5px 20px; font-size: 30px; ${window.innerWidth < 600 ? "width: calc(100% - 40px);" : "width: calc(50% - 40px);"} ;text-shadow: -1px -1px 0 rgba(61, 61, 62, .5),  1px -1px 0 rgba(61, 61, 62, .5), -1px 1px 0 rgba(61, 61, 62, .5), 1px 1px 0 rgba(61, 61, 62, .5);`, ()=>this.answerResult(i)));
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