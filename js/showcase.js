/* JavaScript file for the Showcase page of GRPB Porsche Chronicle */
/* I'll try to not have example cars this time. Perhaps one, but I want to prioritize loading them from the database from the outset. */

/* This object houses all the information of the showcased car. */
function PorscheShowcase(modelName, overview, specs, imageLimitGen, imageLimitSml, imageLimitCut, imageLimitEng, imageLimitBea, videos, videoLimit) {
    this.modelName = modelName;
    this.overview = overview;
    this.specs = specs;
    this.imageLimitGen = imageLimitGen;
    this.imageLimitSml = imageLimitSml;
    this.imageLimitCut = imageLimitCut;
    this.imageLimitEng = imageLimitEng;
    this.imageLimitBea = imageLimitBea;
    this.videos = videos;
    this.videoLimit = videoLimit;
}

PorscheShowcase.prototype.toString = function () {
    return this.modelName + ", id: " + currentCar + ", has the following limits. Gen: " + this.imageLimitGen + ", Sml: " + this.imageLimitSml + ", Cut: " + this.imageLimitCut + ", Eng: " + this.imageLimitEng + ", Bea: " + this.imageLimitBea + ", Vid: " + this.videoLimit;
}

var showcaseCar = new PorscheShowcase("null", "null", 1, 1, 1, 1, 1, 1);
var currentCar = "null";
var amountOfBigImages = 1;
var amountOfSmallImages = 1;
var currentBigImage = 1;
var currentSmallImage = 1;

var displayMode = "normal";
var currentPageIds = [];
var currentHeader = [];
var currentShowcase = [];
var currentPageNumber = 1;
var maxPageNumber = 1;

/* The single most important function in the entire website. This function applies all the data found from the database into the showcaseCar object. */
/* The data array is hardcoded until I code the database stuff that loads data, similar to the timeline page. */
function constructShowcase(currentCar) {
    var data = ["Porsche 944 S2 '89", "Porsche/sqs golden era comes in golden proportions. Behold: the golden child of many an automotive enthusiast, the dearest front-engined Porsche of them all, the 944. Introduced as the 924/sqs replacement in 1982, the 944 featured a Porsche engine in a Porsche car, a standout feature compared to the 924./r/nThe 944/sqs inline-four-cylinder engine was adapted from the 928/sqs 4.5-litre alloy V8. It was dismembered into a half-V8, and slanted over at 45 degrees to the right during installation. This engine featured Mitsubishi/sqs dual counter-rotating engine balancing shafts to counter the unbalanced secondary forces present in inline engines. The engine had a displacement of 2.5 litres and produced 163 bhp upon its EU debut and only 143 bhp in the US. Overall, the 944 was essentially a 924 with a premium engine and trim, making it a much more desireable entry-level Porsche in the eyes of many consumers./r/n1989 saw the dawn of the 944 S2, which features all the facelifts the 944 saw in 1985, complete with new styling and a brand-new interior. The S2 is an upgraded version of the 944 S, offering the largest four-cylinder engine of the 1980s: a 3.0-litre DOHC 16-valve inline-four producing 208 bhp, coupled to a revised transmission optimized for maximum performance. The 944 S2 delivered a 0-60 time of 6.8 seconds and a top speed of 150 mph. It could be optioned with dual air bags, a limited slip differential and ABS brakes, as well as the Club Sport touring package. Design 90 16/dq cast alloy wheels and Turbo-look styling elements were offered as standard./r/nAmong the exclusively front-engined /dqgreatest handling Porsches of all time/dq-club, the 944 reigns supreme, and it/sqs no wonder when its 50.7/49.3 weight distribution and beautiful suspension result in perfectly balanced handling.", null, null, null, 3, 4, 1, 5, 3, "https://www.youtube.com/embed/EBRWHtXW_7E", "https://www.youtube.com/embed/s6zumyZddmc", null, null];

    var specs = ["Contents", "left", "to", "do", "here"];

    var fixedShowcases = [];
    var fixedData = [];
    var videos = [];
    var videoAmount = 0;

    for(var i = 1; i <= 4; i++) {
        var showcase = null;
        if(data[i] != null) {
            var currentPt1 = data[i].replace(new RegExp('/r/n', 'g'), '<br><br>'); //Global replace /r/n with <br><br> in the text for line breaks. Thanks GPRB homepage!
            var currentPt2 = currentPt1.replace(new RegExp('/sq', 'g'), "'"); //Replace /sq with ' in the text for single quotes
            showcase = currentPt2.replace(new RegExp('/dq', 'g'), '"'); //Replace /dq with "
        }
        fixedShowcases.push(showcase);
    }

    for(var i = 0; i <= 4; i++) {
        var spec = null;
        if(specs[i] != null) {
            var currentPt1 = specs[i].replace(new RegExp('/r/n', 'g'), '<br><br>'); //Global replace /r/n with <br><br> in the text for line breaks. Thanks GPRB homepage!
            var currentPt2 = currentPt1.replace(new RegExp('/sq', 'g'), "'"); //Replace /sq with ' in the text for single quotes
            spec = currentPt2.replace(new RegExp('/dq', 'g'), '"'); //Replace /dq with "
        }
        fixedData.push(spec);
    }

    for(var i = 10; i <= 13; i++) {
        if(data[i] != null) {
            videos.push(data[i]);
            videoAmount++;
        }
    }

    showcaseCar.modelName = data[0];
    showcaseCar.overview = fixedShowcases;
    showcaseCar.specs = fixedData;
    showcaseCar.imageLimitGen = data[5];
    showcaseCar.imageLimitSml = data[6];
    showcaseCar.imageLimitCut = data[7];
    showcaseCar.imageLimitEng = data[8];
    showcaseCar.imageLimitBea = data[9];
    showcaseCar.videos = videos;
    showcaseCar.videoLimit = videoAmount;

    console.log(showcaseCar.toString());
}

/* It's unnecessary to call this every time tabs are changed. */
function setHeader() {
    document.getElementById("porscheYear").innerHTML = showcaseCar.modelName;
}

/* The data developed in the previous function is printed onto the page here */
function initializeShowcase() {
    currentPageNumber = 1;

    /* If type = true, the page wants the overview showcase. If false, it wants specs. */
    document.getElementById("porscheVideo").src = showcaseCar.videos[0];
    document.getElementById("porscheShowcase").innerHTML = currentShowcase[0];
    if(currentHeader instanceof Array) {
        document.getElementById("porscheHeader").innerHTML = currentHeader[0];
    } else {
        document.getElementById("porscheHeader").innerHTML = currentHeader;
    }

    console.log("Display mode: " + displayMode);
    if(displayMode != "video") {
        findShowcaseImageOfType(true, currentCar, 1);
        if(displayMode == "normal") {
            findShowcaseImageOfType(false, currentCar, 1);
        }
    }

    updatePageSelector();
}

/* This function initially calculates the maximum amount of pages available in the showcase. */
function updatePageSelector() {
    /* The page selector must be updated differently on the beauty shot and video showcase tabs. */
    if(displayMode == "beautyShot") {

        maxPageNumber = showcaseCar.imageLimitBea;

    } else if(displayMode == "video") {

        maxPageNumber = showcaseCar.videoLimit;

    } else {

        var i = 0;
        /* Finding all pages with text */
        do {
            console.log("Found text in slot " + i);
            i++;
        }
        while(currentShowcase[i] != null);

        maxPageNumber = i;
    }

    document.getElementById("porscheModel").innerHTML = currentPageNumber + "/" + maxPageNumber;
    updateArrows(currentPageNumber, maxPageNumber);
}

/* This function changes pages on every showcase tab. */
function changePage(value) {
    if(currentPageNumber + value > 0 && currentPageNumber + value <= maxPageNumber) {
        currentPageNumber = currentPageNumber + value;
    }

    document.getElementById("porscheModel").innerHTML = currentPageNumber + "/" + maxPageNumber;

    applyPageChangeData();
    updateArrows(currentPageNumber, maxPageNumber);
}

/* I only want to modify the showcase text on screen if the display mode is normal. Otherwise the text is not visible. */
function applyPageChangeData() {
    if(displayMode == "normal") {
        document.getElementById("porscheShowcase").innerHTML = currentShowcase[currentPageNumber-1];
        if(currentHeader instanceof Array) {
            document.getElementById("porscheHeader").innerHTML = currentHeader[currentPageNumber-1];
        }
    }
}

/* This function refreshes the state of the arrows used to change showcase text page. */
function updateArrows(current, max) {
    document.getElementById("arrowLeft").classList.add("active");
    document.getElementById("arrowRight").classList.add("active");

    console.log("Current page: " + current + ", max page: " + max);
    if(current == 1) {
        document.getElementById("arrowLeft").classList.remove("active");
    }

    if(current == max) {
        document.getElementById("arrowRight").classList.remove("active");
    }
}

/* The local storage may have no car stored when the showcase page is loaded. */
function setCurrentCar() {
    if(localStorage.getItem("showcase") != null) {
        currentCar = "944_S2_Coupe";
        /*currentCar = localStorage.getItem("showcase");*/
    } else {
        console.log("The local storage has no car! Reverting to default car.");
        currentCar = "944_S2_Coupe";
    }
}

/* I know, the image types are hardcoded based on the page you're on. This function links pages to their respective image types. */
/* The big image's type is in index 0 of currentPageIds, the small image's type is index 1. */
function findCurrentImagetypes() {
    currentPageIds.length = 0;
    var pageId = document.getElementsByClassName("selectedFamily")[0].id;

    switch(pageId) {
        case "description":
            currentPageIds.push("gen");
            currentPageIds.push("sml");
            break;
        case "specSheet":
            currentPageIds.push("cut");
            currentPageIds.push("eng");
            break;
        case "beautyShots":
            currentPageIds.push("bea");
            currentPageIds.push("bea");
            break;
        case "video":
            /* I don't yet know what should be here. */
            currentPageIds.push("vid");
            currentPageIds.push("vid");
            break;
        default:
            currentPageIds.push("gen");
            currentPageIds.push("sml");
    }

    applyImageLimits(currentPageIds[0], currentPageIds[1]);
    console.log(currentPageIds);
}

/* Since every image type has an individual maximum amount, the page's current limits for big and small images must be dynamically changed based on the page we're on. */
function applyImageLimits(big, small) {
    switch(big) {
        case "gen":
            amountOfBigImages = showcaseCar.imageLimitGen;
            break;
        case "cut":
            amountOfBigImages = showcaseCar.imageLimitCut;
            break;
        case "bea":
            amountOfBigImages = showcaseCar.imageLimitBea;
            break;
        case "vid":
            amountOfBigImages = showcaseCar.videoLimit;
            break;
        default:
            amountOfBigImages = 1;
    }

    switch(small) {
        case "sml":
            amountOfSmallImages = showcaseCar.imageLimitSml;
            break;
        case "eng":
            amountOfSmallImages = showcaseCar.imageLimitEng;
            break;
        case "bea":
            amountOfSmallImages = showcaseCar.imageLimitBea;
            break;
        case "vid":
            amountOfSmallImages = showcaseCar.videoLimit;
            break;
        default:
            amountOfSmallImages = 1;
    }
}

/* This function changes between the two porscheThumbnails used to present the showcase. */
function changeView(style) {
    var normal = document.getElementById("porscheThumbnail");
    var beauty = document.getElementById("porscheThumbnailBea");
    var video = document.getElementById("porscheThumbnailVid");

    switch(style) {
        case "normal":
            normal.style.display = "flex";
            beauty.style.display = "none";
            video.style.display = "none";
            break;
        case "beautyShot":
            normal.style.display = "none";
            beauty.style.display = "flex";
            video.style.display = "none";
            break;
        case "video":
            normal.style.display = "none";
            beauty.style.display = "none";
            video.style.display = "flex";
            break;
    }
}

/* selectPreviousImage requires a parameter, which can't be entered in an event listener. */
function selectPreviousBigImage() {
    selectImage(true, -1)
}

function selectNextBigImage() {
    selectImage(true, 1);
}

function selectPreviousSmallImage() {
    selectImage(false, -1);
}

function selectNextSmallImage() {
    selectImage(false, 1);
}

function changePageDown() {
    if(displayMode == "beautyShot" || displayMode == "video") {
        selectPreviousBigImage();
    }
    changePage(-1);
}

function changePageUp() {
    if(displayMode == "beautyShot" || displayMode == "video") {
        selectNextBigImage();
    }
    changePage(1);
}

/* This function is called when the user presses the arrows in images. It finds the index of the new desired image. */
function selectImage(big, addedIndex) {
    var currentImage = 0;
    var amountOfImages = "";

    if(big) {
        currentImage = currentBigImage;
        amountOfImages = amountOfBigImages;
    } else {
        currentImage = currentSmallImage;
        amountOfImages = amountOfSmallImages;
    }

    /* First it checks if the index would underflow, then if it would overflow. */
    if(currentImage + addedIndex <= 0) {
        currentImage = amountOfImages;
    } else if (currentImage + addedIndex > amountOfImages) {
        currentImage = 1;
    } else {
        currentImage = currentImage + addedIndex;
    }

    /* Finally storing the new index and passing index to a drawing function */
    if(big) {
        currentBigImage = currentImage;
    } else {
        currentSmallImage = currentImage;
    }

    if(displayMode != "video") {
        findShowcaseImageOfType(big, currentCar, currentImage);
    } else {
        document.getElementById("porscheVideo").src = showcaseCar.videos[currentImage-1];
    }
}

/* This function finds images from the images_showroom folder and applies them to their respective containers. */
function findShowcaseImageOfType(big, carName, index) {
    var type = 0;
    var id = "";

    if(displayMode == "normal") {
        if(big) {
            type = 0;
            id = "porscheImage";
        } else {
            type = 1;
            id = "porscheImage2";
        }
    } else {
        type = 0;
        id = "porscheImageBea";
    }

    var newUrl = 'images_showcase/' + carName + '/' + carName + '_' + currentPageIds[type] + '_0' + index + '.jpg';
    console.log("Showing: " + newUrl);
    document.getElementById(id).src = newUrl;
}

/* Mostly a copy of the same function in the timeline page. It changes page when you press the tabs at the top. */
function changeCurrentFamily() {
    console.log("Changing model family to " + this.id + ".");
    updateFamilyButtons(this.id);
    selectShowcaseTab(this.id);
}

/* This function will have to do the last function's heavy lifting. */
function selectShowcaseTab(id) {
    currentBigImage = 1;
    currentSmallImage = 1;
    switch(id) {
        case "description":
            findCurrentImagetypes(id);
            currentHeader = "Overview";
            currentShowcase = showcaseCar.overview;
            displayMode = "normal";
            break;
        case "specSheet":
            findCurrentImagetypes(id);
            currentHeader = ["General", "Performance", "Mechanical", "Drivetrain", "Dimensions & Chassis"]
            currentShowcase = showcaseCar.specs;
            displayMode = "normal";
            break;
        case "beautyShots":
            findCurrentImagetypes(id);
            currentHeader = "Beauty Shots"
            displayMode = "beautyShot";
            break;
        case "video":
            findCurrentImagetypes(id);
            currentHeader = "Showcase"
            displayMode = "video";
            changeView(false);
            break;
        default:
            findCurrentImagetypes("description");
            currentHeader = "Overview";
            displayMode = "normal"
    }
    changeView(displayMode);
    initializeShowcase();
}

/* This function calculates the size of the screen content based on the user's screen. */
function instateScreenWidthHeight() {
    var width1 = Math.floor(0.768*screen.width/2.092);
    var width2 = Math.floor(0.512*screen.width/2.092);

    document.getElementById("porscheImageContainer").style.width = width1 + "px";
    document.getElementById("porscheImageContainer2").style.width = width2 + "px";
    console.log("Big image size: " + width1, ", Small image size: " + width2);
}

/* Refreshing the page looks awful with the yellow backgrounds on page load, they must be added in. */
function setImageBackgrounds() {
    var images = document.getElementsByClassName("porscheImageContainer");

    for(var i = 0; i < images.length; i++) {
        images[i].style.background = "rgb(255,246,0)";
    }
}

/* Main loop */
setCurrentCar();
constructShowcase(currentCar);

window.onload = function() {
    instateScreenWidthHeight();
    setImageBackgrounds();
    setHeader();
    selectShowcaseTab("description");
    document.getElementById("arrowExtension").addEventListener('click', selectPreviousBigImage);
    document.getElementById("arrowExtensionRight").addEventListener('click', selectNextBigImage);
    document.getElementById("arrowExtension2").addEventListener('click', selectPreviousSmallImage);
    document.getElementById("arrowExtensionRight2").addEventListener('click', selectNextSmallImage);

    document.getElementById("arrowLeft").addEventListener('click', changePageDown);
    document.getElementById("arrowRight").addEventListener('click', changePageUp);

    var familyButtons = document.getElementsByClassName("porscheFamilyButton");

    for(var j = 0; j < familyButtons.length; j++) {
        familyButtons[j].addEventListener('click', changeCurrentFamily);
    }
}