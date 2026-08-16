dragElement(document.getElementById("window"));
dragElement(document.getElementById("window2"));
function dragElement(element) {

    var initialX = 0;
    var initialY = 0;
    var currentX = 0;
    var currentY = 0;
//Logic used from AI for header variable (tinkered with it to work with my code)
    var header = document.getElementById(element.id + "header") || document.getElementById("welcome");

    if(header) {
        header.onmousedown = startDragging;
    }

    function startDragging(e) {
        e=e || window.event;
        e.preventDefault();

        initialX = e.clientX;
        initialY = e.clientY;

        document.onmouseup = stopDragging;
        document.onmousemove = dragElement;

    }

    function dragElement(e) {
        e=e || window.event;
        e.preventDefault();

        currentX = initialX - e.clientX;
        currentY = initialY - e.clientY;
        initialX = e.clientX;
        initialY = e.clientY;

        element.style.top = (element.offsetTop - currentY) + "px";
        element.style.left = (element.offsetLeft - currentX) + "px";
    }
    
    function stopDragging() {
        document.onmouseup = null;
        document.onmousemove = null;
    }

    
}

var windowElement = document.querySelector("#window");

//Logic used from AI for saving the position of the window when closed and restoring it when opened (savedTop/savedLeft variables)
let savedTop = windowElement.style.top || "50%";
let savedLeft = windowElement.style.left || "50%";


function closeWindow(element) {
    savedTop = element.style.top || "50%";
    savedLeft = element.style.left || "50%";
    element.style.display = "none";
}

function openWindow(element) {
    element.style.display = "block";
    element.style.top = savedTop;
    element.style.left = savedLeft;
}

var welcomeScreenClose = document.querySelector("#welcomeclose");
var welcomeScreenOpen = document.querySelector("#welcomeopen");

welcomeScreenClose.addEventListener("click", function() {
    closeWindow(windowElement);
  });
  
  welcomeScreenOpen.addEventListener("click", function() {
    openWindow(windowElement);
  });


var selectedIcon = undefined;

function handleIconTap(element) {
    if (element.classList.contains("selected")) {
        deselectIcon(element);
        openWindow(window);
    } else {
        selectIcon(element);
    }

}

function selectIcon(element) {
    element.classList.add("selected");
    selectedIcon = element;
}

function deselectIcon(element) {
    element.classList.remove("selected");
    selectedIcon = undefined;
}
