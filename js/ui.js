//      FUNCTION TEMPLATE 
//
//    function elementName(arguments)
//    {
//        /*attributes*/
//
//        /*css*/
//
//        /*event listeners*/
//
//    }

function messageBox(message, duration = 5000)
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
    alertArea.prepend(messageBox) || document.body.appendChild(alertArea);

    setTimeout(function(){ 
        messageBox.style.opacity=0; 
        setTimeout(function(){ 
            messageBox.remove()
        },500); 
    }, duration);
}

function uID()
{
    return '_' + Math.random().toString(36).substr(2, 9);
}

function createFileInput(edition)
{
    let fileInputSection = document.createElement("section");
    let fileInput = document.createElement("input");
    let fileInputLabel = document.createElement("label");
    let backArrow = createBackArrow(()=>{
        if(edition)
        {
            createQuestions();
        }
        else
        {
            gameMenu();
        }
    })

    /*attributes*/
    fileInput.type = "file";
    fileInput.accept = ".json";
    fileInput.id="fileInput";

    fileInputLabel.htmlFor = "fileInput";
    fileInputLabel.innerHTML = "Wybierz plik z pytaniami";

    /*css*/
    fileInputSection.style.cssText = "height: 100vh; width: 100vw; display: flex; flex-direction: column; justify-content: space-around; align-items: center; position: relative;";
    fileInput.style.cssText = "display: none;"; 
    fileInputLabel.style.cssText = "background: #ff5a60; padding: 15px 35px; border-radius: 50px; text-transform: uppercase; font-weight: bold; cursor: pointer; color: #f3f4f6; font-size: 1.1rem;";

    /*event listeners*/
    fileInput.addEventListener('change', ()=>loadFile(edition));

    fileInputSection.appendChild(backArrow);
    fileInputSection.appendChild(fileInput);
    fileInputSection.appendChild(fileInputLabel);

    document.body.prepend(fileInputSection);
}

function createBackArrow(previousState)
{
    let backArrow = document.createElement("section");
    let arrowIcon = document.createElement("i");

    /*attributes*/

    /*styles*/
    arrowIcon.style.cssText = "border: solid #f3f4f6; border-width: 0 3px 3px 0; display: inline-block; padding: 10px; transform: rotate(135deg); -webkit-transform: rotate(135deg);";
    backArrow.style.cssText = "cursor: pointer; position: absolute; left: 20px; top: 15px; z-index: 4; padding: 15px;";

    /*event listeners*/
    backArrow.addEventListener("click", previousState);

    backArrow.appendChild(arrowIcon);

    return backArrow;
}

function createPlayersInput(parsedJSON)
{
    let playersInputSectionContainer = document.createElement("section");
    let startButton = createButton("rozpocznij", "background: #689eb8; height: 50px; min-height: 50px; width: 300px; font-size: 1.1rem; color: #f3f4f6; border-radius: 50px; text-transform: uppercase; font-weight: bold;", ()=>loadPlayers(parsedJSON));
    let playersInputSection = document.createElement("form");
    let playersList = document.createElement("section");
    let playerInputName = document.createElement("input");
    let playerInputCategory = document.createElement("select");
    let players = document.createElement("section");
    let categoryPlaceholder = document.createElement("option");
    let categories = [];

    let addButton = createButton("dodaj gracza", "background: #8bc064; margin: 10px 0; height: 50px; width: 300px; border-radius: 50px; text-transform: uppercase; font-weight: bold; color: #f3f4f6; font-size: 1.1rem;", ()=>{
        if(playerInputName.value){
            if(playerInputCategory.value){
            playersList.innerHTML += `<div style='margin: 5px 10px; display: flex;'><div style='margin: 0 5px 0 0;'>${escape(playerInputName.value)}</div><div>(${playerInputCategory.value})</div></div>`;
            players.innerHTML += `<div><div>${escape(playerInputName.value)}</div><div>${playerInputCategory.value}</div></div>`;

            playerInputName.value = "";
            playerInputCategory.value = "";

            playerInputName.focus();
            } else {
                messageBox("Wybierz kategorię gracza!");
            }    
        } else {
            messageBox("Dodaj nazwę gracza!");
        }
    });

    let backArrow = createBackArrow(()=>{
        //clearBody();
        showQuestionsInput();
    });

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
    playersInputSectionContainer.style.cssText="height: 100vh; width: 100vw; display: flex; flex-direction: column; justify-content: space-around; align-items: center;";
    playersInputSection.style.cssText="width: 20vw; min-width: 200px; display: flex; flex-direction: column; align-items: center; justify-content: center; position: relative;";
    playersList.style.cssText="width: 100%; height: 30vh; margin: 0 0 10px 0; max-height: 300px; min-height: 40px; font-size: 1.1rem; overflow-y: auto; overflow-x: hidden; color: #f3f4f6; display: flex; align-items: center; justify-content: center; flex-wrap: wrap; align-content: center;";
    playerInputName.style.cssText="background: #fff; color: gray; margin: 10px 0; height: 50px; width: 300px; font-size: 1.1rem; border-radius: 50px; border: 0; text-align: center;";
    playerInputCategory.style.cssText=" -moz-appearance: none; -webkit-appearance: none; appearance: none; background: #fff; text-align-last:center; cursor: pointer; margin: 10px 0; height: 50px; width: 300px; font-size: 1.1rem; border-radius: 50px; border: 0; outline: none; color: gray;";
    players.style.cssText="display: none";

    /*event listeners*/
    playersInputSection.addEventListener("submit", (e)=>e.preventDefault());

    playerInputCategory.prepend(categoryPlaceholder);
    playersInputSection.appendChild(players);
    playersInputSection.appendChild(playersList);
    playersInputSection.appendChild(playerInputName);
    playersInputSection.appendChild(playerInputCategory);
    playersInputSection.appendChild(addButton);

    playersInputSectionContainer.appendChild(playersInputSection);
    playersInputSectionContainer.appendChild(startButton);
    playersInputSectionContainer.appendChild(backArrow);

    document.body.prepend(playersInputSectionContainer);
}

function createButton(text, styles = "", onClickEvent = ()=>{return})
{
    let button = document.createElement("button");
    /*attributes*/
    button.innerHTML = text;

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

function loadingAnimation(length = 1000)
{    
    let animationContainer = document.createElement("section");
    let labelContainer = document.createElement("section");
    let loadingLabel = document.createElement("div");
    let barContainer = document.createElement("section");
    let loadingBar = document.createElement("div");
    let barCover = document.createElement("div");
    let barPercents = document.createElement("section");
    let ending = document.createElement("div");

    let percents = 0;

    /*animation*/
    let animation = setInterval(()=>{
        percents++;

        if(percents%19==0){
            if(ending.textContent.length==1)
            {
                ending.textContent = "..";
            } 
            else if(ending.textContent.length==2) 
            {
                ending.textContent = "...";
            } 
            else {
                ending.textContent = ".";
            }
        }

        barPercents.textContent=`${percents}%`;
        barCover.style.width=`${percents}%`;
        if(percents==100)
        {
            clearInterval(animation);
            setTimeout(()=>animationContainer.remove(), 500);
        }
    },length/100); //length divided by 100 - 1% == 1 frame

    /*attributes*/
    loadingLabel.textContent = "Ładowanie";
    ending.textContent = ".";

    /*css*/
    animationContainer.style.cssText="position: fixed; top: 0; left: 0; z-index: 9999; width:100vw; height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; background:radial-gradient(black 15%, transparent 16%) 0 0,radial-gradient(black 15%, transparent 16%) 8px 8px,radial-gradient(rgba(255,255,255,.1) 15%, transparent 20%) 0 1px,radial-gradient(rgba(255,255,255,.1) 15%, transparent 20%) 8px 9px;background-color:#282828;background-size:16px 16px;";
    loadingLabel.style.cssText="color: #f3f4f6; font-size: 1.5em;";
    loadingBar.style.cssText="margin: 20px 0; width: 24vw; min-width: 300px; height: 5vh; min-height: 40px; border-radius: 50px; background: linear-gradient(90deg, rgba(104,158,184,1) 10%, rgba(255,90,96,1) 50%, rgba(139,192,100,1) 90%);";
    barContainer.style.cssText="width: 24vw; min-width: 300px;";
    barCover.style.cssText="overflow: hidden; width: 0;";
    barPercents.style.cssText="color: #f3f4f6;";
    labelContainer.style.cssText="display: flex;"
    ending.style.cssText="width: 20px; color: #f3f4f6; font-size: 1.5em;";

    /*event listeners*/
    barCover.appendChild(loadingBar);
    barContainer.appendChild(barCover);
    labelContainer.appendChild(loadingLabel);
    labelContainer.appendChild(ending);
    animationContainer.appendChild(labelContainer);
    animationContainer.appendChild(barContainer);
    animationContainer.appendChild(barPercents);

    document.body.prepend(animationContainer);
}

function createQuestionsSection()
{
    let backArrow = createBackArrow(()=>{
        gameMenu();
    });
    let questions = document.createElement("section");
    let answers = document.createElement("section");
    let questionsSection = document.createElement("section");
    let readyQuestionsSection = document.createElement("section");
    let addQuestionSection_ = document.createElement("section"); //container for addQuestionSection form (so it doesn't resize on window change)
    let addQuestionSection = document.createElement("section");
    let qContents = document.createElement("input");
    let qType = document.createElement("input");
    let qAnswersSection = document.createElement("section");
    let qAnswerContents = document.createElement("input");
    let qCorrectAnswerSection = document.createElement("section");
    let downloadButtonSection = document.createElement("section");
    let rQdBtnSection = document.createElement("section");
        let qCorrectAnswerLabel = document.createElement("label");
        let qCorrectAnswerCheckbox = document.createElement("input");
        let addAnswerButton = createButton("+", "vertical-align: sub; line-height: 9px; background: #ff5a60; font-weight: bold; color: #f3f4f6; font-size: 1.5rem; width: 30px; height: 30px; border-radius: 50%;", ()=>{
            if(qAnswerContents && qAnswerContents.value)
            {   
                let btnID = uID();
                let aID = uID();

                let qAnswerBtn = createButton(trimText(qAnswerContents.value, 6), `width: 20%; height; 10%; font-size: 1.1em; min-height: 27px; min-width: 90px; margin: 3px 3px; border-radius: 50px; color: #f3f4f6; ${qCorrectAnswerCheckbox.checked ? "background: #8bc064;" : "background: #689eb8;"}`, ()=>{
                    let answer = document.getElementById(aID);

                    if(answer.childNodes[1].textContent=="true")
                    {
                        qCorrectAnswerCheckbox.disabled = false;
                    }

                    qAnswerContents.value=answer.childNodes[0].textContent;
                    qCorrectAnswerCheckbox.checked = answer.childNodes[1].textContent=="true";

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

    let addQuestionButton = createButton("Dodaj pytanie", "height: 50px; width: 300px; margin: 12% 0 0 0; border-radius: 40px; font-size: 1.1rem; font-weight: bold; text-transform: uppercase; color: #f3f4f6; background: #8bc064;", ()=>{
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
                            let qBtnID = uID();

                            let questionBtn = createButton(trimText(qContents.value, 10), "margin-top: 13px; width: 90%; height: 40px; border-radius: 50px; color: #f3f4f6; background: #8bc064;", ()=>{
                                let question = document.getElementById(qID);

                                qContents.value = question.childNodes[0].textContent;
                                qType.value = question.childNodes[1].textContent;
                            
                                for(let answer of question.childNodes[2].childNodes)
                                {
                                    let aID = uID();
                                    let btnID = uID();
                                    //tu jak cofasz pytanie to ta poprawna sie nie koloruje
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

                                document.getElementById(qBtnID).remove();
                                document.getElementById(qID).remove();
                            });

                            questions.innerHTML+=`<div id="${qID}"><div>${qContents.value}</div><div>${qType.value}</div><div>${answers.innerHTML}</div></div>`;

                            questionBtn.id=qBtnID;
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

    let downloadQuestionsButton = createButton("Pobierz pytania", `border-radius: 50px; background: #ff5a60; color: #f3f4f6; text-transform: uppercase; font-weight: bold; ${window.innerWidth < 600 ? "width: 80%;" : "width: 100%;"} height: 42px;`, ()=>{
        if(questions.hasChildNodes()){
            let textQuestions = questions.childNodes;
            let questions_ = [];

            for(let question of textQuestions)
            {
                //0-content, 1-type, 2-answers
                let answersArray = [];
                let correctAnswerIndex = 0;
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

    let editQuestionsButton = createButton("Edytuj pytania!", "font-weight: bold; text-transform: uppercase; font-size:.9em; background: #ff5a60; color: #f3f4f6; width: 170px; border-radius: 50px; height: 42px; position: absolute; right: 20px; top: 20px;", ()=>{
        clearBody();
        createFileInput(true);
    });

    /*attributes*/
    qCorrectAnswerCheckbox.id="qCorrectAnswer";
    readyQuestionsSection.id="readyQuestionsSection";
    qContents.id="qContents";
    qType.id="qType";
    qAnswersSection.id="qAnswersSection";
    qAnswerContents.id="qAnswerContents";
    answers.id = "qAnswers";
    questions.id="qQuestions";

    qCorrectAnswerLabel.for="qCorrectAnswer";

    qContents.placeholder="Treść";
    qType.placeholder="Kategoria";
    qAnswerContents.placeholder="Odpowiedź";

    qCorrectAnswerCheckbox.type="checkbox";
    qCorrectAnswerLabel.textContent="Poprawna odpowiedź";

    /*css*/
    questionsSection.style.cssText="width:100vw; display: flex; flex-direction: column; justify-content: center; align-items: center;";
    rQdBtnSection.style.cssText=`${window.innerWidth < 600 ? "width: 100vw;" : "position: fixed; top: 0; left: 0; width: 15vw; max-width: 300px;"} min-width: 200px; height: 100vh; padding: 10px; display: flex; flex-direction: column;`;
    addQuestionSection.style.cssText=`${window.innerWidth < 600 ? "margin-top: 20px; height: calc(70vh+20px);" : "margin-top: 0px; height: 70vh;"} min-width: 300px; min-height: 600px; width: 20vw; display: flex; flex-direction: column; justify-content: center; align-items: center;`;
    addQuestionSection_.style.cssText="min-height: 100vh; width: 100vw; display: flex; justify-content: center; align-items: center;";

    readyQuestionsSection.style.cssText="padding: 55px 0 0 0; overflow-y: overlay; overflow-x: hidden; width: 100%; height: 80%; position: flex; display: flex; flex-direction: column; align-items: center; justify-content: flex-start;";
    downloadButtonSection.style.cssText="width: 100%; height: 20%; display: flex; align-items: center; justify-content: center;";

    qContents.style.cssText="background: #fff; margin: 10px 0; font-size: 1.1rem; border-radius: 50px; border: 0; height: 50px; width: 300px; text-align: center;";
    qType.style.cssText="background: #fff; margin: 10px 0; font-size: 1.1rem; border-radius: 50px; border: 0; height: 50px; width: 300px; text-align: center;";
    qAnswerContents.style.cssText="background: #fff; margin: 10px 0 15px 0; font-size: 1.1rem; border-radius: 50px; border: 0; height: 50px; width: 300px; text-align: center;";

    qAnswersSection.style.cssText="padding: 5px 0; display: flex; flex-wrap: wrap; align-items: flex-start; justify-content: center; height: 30%; width: 100%; min-height: 150px; overflow-x: hidden; overflow-y: auto;";
    qCorrectAnswerSection.style.cssText="width: 100%; display: flex; align-items: center; justify-content: center;";
    qCorrectAnswerLabel.style.cssText="color: #fff; margin-right: 20px;";
    qCorrectAnswerCheckbox.style.cssText="background; #fff; width: 25px; height: 25px; margin-right: 7px; cursor: pointer;";
    
    questions.style.cssText="display: none;";
    answers.style.cssText="display: none;";

    /*event listeners*/
    window.addEventListener("resize", ()=>{
        if(window.innerWidth < 600)
        {
            downloadQuestionsButton.style.width = "80%";

            rQdBtnSection.style.width = "100vw";
            rQdBtnSection.style.position = "";
            rQdBtnSection.style.maxWidth = "100vw";

            addQuestionSection.style.height = "calc(70vh+20px)";
            addQuestionSection.style.marginTop = "20px";
        }
        else
        {
            downloadQuestionsButton.style.width = "100%";

            rQdBtnSection.style.width = "15vw";
            rQdBtnSection.style.maxWidth = "300px";
            rQdBtnSection.style.position = "fixed";
            rQdBtnSection.style.top = 0;
            rQdBtnSection.style.left = 0;

            addQuestionSection.style.height = "70vh";
            addQuestionSection.style.marginTop = "0px";
        }
    });

    qCorrectAnswerSection.appendChild(qCorrectAnswerCheckbox);
    qCorrectAnswerSection.appendChild(qCorrectAnswerLabel);
    qCorrectAnswerSection.appendChild(addAnswerButton);

    addQuestionSection.appendChild(qContents);
    addQuestionSection.appendChild(qType);
    addQuestionSection.appendChild(qAnswersSection);
    addQuestionSection.appendChild(qAnswerContents);
    addQuestionSection.appendChild(qCorrectAnswerSection);
    addQuestionSection.appendChild(addQuestionButton);

    addQuestionSection_.appendChild(addQuestionSection);

    downloadButtonSection.appendChild(downloadQuestionsButton);

    rQdBtnSection.appendChild(readyQuestionsSection);
    rQdBtnSection.appendChild(downloadButtonSection);

    questionsSection.appendChild(editQuestionsButton);
    questionsSection.appendChild(questions);
    questionsSection.appendChild(answers);
    questionsSection.appendChild(addQuestionSection_);
    questionsSection.appendChild(rQdBtnSection);
    questionsSection.appendChild(backArrow);

    document.body.prepend(questionsSection);
}

function clearBody()
{
    let nodes = document.body.childNodes;

    for(let node of nodes)
    {
        if(node.tagName != "SCRIPT")
        {
            node.remove();
        }
    }
}