//      FUNCTION TEMPLATE 
//
//    function elementName()
//    {
//        /*attributes*/
//
//        /*css*/
//
//        /*event listeners*/
//
//    }

function messageBox(message)
{
    /*credits: https://speckyboy.com/css-js-notification-alert-code/  && https://gist.github.com/gordonbrander/2230317 */
    let alertArea = document.getElementById("alertArea") || document.createElement("section");
    let messageBox = document.createElement("section");
    let mMessage = document.createElement("section");
    let uID = '_' + Math.random().toString(36).substr(2, 9);
    let closeButton = createButton("x", "position: absolute; font-size: 1em; top: 5px; right: 5px; background: transparent; color: #f3f4f6; width: 20px; height: 20px;", ()=>{
        let messageBox_ = document.getElementById(uID);
        messageBox_.style.opacity = 0;
        closeButton.disabled = true;
        setTimeout(function(){messageBox_.remove();}, 500);
    });

    /*attributes*/
    alertArea.id="alertArea";
    messageBox.id = uID;
    mMessage.textContent = message;

    /*css*/
    alertArea.style.cssText="position: fixed; max-height: 100%; position: fixed; bottom: 5px; right: 20px;";
    messageBox.style.cssText="opacity: 1; transition: opacity 0.5s ease-in; position: relative; border-radius: 5px; line-height: 1.3em; padding: 10px 20px 10px 15px; margin: 5px; 10px; width:250px; background: rgba(0, 0, 0, 0.8); color: white;";
    mMessage.style.cssText="font-weight: lighter; width:100%, font-size .8rem;";

    messageBox.appendChild(mMessage);
    messageBox.appendChild(closeButton);
    alertArea.prepend(messageBox) || document.body.prepend(alertArea);

    setTimeout(function(){ 
        messageBox.style.opacity=0; 
        setTimeout(function(){ 
            messageBox.remove()
        },500); 
    }, 8000);
}

function createFileInput()
{
    let fileInputSection = document.createElement("section");
    let fileInput = document.createElement("input");
    let fileInputLabel = document.createElement("label");

    /*attributes*/
    fileInput.type = "file";
    fileInput.accept = ".json";
    fileInput.id="fileInput";

    fileInputLabel.htmlFor = "fileInput";
    fileInputLabel.innerHTML = "Wybierz plik z pytaniami";

    /*css*/
    fileInput.style.cssText = "display: none;"; //add css
    fileInputLabel.style.cssText = "background: #ff5a60; padding: 15px 35px; border-radius: 50px; text-transform: uppercase; font-weight: bold; cursor: pointer; color: #f3f4f6; font-size: 1.1rem;";

    /*event listeners*/
    fileInput.addEventListener('change', ()=>loadFile()); //start button?
    
    fileInputSection.appendChild(fileInput);
    fileInputSection.appendChild(fileInputLabel);

    return fileInputSection;
}

function createPlayersInput(parsedJSON)
{
    let playersInputSection = document.createElement("form");
    let playersList = document.createElement("section");
    let playerInputName = document.createElement("input");
    let playerInputCategory = document.createElement("select");
    let players = document.createElement("section");
    let categoryPlaceholder = document.createElement("option");
    let categories = [];

    let addButton = createButton("dodaj gracza", "background: #8bc064; width: 100%; margin: 10px 0; height: 6vh; min-height: 40px; border-radius: 50px; text-transform: uppercase; font-weight: bold; color: #f3f4f6; font-size: 1.1rem;", ()=>{
        let pIN = document.getElementById("playerInputName");
        let pIC = document.getElementById("playerInputCategory");
        let pL = document.getElementById("playersList");

        if(pIN.value && pIC.value){
            pL.innerHTML += "<div style='margin: 5px 10px; display: flex;'><div style='margin: 0 5px 0 0;'>" + escape(pIN.value) + "</div><div>(" + pIC.value + ")</div></div>"; //display in some other way;
            players.innerHTML += "<div><div>" + escape(pIN.value) + "</div><div>" + pIC.value + "</div></div>";

            pIN.value = "";
            pIC.value = "";

            pIN.focus();
        } else {
            messageBox("Uzupełnij puste miejsca!");
        }
        //get types from questions and make a list out of them (not input type=text)
    });

    //TODO: hide HTML select tag and style your own one with so it's cross platform styled

    for(let el of parsedJSON)
    {
        if(!categories.includes(el.type))
        {
            let category = document.createElement("option");
            
            category.value = el.type;
            category.textContent = el.type;

            category.style.cssText="color: gray; border-radius: 50px;";

            playerInputCategory.appendChild(category);
            categories.push(el.type);
        }
    }

    /*attributes*/
    playerInputName.id="playerInputName";
    playerInputName.placeholder="nazwa";
    playerInputName.maxLength="16";

    playersList.id="playersList";

    players.id="players";

    playerInputCategory.id="playerInputCategory";

    categoryPlaceholder.textContent="kategoria";
    categoryPlaceholder.value="";
    categoryPlaceholder.selected="selected";
    categoryPlaceholder.disabled="disabled";
    categoryPlaceholder.hidden="hidden";

    addButton.type="submit";

    /*css*/
    playersInputSection.style.cssText="width: 20vw; min-width: 200px; display: flex; flex-direction: column; align-items: center; justify-content: center;";
    playersList.style.cssText="width: 100%; height: 30vh; margin: 0 0 10px 0; max-height: 300px; min-height: 40px; font-size: 1.1rem; overflow-y: auto; overflow-x: hidden; color: #f3f4f6; display: flex; align-items: center; justify-content: center; flex-wrap: wrap; align-content: center;";
    playerInputName.style.cssText="background: #fff; color: gray; margin: 10px 0; width: 100%; height: 6vh; min-height: 40px; font-size: 1.1rem; border-radius: 50px; border: 0; text-align: center;";
    playerInputCategory.style.cssText=" -moz-appearance: none; -webkit-appearance: none; appearance: none; background: #fff; text-align-last:center; cursor: pointer; margin: 10px 0; width: 100%; height: 6vh; min-height: 40px; font-size: 1.1rem; border-radius: 50px; border: 0; outline: none; color: gray;";
    players.style.cssText="display: none";

    /*event listeners*/
    playersInputSection.addEventListener("submit", (e)=>e.preventDefault());

    playerInputCategory.prepend(categoryPlaceholder);
    playersInputSection.appendChild(players);
    playersInputSection.appendChild(playersList);
    playersInputSection.appendChild(playerInputName);
    playersInputSection.appendChild(playerInputCategory);
    playersInputSection.appendChild(addButton);
    
    return playersInputSection;
}

function createButton(text, styles = "", onClickEvent = ()=>{return})
{
    let button = document.createElement("button");
    /*attributes*/
    button.innerText = text;

    /*css*/
    button.style.cssText = "cursor: pointer; border: 0;" + styles;

    /*event listeners*/
    button.addEventListener("click", onClickEvent);

    return button;
}

function createQuestionsSection()
{
    let questionsSection = document.createElement("section");
    let readyQuestionsSection = document.createElement("section");
    let addQuestionSection = document.createElement("section");
    let qContents = document.createElement("input");
    let qType = document.createElement("input");
    let qAnswersSection = document.createElement("section");
    let qAnswerContents = document.createElement("input");
    let qCorrectAnswerSection = document.createElement("section");
        let qCorrectAnswerLabel = document.createElement("label");
        let qCorrectAnswerCheckbox = document.createElement("input");
        let addAnswerButton = createButton("+", "vertical-align: sub; line-height: 9px; background: #ff5a60; font-weight: bold; color: #f3f4f6; font-size: 1.5rem; width: 30px; height: 30px; border-radius: 50%;");
    let addQuestionButton = createButton("Dodaj pytanie", "width: 100%; height: 6vh; min-height: 40px; margin: 10% 0 0 0; border-radius: 40px; font-size: 1.1rem; font-weight: bold; text-transform: uppercase; color: #f3f4f6; background: #8bc064;");
    let downloadQuestionsButton = createButton("Pobierz pytania", "");

    /*attributes*/
    qContents.id="questionContents";
    qType.id="questionType";
    qAnswersSection.id="questionAnswersSection";
    qAnswerContents.id="qAnswerContents";
    qCorrectAnswerCheckbox.id="qCorrectAnswer";

    qCorrectAnswerLabel.for="qCorrectAnswer";

    qContents.placeholder="Treść";
    qType.placeholder="Kategoria";
    qAnswerContents.placeholder="Odpowiedź";

    qCorrectAnswerCheckbox.type="checkbox";
    qCorrectAnswerLabel.textContent="Poprawna odpowiedź";

    /*css*/
    questionsSection.style.cssText="width:100vw; height: 100vh; display: flex; justify-content: center; align-items: center; ";
    readyQuestionsSection.style.cssText="display: none; background: red; min-width: 100px; width: 10vw; height: 100vh; position: fixed; left: 0; top: 0;";
    addQuestionSection.style.cssText="background: blue; min-width: 300px; min-height: 500px; width: 20vw; height: 70vh; display: flex; flex-direction: column; justify-content: center; align-items: center;";

    qContents.style.cssText="width: 100%; background: #fff; margin: 10px 0; font-size: 1.1rem; border-radius: 50px; border: 0; hieght: 6vh; min-height: 40px; text-align: center;";
    qType.style.cssText="width: 100%; background: #fff; margin: 10px 0; font-size: 1.1rem; border-radius: 50px; border: 0; hieght: 6vh; min-height: 40px; text-align: center;";
    qAnswerContents.style.cssText="width: 100%; background: #fff; margin: 10px 0; font-size: 1.1rem; border-radius: 50px; border: 0; hieght: 6vh; min-height: 40px; text-align: center;";

    qAnswersSection.style.cssText="height: 30%; width: 100%; min-height: 150px; overflow-x: hidden; overflow-y: auto;"
    qCorrectAnswerSection.style.cssText="width: 100%; display: flex; align-items: center; justify-content: center;";
    qCorrectAnswerLabel.style.cssText="color: #fff; margin-right: 20px;";
    qCorrectAnswerCheckbox.style.cssText="background; #fff; width: 25px; height: 25px; margin-right: 7px; cursor: pointer;"
    
    /*event listeners*/

    readyQuestionsSection.appendChild(downloadQuestionsButton);

    qCorrectAnswerSection.appendChild(qCorrectAnswerCheckbox);
    qCorrectAnswerSection.appendChild(qCorrectAnswerLabel);
    qCorrectAnswerSection.appendChild(addAnswerButton);

    addQuestionSection.appendChild(qContents);
    addQuestionSection.appendChild(qType);
    addQuestionSection.appendChild(qAnswersSection);
    addQuestionSection.appendChild(qAnswerContents);
    addQuestionSection.appendChild(qCorrectAnswerSection);

    addQuestionSection.appendChild(addQuestionButton);

    questionsSection.appendChild(readyQuestionsSection);
    questionsSection.appendChild(addQuestionSection);

    document.body.prepend(questionsSection);
}

function clearBody()
{
    let nodes = document.body.childNodes;

    for(let node of nodes)
    {
        if(node.tagName != "SCRIPT")
        {
            document.body.removeChild(node);
        }
    }
}