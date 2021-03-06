/* JavaScript file for GRPB Porsche Chronicle */
/* Beginning with a small array of data (in the wrong format since this will use a database eventually). This allows quicker implementation of the page's functionality. */

/* the website shall function internally with car objects this time, which internally contain their datapoints. */

var porscheModels = [];

/* this value should reduce the need to search "what car we're currently at?" in certain situations, e.g. when up/down buttons are pressed. */
var currentDataBaseIndexHorizontal = 0;
var currentDataBaseIndexVertical = 0;
var verticalTraversingDirection = true;
var dualArrowsLast = false;
var resizeFired = false;




function Porsche(serial, id, showcaseId, family, year, model, indexH, indexV) {
    this.serial = serial;
    this.id = id;
    this.showcaseId = showcaseId;
    this.family = family;
    this.modelYear = year;
    this.modelName = model;
    this.horizontalIndex = indexH;
    this.verticalIndex = indexV;
    /* attempting to follow the Command design pattern, the Porsche commands itself to be drawn on screen. */
    this.draw = draw;
}

Porsche.prototype.toString = function () {
    return "Porsche No. " + this.serial + " at " + this.horizontalIndex + ", " + this.verticalIndex + " is a " + this.modelName + " of " + this.modelYear + ". ID: " + this.id + ", showcase: " + this.showcaseId + ". Belongs to the " + this.family + " family.";
}

function draw() {
    console.log("Rendering: Porsche " + this.modelName + " of " + this.modelYear);
    //console.log(this.toString());
    document.getElementById("porscheYear").innerHTML = this.modelYear;
    document.getElementById("porscheModel").innerHTML = "Porsche " + this.modelName;
    document.getElementById("beaImageContainer").style.backgroundImage = "url(images/" + this.id + ".jpg)";

    document.getElementById("yearSelector").value = this.serial;
    verticalTraversingDirection = directionDefinition(this.verticalIndex);
    currentDataBaseIndexHorizontal = this.horizontalIndex;
    currentDataBaseIndexVertical = this.verticalIndex;
    updateUpDownArrows();
    updateLocalStorage(this.showcaseId, this.horizontalIndex, this.verticalIndex);
}

/* loading from database might be implemented with a for-loop of some kind, but for now three example cars are created manually */

var porscheSerial = ["21", "41", "41", "41", "44", "44", "57"];
var porscheId = ["914_4", "944_S2_Coupe", "964_Carr_4", "Panamerica_89", "968_Coupe", "928_GTS", "911_997"];
var porscheShowcase = ["914_4", "944_S2_Coupe", "964_Carr_4", "Panamerica_89", "968_Coupe", "928_GTS", "911_997"];
var porscheFamily = ["boxster", "944", "911", "concept", "944", "944", "911"];
var porscheYear = ["1969", "1989", "1989", "1989", "1992", "1992", "2005"];
var porscheModel = ["914", "944 S2", "911 Carrera 4 (964)", "Panamericana Concept", "968", "928 GTS", "911 Carrera S (997)"];

/* functions */

// This function prints out all the arrays above in one command.
function porscheDataCheck() {
    console.log(porscheSerial);
    console.log(porscheId);
    console.log(porscheShowcase);
    console.log(porscheFamily);
    console.log(porscheYear);
    console.log(porscheModel);
}


/* loading all porsches found and turning them into Porsche objects */
/* the Porsche array goes in two dimensions, cars of the same year are added as an array for that year */
function loadPorsches(wantedFamily) {
    porscheModels.length = 0;
    var horizontalIndexLoad = 0;
    var verticalIndexLoad = 1;

    for (var i = 0; i < porscheSerial.length; i++) {
        verticalIndexLoad = 1;
        var currentPorsche = new Porsche(porscheSerial[i], porscheId[i], porscheShowcase[i], porscheFamily[i], porscheYear[i], porscheModel[i], 0, 0);
        /* the current Porsche needs to be of the model family the user wants to see on the website */
        if(currentPorsche.family == wantedFamily || wantedFamily == "all") {
            currentPorsche.horizontalIndex = horizontalIndexLoad;

            /* if numerous Porsches of the same year were found or not (assumes the database is in order) */
            if(porscheSerial[i+1] == porscheSerial[i]) {
                var tempArray = [currentPorsche];

                for(var j = i+1; j < porscheSerial.length; j++) {
                    if(porscheSerial[j] == porscheSerial[j-1]) {
                        var nextPorsche = new Porsche(porscheSerial[j], porscheId[j], porscheShowcase[j], porscheFamily[j], porscheYear[j], porscheModel[j], horizontalIndexLoad, verticalIndexLoad);
                        if(nextPorsche.family == wantedFamily || wantedFamily == "all") {
                            verticalIndexLoad++;
                            tempArray.push(nextPorsche);
                        }
                        i++;
                    } else {
                        break;
                    }
                }
                if(tempArray.length > 1) {
                    porscheModels.push(tempArray);
                } else {
                    porscheModels.push(currentPorsche);
                }
            } else {
                porscheModels.push(currentPorsche);
            }
            horizontalIndexLoad++;
        }
    }
    console.log(porscheModels);
}

/* selects the default car of current settings */
function selectDefault() {
    /* we check if there even is a car to draw */
    if(porscheModels.length === 0) {
        console.log("No car to render. Rebuilding database...");
        updateFamilyButtons("all");
        loadPorsches("all");
        selectDefault();
    } else if(porscheModels[0].length > 1) {
        porscheModels[0][0].draw();  
    } else {
        porscheModels[0].draw();
    }
}

/* This function keeps track of what car we last had on screen and in which database coordinates it is. */
function updateLocalStorage(showcase, horizontalIndex, verticalIndex) {
    localStorage.setItem("showcase", showcase);
    localStorage.setItem("lastHorizontalIndex", horizontalIndex);
    localStorage.setItem("lastVerticalIndex", verticalIndex);
    console.log("Showcase: " + showcase + ", Location: " + horizontalIndex + ", " + verticalIndex);
}

// These two functions get called by draw()
// Returns the direction the user was last moving in within the UI
function directionDefinition(newVertIndex) {
    let oldVertIndex = currentDataBaseIndexVertical;

    if(newVertIndex >= oldVertIndex) {
        console.log("Movement down or unchanged.");
        return true;
    } else {
        console.log("Movement up.")
        return false;
    }
}


/* automatic up/down arrow handling based on current database position */
function updateUpDownArrows() {
    /* does our current position have verticality? */
    if(porscheModels[currentDataBaseIndexHorizontal].length > 1) {
        /* does it have cars above and below? If so, put both arrows in the correct order. Quite a resource-intensive operation. */
        if(porscheModels[currentDataBaseIndexHorizontal][currentDataBaseIndexVertical-1] != null && porscheModels[currentDataBaseIndexHorizontal][currentDataBaseIndexVertical+1] != null) {
            handleDualArrows();
            /* has above but not below? */
        } else if(porscheModels[currentDataBaseIndexHorizontal][currentDataBaseIndexVertical-1] != null) {
            upDownArrows("block", "none");
            dualArrowsLast = false;
            /* must only have below */
        } else {
            upDownArrows("none", "block");
            dualArrowsLast = false;
        }
    } else {
        upDownArrows("none", "none");
        dualArrowsLast = false;
    }
}

/* manually shows and hides the up/down navigation arrows in the UI. */
function upDownArrows(state1, state2) {
    var upArrows = document.getElementsByClassName("upArrows");
    var downArrows = document.getElementsByClassName("downArrows");

    for(var i = 0; i < upArrows.length; i++) {
        upArrows[i].style.display = state1;
        downArrows[i].style.display = state2;
    }
}

function handleDualArrows() {
    //console.log("Dual arrow handling: " + !dualArrowsLast + ", direction: " + verticalTraversingDirection);
    if(!dualArrowsLast) {
        var arrowsContainerLeft = document.getElementById("arrowsContainerLeft");
        var arrowsContainerRight = document.getElementById("arrowsContainerRight");
        var downArrowLeft = document.getElementsByClassName("porscheArrowsLeft downArrows")[0];
        var upArrowLeft = document.getElementsByClassName("porscheArrowsLeft upArrows")[0];
        var downArrowRight = document.getElementsByClassName("porscheArrowsRight downArrows")[0];
        var upArrowRight = document.getElementsByClassName("porscheArrowsRight upArrows")[0];
        upDownArrows("block", "block");

        for(var i = 0; i < arrowsContainerLeft.length; i++) {
            arrowsContainerLeft.children[i].remove();
            arrowsContainerRight.children[i].remove();
        }

        if(verticalTraversingDirection == false) {
            arrowsContainerLeft.appendChild(upArrowLeft);
            arrowsContainerLeft.appendChild(downArrowLeft);
            arrowsContainerRight.appendChild(downArrowRight);
            arrowsContainerRight.appendChild(upArrowRight);
        } else {
            arrowsContainerLeft.appendChild(downArrowLeft);
            arrowsContainerLeft.appendChild(upArrowLeft);
            arrowsContainerRight.appendChild(upArrowRight);
            arrowsContainerRight.appendChild(downArrowRight);
        }
        dualArrowsLast = true;
    }
}

function changeCurrentFamily() {
    console.log("Changing model family to " + this.id + ".");
    updateFamilyButtons(this.id);
    loadPorsches(this.id);
    selectDefault();
}

function moveSelectionUp() {
    moveSelection(false);
}

function moveSelectionDown() {
    moveSelection(true);
}

/* this function handles moving between different cars of the same year when the up/down arrows are clicked. */
function moveSelection(direction) {
    switch(direction) {
        case false:
            porscheModels[currentDataBaseIndexHorizontal][currentDataBaseIndexVertical-1].draw();
            break;
        case true:
            porscheModels[currentDataBaseIndexHorizontal][currentDataBaseIndexVertical+1].draw();
            break;
        default:
            console.log("moveSelection called with invalid parameter.")
            currentDataBaseIndexVertical = 0;
            porscheModels[currentDataBaseIndexHorizontal][currentDataBaseIndexVertical].draw();
    }
}

/* changes the porsche car when user changes the year in the timeline */
function yearChange() {
    /* we store the model year the user wants and find the first car that matches this year from our data */
    var newPorscheFound = false;
    var wantedSerial = document.getElementById("yearSelector").value;

    for(var i = 0; i < porscheModels.length; i++) {
        if(porscheModels[i].length > 1 && porscheModels[i][0].serial == wantedSerial) {
            porscheModels[i][0].draw();
            newPorscheFound = true;

        } else if(porscheModels[i].serial == wantedSerial) {
            porscheModels[i].draw();
            newPorscheFound = true;
        }
    }
    if(!newPorscheFound) {
        console.log("Found nothing.");
    }
}

/* stores the selector value when the user begins clicking the slider. */

function beginTraversing() {
    var year = document.getElementById("yearSelector").value;
    traversingDirectionStart = year;
}

/* These function will handle the Ajax call using the button at the top of the page. This functionality will be standard in the final version. */

//This function will attempt to connect to the server. Porsche-loading only proceeds on success.
function attemptConnection() {
    var frontEndStatus = document.getElementById("ajaxStatus");
    frontEndStatus.style.display = "block";
    
    ajaxFrontEndHandler("Attempting to connect to the database...", "blueviolet");
    console.log("Attempting to connect to the database...");
    
    var ajax = new XMLHttpRequest();

    ajax.open("GET", "dbhtest.php", true);
    ajax.send();

    ajax.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            ajaxData = this.responseText.substring(10, 31);
            if(ajaxData == "GPRBPorscheMuseum2020") {
                ajaxFrontEndHandler("Connection established.", "green");
                console.log("Connection established.");
                loadNewPorsche();
            } else {
                ajaxFrontEndHandler("Connection failed.", "red");
                console.log("Connection failed.");
            }
        }
    };
}

// I hate repeating lines of code.
function ajaxFrontEndHandler(text, color) {
    var frontEndStatus = document.getElementById("ajaxStatus");
    frontEndStatus.innerHTML = text;
    frontEndStatus.style.color = color;
}

// With the way this software is posted on github, users must create a mySQL-database on their PC to load items from there.
// This is where the Ajax magic happens. Thanks to w3schools!
// Typical Ajax call that 1. fetches my .php-file, 2. queries my database for data and 3. plasters the response text into three divs of the HTML-file.
function loadNewPorsche() {
    var ajax = new XMLHttpRequest();

    ajax.open("GET", "dbh.php", true);
    ajax.send();

    ajax.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            //The php-file returns JSON, which is converted to an array here.
            ajaxData = JSON.parse(this.responseText);
            console.log(ajaxData);
            implementLoadedPorsche(Math.floor(Math.random() *2));
        }
    };
}

// Replaces the default cars with the cars found in the database.
function implementLoadedPorsche(index) {
    document.getElementById("porscheYear").innerHTML = ajaxData[index].year;
    document.getElementById("porscheModel").innerHTML = "Porsche " + ajaxData[index].model;
    
    // Empties the default cars
    porscheSerial.length = 0;
    porscheId.length = 0;
    porscheShowcase.length = 0;
    porscheFamily.length = 0;
    porscheYear.length = 0;
    porscheModel.length = 0;
    
    // Then puts new ones in their place!
    for (var i = 0; i < ajaxData.length; i++) {
        porscheSerial.push(ajaxData[i].serial);
        porscheId.push(ajaxData[i].porsche);
        porscheShowcase.push(ajaxData[i].showcase);
        porscheFamily.push(ajaxData[i].family);
        porscheYear.push(ajaxData[i].year);
        porscheModel.push(ajaxData[i].model);
    }
    
    porscheDataCheck();
    updateFamilyButtons("all");
    loadPorsches("all");
    selectDefault();
}




/* main loop */
loadPorsches("all");
window.onload = function() {
    selectDefault();
    document.getElementById("yearSelector").addEventListener('input', yearChange);
    document.getElementById("yearSelector").addEventListener('mousedown', beginTraversing);
    document.getElementById("porscheLoaderButton").addEventListener('click', attemptConnection);
    var upArrows = document.getElementsByClassName("upArrows");
    var downArrows = document.getElementsByClassName("downArrows");
    var familyButtons = document.getElementsByClassName("porscheFamilyButton");

    for(var i = 0; i < upArrows.length; i++) {
        upArrows[i].addEventListener('click', moveSelectionUp);
        downArrows[i].addEventListener('click', moveSelectionDown);
    }

    for(var j = 0; j < familyButtons.length; j++) {
        familyButtons[j].addEventListener('click', changeCurrentFamily);
    }
}