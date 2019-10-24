function gameMenu()
{
    let gameMenu = document.createElement("section");

    let menuBtnStyles = "min-width: 200px; min-height: 40px; width: 20vw; height: 7vh; font-size: 1.1rem; margin: 10px 0; border-radius: 50px; font-weight: bold; color: #f3f4f6; text-transform: uppercase;";
    
    let startGameBtn = createButton("Rozpocznij", "background: #689eb8;"+menuBtnStyles, prepareGame);
    let createQuestionsBtn = createButton("Twórz pytania", "background: #ff5a60;"+menuBtnStyles, createQuestions);
    let sourceCodeBtn = createButton("Kod źródłowy", "background: #8bc064;"+menuBtnStyles, ()=>{window.location.assign('https://github.com/TheZlodziej/Quiz')});


    /*css*/
    gameMenu.style.cssText=" height: 100vh; width: 100vw; display:flex; flex-direction: column; justify-content: center; align-items: center;";

    gameMenu.appendChild(startGameBtn);
    gameMenu.appendChild(createQuestionsBtn);
    gameMenu.appendChild(sourceCodeBtn);

    document.body.prepend(gameMenu);
}

function prepareGame()
{
    //ask for players and question
    clearBody();
    let fileInputSection = document.createElement("section");
    let fileInput = createFileInput();
    let playersInput = createPlayersInput();

    /*css*/
    fileInputSection.style.cssText="height: 100vh; width: 100vw; display: flex; flex-direction: column; justify-content: space-around; align-items: center;";
    /* ^ after asking for players/questions change it to the other one then after asking once again start the game (maybe sth with return true - continue) */
    fileInputSection.appendChild(playersInput);
    fileInputSection.appendChild(fileInput);
    document.body.prepend(fileInputSection);

    //players input + start game button
}

function loadFile() 
{
    /* credits: https://stackoverflow.com/questions/7346563/loading-local-json-file */
    
    if (typeof window.FileReader !== 'function') 
    {
      alert("Your browser doesn't support File API"); 
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
      let players = [];
      let playersText = document.getElementById("players").childNodes;
      
      for(let e of playersText)
      {
        let playerAttributes = e.childNodes;
        players.push(new Player(playerAttributes[0].textContent, playerAttributes[1].textContent)); 
      }

      let parsedJSON = JSON.parse(fileContent);
      initGame(parsedJSON, players); //start button??
    }
}

function initGame(questions, players = [new Player("undefined_player", "undefined_category")]){
    //start the game
    clearBody();

    let game = new Game(players, questions);
    let startButton = createButton("Rozpocznij", "background: #ff5a60; padding: 15px 35px; border-radius: 50px; text-transform: uppercase; font-weight: bold; color: #f3f4f6; font-size: 1.1rem;", ()=>game.start());
    document.body.prepend(startButton);
 }

function createQuestions()
{
    console.log("create questions");
    //create questions here
}

