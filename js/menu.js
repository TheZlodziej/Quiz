function gameMenu()
{
    let gameMenu = document.createElement("section");

    let menuBtnStyles = "min-width: 300px; min-height: 40px; width: 20vw; height: 7vh; font-size: 1.1rem; margin: 10px 0; border-radius: 50px; font-weight: bold; color: #f3f4f6; text-transform: uppercase;";
    
    let startGameBtn = createButton("Rozpocznij", "background: #689eb8;"+menuBtnStyles, showQuestionsInput);
    let createQuestionsBtn = createButton("Twórz pytania", "background: #ff5a60;"+menuBtnStyles, createQuestions);
    let sourceCodeBtn = createButton("Kod źródłowy", "background: #8bc064;"+menuBtnStyles, ()=>{window.location.assign('https://github.com/TheZlodziej/Quiz')});


    /*css*/
    gameMenu.style.cssText=" height: 100vh; width: 100vw; display:flex; flex-direction: column; justify-content: center; align-items: center;";

    gameMenu.appendChild(startGameBtn);
    gameMenu.appendChild(createQuestionsBtn);
    gameMenu.appendChild(sourceCodeBtn);

    document.body.prepend(gameMenu);
}

function showQuestionsInput()
{
  clearBody();
  createFileInput();
}

function showPlayersInput(parsedJSON)
{
    clearBody();
    let playersInputSection = document.createElement("section");
    let playersInput = createPlayersInput(parsedJSON);
    let startButton = createButton("rozpocznij", "background: #689eb8; width: 20vw; min-width: 200px; font-size: 1.1rem; height: 7vh; min-height: 40px; color: #f3f4f6; border-radius: 50px; text-transform: uppercase; font-weight: bold;", ()=>loadPlayers(parsedJSON));
    /*css*/
    playersInputSection.style.cssText="height: 100vh; width: 100vw; display: flex; flex-direction: column; justify-content: space-around; align-items: center;";

    playersInputSection.appendChild(playersInput);
    playersInputSection.appendChild(startButton);
    document.body.prepend(playersInputSection);
}

function loadFile() 
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
        showPlayersInput(parsedJSON);
      } else {
        messageBox("Twój plik z pytaniami jest pusty!");
      }
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

