/* JavaScript file for GRPB Porsche Chronicle */
/* Beginning with a small array of data (in the wrong format since this will use a database eventually). This allows quicker implementation of the page's functionality. */

/* the website shall function internally with car objects this time, which internally contain their datapoints. */

var porscheModels = [];

/* this value should reduce the need to search "what car we're currently at?" in certain situations, e.g. when up/down buttons are pressed. */
var currentDataBaseIndexHorizontal = 0;
var currentDataBaseIndexVertical = 0;

function Porsche(serial, id, showcaseId, family, year, model) {
    this.serial = serial;
    this.id = id;
    this.showcaseId = showcaseId;
    this.family = family;
    this.modelYear = year;
    this.modelName = model;
    /* attempting to follow the Command design pattern, the Porsche commands itself to be drawn on screen. */
    this.draw = draw;
}

Porsche.prototype.toString = function () {
    return "Porsche no. " + this.serial + " is a " + this.modelName + " of " + this.modelYear + " with an id of " + this.id + ". It uses the showcase of " + this.showcaseId + " and is part of the " + this.family + " line.";
}

function draw(index1, index2) {
    document.getElementById("porscheYear").innerHTML = this.modelYear;
    document.getElementById("porscheModel").innerHTML = "Porsche " + this.modelName;
    document.getElementById("porscheImageContainer").style.backgroundImage = "url(images/" + this.id + ".jpg)";

    document.getElementById("yearSelector").value = this.serial;
    currentDataBaseIndexHorizontal = index1;
    currentDataBaseIndexVertical = index2;
    console.log(currentDataBaseIndexHorizontal + ", " + currentDataBaseIndexVertical);
    updateUpDownArrows();
}

/* loading from database might be implemented with a for-loop of some kind, but for now three example cars are created manually */

var porscheSerial = ["21", "41", "41", "41", "44", "44", "57"];
var porscheId = ["914_4", "944_S2_Coupe", "964_Carr_4", "Panamerica_89", "968_Coupe", "928_GTS", "911_997"];
var porscheShowcase = ["914_4", "944_S2_Coupe", "964_Carr_4", "Panamerica_89", "968_Coupe", "928_GTS", "911_997"];
var porscheFamily = ["boxster", "944", "911", "concept", "944", "944", "911"];
var porscheYear = ["1969", "1989", "1989", "1989", "1992", "1992", "2005"];
var porscheModel = ["914", "944 S2", "911 Carrera 4 (964)", "Panamericana Concept", "968", "928 GTS", "911 Carrera S (997)"];




/* functions */

/* loading all porsches found and turning them into Porsche objects */
/* the Porsche array goes in two dimensions, cars of the same year are added as an array for that year */
function loadPorsches(wantedFamily) {
    porscheModels.length = 0;
    for (var i = 0; i < porscheSerial.length; i++) {
        var currentPorsche = new Porsche(porscheSerial[i], porscheId[i], porscheShowcase[i], porscheFamily[i], porscheYear[i], porscheModel[i]);
        /* the current Porsche needs to be of the model family the user wants to see on the website */
        if(currentPorsche.family == wantedFamily || wantedFamily == "all") {

            /* if numerous Porsches of the same year were found or not (assumes the database is in order) */
            if(porscheSerial[i+1] == porscheSerial[i]) {
                var begin = i+1;
                var tempArray = [currentPorsche];

                for(var j = begin; j < porscheSerial.length; j++) {
                    if(porscheSerial[j] == porscheSerial[j-1]) {
                        var nextPorsche = new Porsche(porscheSerial[j], porscheId[j], porscheShowcase[j], porscheFamily[j], porscheYear[j], porscheModel[j]);
                        if(nextPorsche.family == wantedFamily || wantedFamily == "all") {
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
        porscheModels[0][0].draw(0, 0);  
    } else {
        porscheModels[0].draw(0, 0);
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

/* automatic up/down arrow handling based on current database position */
function updateUpDownArrows() {
    /* does our current position have verticality? */
    if(porscheModels[currentDataBaseIndexHorizontal].length > 1) {
        /* does it have cars above and below? */
        if(porscheModels[currentDataBaseIndexHorizontal][currentDataBaseIndexVertical-1] != null && porscheModels[currentDataBaseIndexHorizontal][currentDataBaseIndexVertical+1] != null) {
            console.log("Showing up and down arrows.");
            upDownArrows("block", "block");
            /* has above but not below? */
        } else if(porscheModels[currentDataBaseIndexHorizontal][currentDataBaseIndexVertical-1] != null) {
            console.log("Showing up arrow.");
            upDownArrows("block", "none");
            /* must only have below */
        } else {
            console.log("Showing down arrow.");
            upDownArrows("none", "block");
        }
    } else {
        upDownArrows("none", "none");
    }
}

/* handles the stylization of the buttons at the top of the page */
function updateFamilyButtons(family) {
    var familyButtons = document.getElementsByClassName("porscheFamilyButton");
    for(var i = 0; i < familyButtons.length; i++) {
        if(familyButtons[i].className == "porscheFamilyButton selectedFamily") {
            familyButtons[i].className = "porscheFamilyButton";
            break;
        }
    }
    document.getElementById(family).className = "porscheFamilyButton selectedFamily";
}

function moveSelectionUp() {
    moveSelection("up");
}

function moveSelectionDown() {
    moveSelection("down");
}

/* this function handles moving between different cars of the same year when the up/down arrows are clicked. */
function moveSelection(direction) {
    switch(direction) {
        case "up":
            porscheModels[currentDataBaseIndexHorizontal][currentDataBaseIndexVertical-1].draw(currentDataBaseIndexHorizontal, currentDataBaseIndexVertical-1);
            break;
        case "down":
            porscheModels[currentDataBaseIndexHorizontal][currentDataBaseIndexVertical+1].draw(currentDataBaseIndexHorizontal, currentDataBaseIndexVertical+1);
            break;
        case "zero":
            currentDataBaseIndexVertical = 0;
            break;
        default:
            currentDataBaseIndexVertical = 0;
            porscheModels[currentDataBaseIndexHorizontal][currentDataBaseIndexVertical].draw(currentDataBaseIndexHorizontal, currentDataBaseIndexVertical);
    }
}

/* changes the porsche car when user changes the year in the timeline */
function yearChange() {
    /* we store the model year the user wants and find the first car that matches this year from our data */
    var wantedSerial = document.getElementById("yearSelector").value;

    for(var i = 0; i < porscheModels.length; i++) {
        if(porscheModels[i].length > 1) {
            if(porscheModels[i][0].serial == wantedSerial) {
                porscheModels[i][0].draw(i, 0);
                upDownArrows("none", "block");
            }
        } else {
            if(porscheModels[i].serial == wantedSerial) {
                porscheModels[i].draw(i, 0);
                upDownArrows("none", "none");
            }
        }
        /* restore database vertical index to zero every time the database index moves horizontally */
        moveSelection("zero");
    }
}

function changeCurrentFamily() {
    console.log("Changing model family to " + this.id + ".");
    updateFamilyButtons(this.id);
    loadPorsches(this.id);
    selectDefault();
}




/* main loop */
loadPorsches("all");

window.onload = function() {
    selectDefault();
    document.getElementById("yearSelector").addEventListener('input', yearChange);
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