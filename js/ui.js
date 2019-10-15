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
    let fileInput = document.createElement("input");
    /*attributes*/
    fileInput.type = "file";
    fileInput.accept = ".json";
    fileInput.id="fileInput";

    /*css*/
    fileInput.style.cssText = "color:red;"; //add css

    /*event listeners*/
    fileInput.addEventListener('change', ()=>loadFile()); //start button?
    
    return fileInput;
}

function createButton(text, styles = "", onClickEvent = ()=>{return})
{
    let button = document.createElement("button");
    /*attributes*/
    button.innerText = text;

    /*css*/
    button.style.cssText = "cursor: pointer;" + styles;

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