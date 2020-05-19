/* This javascript-file contains functions shared between the timeline and showcase pages. */

/* handles the stylization of the buttons at the top of the page */
function updateFamilyButtons(family) {
    var familyButtons = document.getElementsByClassName("porscheFamilyButton");
    for(var i = 0; i < familyButtons.length; i++) {
        if(familyButtons[i].className == "porscheFamilyButton selectedFamily") {
            familyButtons[i].classList.remove("selectedFamily");
            break;
        }
    }
    document.getElementById(family).classList.add("selectedFamily");
}