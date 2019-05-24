function responsive() {
    var width = window.innerWidth;
    var bodyHolder = document.getElementById("bodyHolder");
    if(width < 780) {
        bodyHolder.style.width = "auto";
        bodyHolder.style.marginLeft = "0%";
        bodyHolder.style.marginTop = "0%";
        bodyHolder.style.marginBottom = "0%";
    }else {
        bodyHolder.style.width = "60%";
        bodyHolder.style.marginLeft = "20%";
        bodyHolder.style.marginTop = "2%";
        bodyHolder.style.marginBottom = "2%";
    }
}

responsive();

// document.onreadystatechange = responsive;

// document.onreadystatechange = function() {
//     if (document.readyState === "complete") {
//         responsive();
//     }
// };

window.onresize = responsive;