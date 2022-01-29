var cssStyle = document.getElementById('style');
var listStyles = ["/css/style.css", "/css/dark.css"];
window.onload = function(){
    if(localStorage && localStorage.getItem("style"))
        cssStyle.href = localStorage.getItem("style");
};
function toggleStyle(){
    var previousStyle = cssStyle.href;
    if(previousStyle.endsWith(listStyles[0]))
        newStyle = listStyles[1];
    else
        newStyle = listStyles[0];
    cssStyle.href = newStyle;
    if(localStorage)
        localStorage.setItem("style", newStyle);
};