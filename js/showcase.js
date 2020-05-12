/* JavaScript file for the Showcase page of GRPB Porsche Chronicle */
/* I'll try to not have example cars this time. Perhaps one, but I want to prioritize loading them from the database from the outset. */

var currentCar = "null";
var amountOfBigImages = 4;
var amountOfSmallImages = 4;
var currentBigImage = 1;
var currentSmallImage = 1;
var currentPage = [];


/* The local storage may have no car stored when the showcase page is loaded. */
function setCurrentCar() {
    currentCar = "944_S2_Coupe";
    /*if(localStorage.getItem("showcase") != null) {
        currentCar = localStorage.getItem("showcase");
    } else {
        console.log("The local storage has no car! Reverting to default car.");
        currentCar = "944_S2_Coupe";
    }*/
}

/* I know, the image types are hardcoded based on the page you're on. This function links pages to their respective image types. */
/* The big image's type is in index 0 of currentPage, the small image's type is index 1. */
function findCurrentImagetypes() {
    currentPage.length = 0;
    var pageId = document.getElementsByClassName("selectedFamily")[0].id;

    switch(pageId) {
        case "description":
            currentPage.push("gen");
            currentPage.push("sml");
            break;
        case "specSheet":
            currentPage.push("cut");
            currentPage.push("eng");
            break;
        case "beautyShots":
            currentPage.push("bea");
            break;
        case "video":
            /* I don't yet know what should be here. */
            currentPage.push("vid");
            break;
        default:
            currentPage.push("gen");
            currentPage.push("sml");
    }

    console.log(currentPage);
}

/* selectPreviousImage requires a parameter, which can't be entered in an event listener. */
function selectPreviousBigImage() {
    selectPreviousImage(true);
}

function selectNextBigImage() {
    selectNextImage(true);
}

function selectPreviousSmallImage() {
    selectPreviousImage(false);
}

function selectNextSmallImage() {
    selectNextImage(false);
}

/* This function gets called when user presses an image arrow to the left. It selects the previous image. */
function selectPreviousImage(scale) {
    checkIndexOOB();
    if(scale == true) {
        if (currentBigImage == 1) {
            currentBigImage = amountOfBigImages;
        } else {
            currentBigImage--;
        }

        findShowcaseImageOfType(scale, currentPage[0], currentCar, currentBigImage);

    } else if (scale == false) {
        /* First it checks if the current image is out of bounds, then if we're at the first available image. If in between, the value gets reduced. */
        if (currentSmallImage == 1) {
            currentSmallImage = amountOfSmallImages;
        } else {
            currentSmallImage--;
        }

        findShowcaseImageOfType(scale, currentPage[1], currentCar, currentSmallImage);

    } else {
        console.log("selectPreviousImage is being called with a bad parameter.");
    }
}

/* This is basically a copy of the previous function, except it moves to the next image. */
function selectNextImage(scale) {
    checkIndexOOB();
    if(scale == true) {
        if (currentBigImage == amountOfBigImages) {
            currentBigImage = 1;
        } else {
            currentBigImage++;
        }

        findShowcaseImageOfType(scale, currentPage[0], currentCar, currentBigImage);

    } else if (scale == false) {
        /* First it checks if the current image is out of bounds, then if we're at the first available image. If in between, the value gets reduced. */
        if (currentSmallImage == amountOfSmallImages) {
            currentSmallImage = 1;
        } else {
            currentSmallImage++;
        }

        findShowcaseImageOfType(scale, currentPage[1], currentCar, currentSmallImage);

    } else {
        console.log("selectNextImage is being called with a bad parameter.");
    }
}

/* This function makes sure that the indexes aren't out of bounds */
function checkIndexOOB() {
    if(currentBigImage > amountOfBigImages) {
        currentBigImage = amountOfBigImages;   
    }
    
    if(currentSmallImage > amountOfSmallImages) {
        currentSmallImage = amountOfSmallImages;
    }
}

/* This function finds images from the images_showroom folder and applies them to their respective containers. */
function findShowcaseImageOfType(screen, type, carName, index) {
    var newUrl = 'images_showcase/' + carName + '/' + carName + '_' + type + '_0' + index + '.jpg';
    console.log("Showing: " + newUrl);

    if(screen == true) {
        document.getElementById("porscheImage").src = newUrl;
    } else {
        document.getElementById("porscheImage2").src = newUrl;
    }
}

/* This function calculates the size of the screen content based on the user's screen. */
function instateScreenWidthHeight() {
    var width1 = Math.floor(0.768*screen.width/2.092);
    var width2 = Math.floor(0.512*screen.width/2.092);

    document.getElementById("porscheImageContainer").style.width = width1 + "px";
    document.getElementById("porscheImageContainer2").style.width = width2 + "px";
    console.log("Big image size: " + width1, ", Small image size: " + width2);

    setImageBackgrounds();
}

/* Refreshing the page looks awful with the yellow backgrounds on page load, they must be added in. */
function setImageBackgrounds() {
    var images = document.getElementsByClassName("porscheImageContainer");

    for(var i = 0; i < images.length; i++) {
        images[i].style.background = "rgb(255,246,0)";
    }
}

/* This function makes sure that the image containers are equally wide to the background image itself. */
/* Must be called every time the webpage is resized. */
function imageSizeHandler() {
    var image = document.getElementById("porscheImageContainer");
    var image2 = document.getElementById("porscheImageContainer2");

    if(window.innerWidth < 1481) {
        image.style.width = "98%";
        image.style.height = "auto";
    } else {
        image.style.width = "auto";
        image.style.height = "55%";
    }
}

/* Main loop */

window.onload = function() {
    instateScreenWidthHeight();
    findCurrentImagetypes();
    setCurrentCar();
    document.getElementById("imageArrowLeft").addEventListener('click', selectPreviousBigImage);
    document.getElementById("imageArrowRight").addEventListener('click', selectNextBigImage);
    document.getElementById("imageArrowLeft2").addEventListener('click', selectPreviousSmallImage);
    document.getElementById("imageArrowRight2").addEventListener('click', selectNextSmallImage);
    /*findShowcaseImageOfType("gen", "944_S2_Coupe", 1);
    /* imageSizeHandler();

    window.onresize = function() {
        var resizeTimer;

        clearTimeout(resizeTimer);

        resizeTimer = setTimeout(function() {
            imageSizeHandler();
        }, 50);
    }; */
}