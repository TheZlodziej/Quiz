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
    let uID_ = uID();
    let closeButton = createButton("x", "position: absolute; font-size: 1em; top: 5px; right: 5px; background: transparent; color: #f3f4f6; width: 20px; height: 20px;", ()=>{
        let messageBox_ = document.getElementById(uID_);
        messageBox_.style.opacity = 0;
        closeButton.disabled = true;
        setTimeout(function(){messageBox_.remove();}, 500);
    });

    /*attributes*/
    alertArea.id="alertArea";
    messageBox.id = uID_;
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

function uID()
{
    return '_' + Math.random().toString(36).substr(2, 9);
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
        if(playerInputName.value && playerInputCategory.value){
            playersList.innerHTML += `<div style='margin: 5px 10px; display: flex;'><div style='margin: 0 5px 0 0;'>${escape(playerInputName.value)}</div><div>(${playerInputCategory.value})</div></div>`; //display in some other way;
            players.innerHTML += `<div><div>${escape(playerInputName.value)}</div><div>${playerInputCategory.value}</div></div>`;

            playerInputName.value = "";
            playerInputCategory.value = "";

            playerInputName.focus();
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


function trimText(text, length, ending = "...")
{
    return text.length <= length ? text : text.slice(0, length) + ending;
}

function createQuestionsSection()
{
    let questions = document.createElement("section");
    let answers = document.createElement("section");
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
        let addAnswerButton = createButton("+", "vertical-align: sub; line-height: 9px; background: #ff5a60; font-weight: bold; color: #f3f4f6; font-size: 1.5rem; width: 30px; height: 30px; border-radius: 50%;", ()=>{
            if(qAnswerContents && qAnswerContents.value)
            {   
                let btnID = uID();
                let aID = uID();

                let qAnswerBtn = createButton(trimText(qAnswerContents.value, 10), "", ()=>{
                    let answer = document.getElementById(aID);

                    if(answer.childNodes[1].textContent=="true" ? true : false)
                    {
                        qCorrectAnswerCheckbox.disabled = false;
                    }

                    qAnswerContents.value=answer.childNodes[0].textContent;
                    qCorrectAnswerCheckbox.checked = answer.childNodes[1].textContent=="true" ? true : false;

                    document.getElementById(btnID).remove();
                    answer.remove();
                });

                qAnswerBtn.id=btnID;
                qAnswersSection.prepend(qAnswerBtn);
                answers.innerHTML+=`<div id="${aID}"><div>${qAnswerContents.value}</div><div>${qCorrectAnswerCheckbox.checked}</div></div>`;

                if(qCorrectAnswerCheckbox.checked)
                {
                    qCorrectAnswerCheckbox.disabled = true;
                    qCorrectAnswerCheckbox.checked = false;
                }
                
                qAnswerContents.value = "";
                qAnswerContents.focus;
            } else {
                messageBox("Dodaj treść odpowiedzi!");
            }
        });

    let addQuestionButton = createButton("Dodaj pytanie", "width: 100%; height: 6vh; min-height: 40px; margin: 10% 0 0 0; border-radius: 40px; font-size: 1.1rem; font-weight: bold; text-transform: uppercase; color: #f3f4f6; background: #8bc064;", ()=>{
            if(qContents && qContents.value)
            {
                if(qType && qType.value)
                {
                    if(answers.hasChildNodes())
                    {
                        let readyAnswers = answers.childNodes;
                        let areValid = false;

                        for(let node of readyAnswers)
                        {
                            if(node.childNodes[1].textContent == "true")
                            {
                                areValid = true;
                                break;
                            }
                        }

                        if(areValid)
                        {
                            let qID = uID();
                            let questionBtn = createButton(trimText(qContents.value, 10), "width: 100%; height: 30px;", ()=>{
                                //add old values to the form in the middle
                            });

                            questions.innerHTML+=`<div id=${qID}><div>${qContents.value}</div><div>${qType.value}</div><div>${answers.innerHTML}</div></div>`

                            qContents.value="";
                            qType.value="";
                            qAnswerContents.value="";
                            qCorrectAnswerCheckbox.checked=false;
                            qCorrectAnswerCheckbox.disabled=false;
                            answers.innerHTML="";
                            qAnswersSection.innerHTML="";

                            readyQuestionsSection.prepend(questionBtn);

                        } else { 
                            messageBox("Dodaj przynajmniej jedną dobrą odpowiedź!");
                        }
                    } else {
                        messageBox("Dodaj odpowiedzi do pytania!");
                    }
                } else {
                    messageBox("Dodaj kategorię pytania!");
                }
            } else {
                messageBox("Dodaj treść pytania!");
            }
    });

    let downloadQuestionsButton = createButton("Pobierz pytania", "width: 100%; height: 30px;", ()=>{
        if(questions.hasChildNodes()){
            let textQuestions = questions.childNodes;
            let questions_ = [];

            for(let question of textQuestions)
            {
                //0-content, 1-type, 2-answers
                let answersArray = [];
                let correctAnswerIndex = 0;
                console.log(question.childNodes[2]);
                let textAnswers = question.childNodes[2].childNodes;
                let index = 0;
                for(let answer of textAnswers)
                {
                    answersArray.push(answer.childNodes[0].textContent);

                    if(answer.childNodes[1].textContent=="true")
                    {
                        correctAnswerIndex = index;
                    }

                    index++;
                }

                questions_.push(new Question(question.childNodes[0].textContent, answersArray, correctAnswerIndex, question.childNodes[1].textContent));
            }

            /* credits: https://stackoverflow.com/questions/19721439/download-json-object-as-a-file-from-browser?lq=1 */
            let dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(questions_));
            let aDownload = document.createElement("a");
            aDownload.setAttribute("href", dataStr);
            aDownload.setAttribute("download", "pytania.json");
            aDownload.click();

        } else {
            messageBox("Dodaj pytania!");
        }
    });

    /*attributes*/
    //answers.id="answers";
    qCorrectAnswerCheckbox.id="qCorrectAnswer";

    qCorrectAnswerLabel.for="qCorrectAnswer";

    qContents.placeholder="Treść";
    qType.placeholder="Kategoria";
    qAnswerContents.placeholder="Odpowiedź";

    qCorrectAnswerCheckbox.type="checkbox";
    qCorrectAnswerLabel.textContent="Poprawna odpowiedź";

    /*css*/
    questionsSection.style.cssText="width:100vw; height: 100vh; display: flex; justify-content: center; align-items: center; ";
    readyQuestionsSection.style.cssText="background: red; min-width: 100px; width: 10vw; height: 100vh; position: fixed; left: 0; top: 0;";
    addQuestionSection.style.cssText="background: blue; min-width: 300px; min-height: 500px; width: 20vw; height: 70vh; display: flex; flex-direction: column; justify-content: center; align-items: center;";

    qContents.style.cssText="width: 100%; background: #fff; margin: 10px 0; font-size: 1.1rem; border-radius: 50px; border: 0; hieght: 6vh; min-height: 40px; text-align: center;";
    qType.style.cssText="width: 100%; background: #fff; margin: 10px 0; font-size: 1.1rem; border-radius: 50px; border: 0; hieght: 6vh; min-height: 40px; text-align: center;";
    qAnswerContents.style.cssText="width: 100%; background: #fff; margin: 10px 0; font-size: 1.1rem; border-radius: 50px; border: 0; hieght: 6vh; min-height: 40px; text-align: center;";

    qAnswersSection.style.cssText="height: 30%; width: 100%; min-height: 150px; overflow-x: hidden; overflow-y: auto;";
    qCorrectAnswerSection.style.cssText="width: 100%; display: flex; align-items: center; justify-content: center;";
    qCorrectAnswerLabel.style.cssText="color: #fff; margin-right: 20px;";
    qCorrectAnswerCheckbox.style.cssText="background; #fff; width: 25px; height: 25px; margin-right: 7px; cursor: pointer;";
    
    questions.style.cssText="display: none;";
    answers.style.cssText="display: none;";

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

    questionsSection.appendChild(questions);
    questionsSection.appendChild(answers);
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