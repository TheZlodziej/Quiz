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
    let playersInputSection = document.createElement("section");
    let playersList = document.createElement("section");
    let playerInput = document.createElement("input");
    let addButton = createButton("dodaj", "", ()=>{
        let pI = document.getElementById("playerInput");
        let pL = document.getElementById("playersList");
        //ask for types
        console.log(pL);
        if(pI.value){
            pL.innerHTML += pI.value + ", ";
            pI.value = "";
        } else {
            alert("you can't add player with no name");
        }
    })
    /*attributes*/
    playerInput.id="playerInput";
    playersList.id="playersList";

    /*css*/
    playersList.style.cssText="color: #f3f4f6;";


    playersInputSection.appendChild(playersList);
    playersInputSection.appendChild(playerInput);
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