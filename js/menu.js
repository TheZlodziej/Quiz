function gameMenu()
{
    let gameMenu = document.createElement("section");

    let menuBtnStyles = "width: 300px; height: 54px; font-size: 1.1rem; margin: 10px 0; border-radius: 50px; font-weight: bold; color: #f3f4f6; text-transform: uppercase;";
    
    let startGameBtn = createButton("Rozpocznij", "background: #689eb8;"+menuBtnStyles, showQuestionsInput);
    let createQuestionsBtn = createButton("Twórz pytania", "background: #ff5a60;"+menuBtnStyles, createQuestions);
    let sourceCodeBtn = createButton("Kod źródłowy", "background: #8bc064;"+menuBtnStyles, ()=>{window.location.assign('https://github.com/TheZlodziej/Quiz')});


    /*css*/
    gameMenu.style.cssText="height: 100vh; width: 100vw; display:flex; flex-direction: column; justify-content: center; align-items: center;";

    gameMenu.appendChild(startGameBtn);
    gameMenu.appendChild(createQuestionsBtn);
    gameMenu.appendChild(sourceCodeBtn);

    document.body.prepend(gameMenu);
}

function showQuestionsInput()
{
  clearBody();
  createFileInput(false);
}

function showPlayersInput(parsedJSON)
{
    clearBody();
    let playersInputSection = document.createElement("section");
    let playersInput = createPlayersInput(parsedJSON);
    let startButton = createButton("rozpocznij", "background: #689eb8; height: 50px; min-height: 50px; width: 300px; font-size: 1.1rem; color: #f3f4f6; border-radius: 50px; text-transform: uppercase; font-weight: bold;", ()=>loadPlayers(parsedJSON));
    /*css*/
    playersInputSection.style.cssText="height: 100vh; width: 100vw; display: flex; flex-direction: column; justify-content: space-around; align-items: center;";

    playersInputSection.appendChild(playersInput);
    playersInputSection.appendChild(startButton);
    document.body.prepend(playersInputSection);
}

function loadFile(edition) 
{
    /* credits: https://stackoverflow.com/questions/7346563/loading-local-json-file */
   
    if (typeof window.FileReader !== 'function')
    {
      messageBox("Twoja przeglądarka nie wspiera API plików!"); 
      return;
    }

    let input = document.getElementById("fileInput");
    let file = input.files[0];
    let fileReader = new FileReader();
    
    fileReader.onload = receivedText;
    fileReader.readAsText(file);

    function receivedText(e) 
    {
      let fileContent = e.target.result;
      let parsedJSON = JSON.parse(fileContent);
      //TODO: chect if questions are valid
      if(Array.isArray(parsedJSON) && parsedJSON.length)
      {
        if(edition)
        {
          editQuestions(parsedJSON);
        }

        else
        {
          showPlayersInput(parsedJSON);
        }
      } else {
        messageBox("Twój plik z pytaniami jest pusty!");
      }
    }
}

function editQuestions(parsedJSON)
{
  createQuestions();
  let readyQuestionsSection = document.getElementById("readyQuestionsSection");

  let qContents = document.getElementById("qContents");
  let qType = document.getElementById("qType");
  let qAnswersSection = document.getElementById("qAnswersSection");
  let qAnswerContents = document.getElementById("qAnswerContents");
  let qCorrectAnswerCheckbox = document.getElementById("qCorrectAnswer");

  let answers = document.getElementById("qAnswers");
  let questions = document.getElementById("qQuestions");

  for(let q of parsedJSON)
  {
    //question.contents, question.answers(array), question.correctAnswer, question.type
    let qID = uID();
    let qBtnID = uID();
    let answersHTML = "";

    for(let a in q.answers)
    {
      answersHTML +=`<div><div>${q.answers[a]}</div><div>${a == q.correctAnswer ? true : false}</div></div>`;
    }

    let questionBtn = createButton(trimText(q.contents, 10), "margin-top: 13px; width: 90%; height: 40px; border-radius: 50px; color: #f3f4f6; background: #8bc064;", ()=>{
      qContents.value="";
      qType.value="";
      qAnswerContents.value="";
      answers.innerHTML="";
      qAnswersSection.innerHTML="";
      qCorrectAnswerCheckbox.disabled=true;
      
      let question = document.getElementById(qID);
      
      qContents.value = question.childNodes[0].textContent;
      qType.value = question.childNodes[1].textContent;
      
      for(let answer of question.childNodes[2].childNodes)
      {
        let aID = uID();
        let btnID = uID();

        let answerButton = createButton(trimText(answer.childNodes[0].textContent, 6), `width: 20%; height; 10%; font-size: 1.1em; min-height: 27px; min-width: 90px; margin: 3px 3px; border-radius: 50px; color: #f3f4f6; ${answer.childNodes[1].textContent == "true" ? "background: #8bc064;" : "background: #689eb8;"}`, ()=>{
          let answer_ = document.getElementById(aID);
            if(answer_.childNodes[1].textContent == "true")
            {
                qCorrectAnswerCheckbox.disabled = true;
            }

            qAnswerContents.value = answer_.childNodes[0].textContent;
            qCorrectAnswerCheckbox.checked = (answer_.childNodes[1].textContent == "true");
            answer_.remove();
            document.getElementById(btnID).remove();
        });

        answerButton.id=btnID;

        answers.innerHTML+=`<div id="${aID}"><div>${answer.childNodes[0].textContent}</div><div>${answer.childNodes[1].textContent}</div></div>`;
        qAnswersSection.prepend(answerButton);
      }

      document.getElementById(qID).remove();
      document.getElementById(qBtnID).remove();
    });

    questions.innerHTML+=`<div id="${qID}"><div>${q.contents}</div><div>${q.type}</div><div>${answersHTML}</div></div>`;

    questionBtn.id=qBtnID;
    readyQuestionsSection.prepend(questionBtn);
  }
}

function loadPlayers(parsedJSON)
{
  let players = [];
  let playersText = document.getElementById("players").childNodes;
  
  for(let e of playersText)
  {
    let playerAttributes = e.childNodes;
    players.push(new Player(playerAttributes[0].textContent, playerAttributes[1].textContent)); 
  }

  if(Array.isArray(players) && players.length)
  {
    initGame(parsedJSON, players);
  } else {
    messageBox("Dodaj graczy, aby rozpocząć grę!");
  }
}

function initGame(questions, players = [new Player("undefined_player", "undefined_category")]){
    clearBody();
    
    let game = new Game(players, questions);
    if(game)
    {
      game.start();
    }
 }

function createQuestions()
{
    clearBody();
    createQuestionsSection();
}

