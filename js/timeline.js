/* JavaScript file for GRPB Porsche Chronicle */
/* Beginning with a small array of data (in the wrong format since this will use a database eventually). This allows quicker implementation of the page's functionality. */

/* the website shall function internally with car objects this time, which internally contain their datapoints. */

var porscheModels = [];

function Porsche(serial, id, family, year, model) {
    this.serial = serial;
    this.id = id;
    this.family = family;
    this.modelYear = year;
    this.modelName = model;
}

Porsche.prototype.toString = function () {
    return "Porsche no. " + this.serial + " is a " + this.modelName + " of " + this.modelYear + " with an id of " + this.id + ". It belongs to the " + this.family + " family.";
};

/* loading from database might be implemented with a for-loop of some kind, but for now three example cars are created manually */

var porscheSerial = ["21", "44", "44", "57"];
var porscheId = ["914_4", "968_Coupe", "928_GTS", "911_997"];
var porscheFamily = ["Boxster", "944", "944", "911"]
var porscheYear = ["1969", "1992", "1992", "2005"];
var porscheModel = ["914", "968", "928 GTS", "911 Carrera S (997)"];




/* functions */

/* loading all porsches found and turning them into Porsche objects */
/* the Porsche array goes in two dimensions, cars of the same year are added as an array for that year */
function loadPorsches() {
    for (var i = 0; i < porscheSerial.length; i++) {
        var currentPorsche = new Porsche(porscheSerial[i], porscheId[i], porscheFamily[i], porscheYear[i], porscheModel[i]);
        console.log(currentPorsche.toString());

        /* if numerous Porsches of the same year were found or not (assumes the database is in order) */
        if(porscheSerial[i+1] == porscheSerial[i]) {
            var begin = i+1;
            var tempArray = [currentPorsche];

            /* checking exactly how many future Porsches in line have the same year */
            for(var j = begin; j < porscheSerial.length; j++) {
                if(porscheSerial[j] == porscheSerial[j-1]) {
                    tempArray.push(new Porsche(porscheSerial[j], porscheId[j], porscheFamily[j], porscheYear[j], porscheModel[j]));
                    i++;
                } else {
                    break;
                }
            }
            porscheModels.push(tempArray);
        } else {
            porscheModels.push(currentPorsche);
        }
    }
    console.log(porscheModels);
}




/* main loop */
loadPorsches();