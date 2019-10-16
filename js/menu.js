function gameMenu()
{
    /* background pattern credits: https://leaverou.github.io/css3patterns/#carbon-fibre */

    let gameMenu = document.createElement("section");

    let menuBtnStyles = "min-width: 200px; min-height: 40px; width: 20vw; height: 7vh; font-size: 1.1rem; margin: 10px 0; border-radius: 50px; border: 0; font-weight: bold; color: #f3f4f6; text-transform: uppercase;";
    
    let startGameBtn = createButton("Rozpocznij", "background: #689eb8;"+menuBtnStyles, prepareGame);
    let createQuestionsBtn = createButton("Twórz pytania", "background: #ff5a60;"+menuBtnStyles, createQuestions);
    let sourceCodeBtn = createButton("Kod źródłowy", "background: #8bc064;"+menuBtnStyles, ()=>{window.location.assign('https://github.com/TheZlodziej/Quiz')});


    /*css*/
    gameMenu.style.cssText=" height: 100vh; width: 100vw; display:flex; flex-direction: column; justify-content: center; align-items: center;background:radial-gradient(black 15%, transparent 16%) 0 0,radial-gradient(black 15%, transparent 16%) 8px 8px,radial-gradient(rgba(255,255,255,.1) 15%, transparent 20%) 0 1px,radial-gradient(rgba(255,255,255,.1) 15%, transparent 20%) 8px 9px;background-color:#282828;background-size:16px 16px;";

    gameMenu.appendChild(startGameBtn);
    gameMenu.appendChild(createQuestionsBtn);
    gameMenu.appendChild(sourceCodeBtn);

    document.body.prepend(gameMenu);
}

function prepareGame()
{
    //ask for players and question
    clearBody();
    let fileInput = createFileInput();
    document.body.prepend(fileInput);
}

function initGame(questions){
    //start the game
    clearBody();
    let players = []; 
    players.push(new Player("kuba", "matfiz"));
    players.push(new Player("maciek", "human"));

    let game = new Game(players, questions);
    let startButton = createButton("Rozpocznij", "", startGame);
    document.body.prepend(startButton);

    function startGame()
    {
      document.body.removeChild(startButton);
      game.start();
    }
 }

function createQuestions()
{
    console.log("create questions");
    //create questions here
}

