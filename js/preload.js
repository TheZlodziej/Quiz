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
      let parsedJSON = JSON.parse(fileContent);
      initGame(parsedJSON); //start button??
    }
}

window.addEventListener("load", () => {
    document.body.style.cssText =  "margin:0;padding:0;box-sizing:border-box;";
    gameMenu();
});