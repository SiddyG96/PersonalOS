dragElement(document.getElementById("window"));
dragElement(document.getElementById("window2"));
dragElement(document.getElementById("window3"));
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
var window2Element = document.querySelector("#window2");

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

function handleAppClick(iconElement, windowId) {
    var targetWindow = document.getElementById(windowId);

    if (iconElement.classList.contains("selected")) {
        deselectIcon(iconElement);
    } else {
        if(selectedIcon && selectedIcon !== iconElement) {
            deselectIcon(selectedIcon);
        }
        selectIcon(iconElement);
        if(targetWindow) {
            openWindow(targetWindow);
        }
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

var window2Close = document.querySelector("#window2close");
window2Close.addEventListener("click", function () {
    closeWindow(window2Element);
});

var window3Close = document.querySelector("#window3close");
if(window3Close) {
window3Close.addEventListener("click", function () {
    closeWindow(document.getElementById("window3"));
});
}

var portfolioContent = [
    {

        title:  "Home",
        content: `<p>Welcome to my mini-portfolio! This is a simple showcase of my favorite hobbies, classes, and future aspirations. I hope you find it interesting and informative.</p>`
    },
    {
        title:  "Hobbies",
        content: `
        <h2 style="color: blue;">My Hobbies</h2>
        <p>Some of my hobbies include cooking, hiking, STEM, journaling, and music. I love to play the clarinet and piano in my downtime, but mostly for practice. I cook and bake
        a lot of different dishes. I really enjoy hiking, especially in the moutains. The feeling of summitting a moutain can never be better when imagining compared 
        to real life. STEM is a big part of my life, and I enjoy learning about new technologies and innovations, and I hope to pursue a career in this field in the future,
        especially in the field of aerospace and electrical engineering.</p>`
    },
    {
        title:  "Classes",
        content: `<h2 style="color: black;">Current Classes & Desc</h2>
        <p>Currently taking: </p>
    <p> - Physics: My most interesting class by far. I am looking forward to learning about electromagnetism, optics, and circuitry. </p>
    <p> - Spanish II: I hope to become fluent in Spanish in the future, so I can communicate effectively with a variety of people in the future </p>
    <p> - Precalculus: I am looking forward to learning about calculus in the future, and I want to be prepared for it. I am also looking forward to learning about trigonometry and its applications in the future.</p>
    <p> - AP European History: I personally like going more in-depth on things, hence this over World History.</p>
    <p> - English 10: I want to wait and see, what literature they give us to read. If I like it depends on what the book or piece of literature is about.</p>
    <p> - Band: I like music, and translating my liking for playing it into school gives me a way to destress as well as motivate myself during the day.</p>`
    },
    {
        title:  "Aspirations",
        content: `<h2 style="color: purple;" >Aspirations and a Soliloquy</h2>
        <p>I want to make my future the best it can be. My definition of this is quite different compared to some of my peers. Of course, there is the basic, "I  want to be successful"
         or "I want to build something". But that isn't all for me. I really want to see my past self and see how much I have changed. Good or bad, this will help me make thoughtful and caring decisions.
          So far, STEM has made me see how much competition is in the world, and I hope that though doesn't take over people's minds. Ego is one thing, but another thing; an unhealthy competition,
           can negatively affect you. Comparing yourself to others is the death of peace. Peace helps focus, and wasting your mental power either comparing yourself to others, or constantly asking yourself,
            "What do I have that is better than them?" is not good for you. Anyways, that was enough rambling, and I hope you enjoy the rest of my OS.</p>`
    }
];

function setWindow2Content(index) {
    var contentDiv = document.querySelector("#window2content");
    contentDiv.innerHTML = portfolioContent[index].content;
}

function addToTopBar(index) {
    var topBar = document.querySelector("#window2topbar");
    var screen = portfolioContent[index];

    var newItem = document.createElement("p");
    newItem.style.margin = "0px";
    newItem.style.cursor = "pointer";
    newItem.innerHTML = screen.title;

    newItem.addEventListener("click", function() {
        setWindow2Content(index);
    });
    
    topBar.appendChild(newItem);
}

for (let i = 0; i < portfolioContent.length; i++) {
    addToTopBar(i);
}

setWindow2Content(0);