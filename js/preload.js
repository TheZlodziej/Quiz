window.addEventListener("load", () => {
    /* background pattern credits: https://leaverou.github.io/css3patterns/#carbon-fibre */
    document.body.style.cssText =  "font-family: 'Lato', sans-serif; margin:0; padding:0; box-sizing:border-box;background:radial-gradient(black 15%, transparent 16%) 0 0,radial-gradient(black 15%, transparent 16%) 8px 8px,radial-gradient(rgba(255,255,255,.1) 15%, transparent 20%) 0 1px,radial-gradient(rgba(255,255,255,.1) 15%, transparent 20%) 8px 9px;background-color:#282828;background-size:16px 16px;";
    loadingAnimation();
    gameMenu();
});