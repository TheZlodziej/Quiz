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

function createPlayersInput()
{
    let playersInputSection = document.createElement("form");
    let playersList = document.createElement("section");
    let playerInputName = document.createElement("input");
    let playerInputCategory = document.createElement("input");
    let players = document.createElement("section");

    let addButton = createButton("dodaj gracza", "background: #8bc064; width: 100%; margin: 10px 0; height: 6vh; min-height: 40px; border-radius: 50px; text-transform: uppercase; font-weight: bold; color: #f3f4f6; font-size: 1.1rem;", ()=>{
        let pIN = document.getElementById("playerInputName");
        let pIC = document.getElementById("playerInputCategory");
        let pL = document.getElementById("playersList");

        if(pIN.value && pIC.value){
            pL.innerHTML += "<div style='margin: 5px 10px; display: flex;'><div style='margin: 0 5px 0 0;'>" + escape(pIN.value) + "</div><div>(" + escape(pIC.value) + ")</div></div>"; //display in some other way;
            players.innerHTML += "<div><div>" + escape(pIN.value) + "</div><div>" + escape(pIC.value) + "</div></div>";

            pIN.value = "";
            pIC.value = "";

            pIN.focus();
        } else {
            alert("fill up all empty space");
        }
    });

    /*attributes*/
    playerInputName.id="playerInputName";
    playerInputCategory.id="playerInputCategory";
    playersList.id="playersList";
    players.id="players";

    playerInputName.placeholder="nazwa";
    playerInputCategory.placeholder="kategoria";

    playerInputName.maxLength="16";
    playerInputCategory.maxLength="16";

    addButton.type="submit";

    /*css*/
    playersInputSection.style.cssText="width: 20vw; min-width: 200px; display: flex; flex-direction: column; align-items: center; justify-content: center;";
    playersList.style.cssText="width: 100%; height: 30vh; margin: 0 0 10px 0; max-height: 300px; min-height: 40px; font-size: 1.1rem; overflow-y: auto; overflow-x: hidden; color: #f3f4f6; display: flex; align-items: center; justify-content: center; flex-wrap: wrap; align-content: center;";
    playerInputName.style.cssText="margin: 10px 0; width: 100%; height: 6vh; min-height: 40px; font-size: 1.1rem; border-radius: 50px; border: 0; text-align: center;";
    playerInputCategory.style.cssText="margin: 10px 0; width: 100%; height: 6vh; min-height: 40px; font-size: 1.1rem; border-radius: 50px; border: 0; text-align: center;";
    players.style.cssText="display: none";

    /*event listeners*/
    playersInputSection.addEventListener("submit", (e)=>e.preventDefault());

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