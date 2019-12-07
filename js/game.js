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

            row.style.cssText = "width: 100%; display: flex; justify-content: space-between; align-items: center; margin: 0 0 5px 0";

            if(i == this.currentPlayer)
                row.style.cssText += "color: #ff5a60; border-bottom: 1px solid #ff5a60;"; //if (player) turn, change his scoreboard color

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
        gameSection.style.cssText = `${window.innerWidth < 600 ? "height: 200vh;" : "height: 100vh;"} overflow-y: auto; color: #f3f4f6; width: 100%; display: flex; flex-direction: column; flex-wrap: nowrap; justify-content: center; align-items: center;`;
        questionSection.style.cssText = "box-sizing: content-box; font-size: 2.3rem; width: 90vw; height: 45vh; text-align: center; display: flex; justify-content: center; align-items: center;";
        answersSection.style.cssText = "box-sizing: content-box; overflow-y: auto; overflow-x: hidden; width: 90vw; height: 40vh; margin-top: 5vh; display: flex; flex-wrap: wrap; align-items: center; justify-content: center;";
        infoBarSection.style.cssText = `${window.innerWidth < 600 ? "height: 100vh; flex-direction: column; justify-content: center; align-items: center;" : "position: fixed; z-index: 999; top: 50px; max-height: 50vh; align-items: flex-start; justify-content: space-between;" } padding: 0 5vw; display: flex; width: 90vw;`;
        typesSelect.style.cssText = `${window.innerWidth < 600 ? "width: 90%; " : "width: 10vw;"} min-width: 300px; cursor: pointer; height: 45px; font-size: 1.05em;`; //add styles
        scoreboardSection.style.cssText = `${window.innerWidth < 600 ? "width: 90%;" : "width: 10vw;"} min-width: 300px; font-size: 1.2em; max-height: 40vh; overflow-y: auto; overflow-x: hidden;`; //add styles


        /*event listeners*/
        window.addEventListener("resize", ()=>{
            if(window.innerWidth < 600)
            {
                gameSection.style.height = "200vh";

                infoBarSection.style.maxHeight = "unset";
                infoBarSection.style.height = "100vh";
                infoBarSection.style.flexDirection = "column";
                infoBarSection.style.position = "static";
                infoBarSection.style.justifyContent = "center";
                infoBarSection.style.alignItems = "center";

                typesSelect.style.width= "90vw";

                scoreboardSection.style.width = "90vw";
            }

            else 
            {
                gameSection.style.height = "100vh";

                infoBarSection.style.maxHeight = "50vh";
                infoBarSection.style.flexDirection = "row";
                infoBarSection.style.height = "unset";
                infoBarSection.style.position = "fixed";
                infoBarSection.style.zIndex = "999";
                infoBarSection.style.top = "50px";
                infoBarSection.style.justifyContent = "space-between"; //"space-evenly";
                infoBarSection.style.alignItems = "flex-start";

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
            if(this.players[this.currentPlayer].type === this.questions[this.currentType][this.currentQuestion[this.currentType]].type)
            {
                //if question is from player's category give 1 point
                this.players[this.currentPlayer].points++;
            } else {
                //else give 2 points
                this.players[this.currentPlayer].points += 2;
            }
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
            let answerBtn = createButton(answers[i], `background: ${getRandomColor() || '#97cc76'}; min-width: 300px; min-height: 54px; ${window.innerWidth < 600 ? "height: 7vh;" : "height: 30%;"};  max-height: 100px; font-size: 1.1rem; color: #f3f4f6; font-weight: bold; border-radius: 50px; margin: 5px 20px; font-size: 30px; ${window.innerWidth < 600 ? "width: calc(100% - 40px);" : "width: calc(50% - 40px);"} ;text-shadow: -1px -1px 0 rgba(61, 61, 62, .5),  1px -1px 0 rgba(61, 61, 62, .5), -1px 1px 0 rgba(61, 61, 62, .5), 1px 1px 0 rgba(61, 61, 62, .5);`, ()=>this.answerResult(i));
            
            window.addEventListener("resize", ()=>{
                if(window.innerWidth < 600)
                {
                    answerBtn.style.height = "7vh";
                    answerBtn.style.width = "calc(100% - 40px)";
                }

                else
                {
                    answerBtn.style.height = "30%";
                    answerBtn.style.width = "calc(50% - 40px)";
                }
            });

            answersSection.appendChild(answerBtn);
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