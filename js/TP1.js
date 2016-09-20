var gNiveau;
var gCurrentColorValue;
var gAddresseCourante;

var gStackColor1;
var gStackColor2;
var gStackColor3;
var gStackColor4;
var gStackColor5;

var gNiveau1Depart = {
	orangeDebut: { addresse: { row: 7, column: 9 }, value: 1 },
	orangeFin: { addresse: { row: 9, column: 8 }, value: 1 },
	bleuDebut: { addresse: { row: 4, column: 8 }, value: 2 },
	bleuFin: { addresse: { row: 9, column: 9 }, value: 2 },
	rougeDebut: { addresse: { row: 5, column: 5 }, value: 3 },
	rougeFin: { addresse: { row: 6, column: 9 }, value: 3 },
	jauneDebut: { addresse: { row: 3, column: 7 }, value: 4 },
	jauneFin: { addresse: { row: 7, column: 4 }, value: 4 },
	vertDebut: { addresse: { row: 3, column: 6 }, value: 5 },
	vertFin: { addresse: { row: 6, column: 3 }, value: 5 } 
};
var gSolutionNiveau1;

$(function() {
	$("#btnNouvellePartie").on('click', nouvellePartie);

    $(".learningJQ-cell").on("click", traiteClick);
    
    preparerPartie();

    function nouvellePartie() {
    	gCurrentColorValue = 0;

		gStackColor1 = [];
		gStackColor2 = [];
		gStackColor3 = [];
		gStackColor4 = [];
		gStackColor5 = [];

    	var grille = $("#divGrille");

    	grille.grid("cells").each(function (i, cell) {
    		$(cell).cell('option', 'value', 0)
    		$(cell).removeClass("valueCurrentlySelected");
    	});

    	$(".startingCircle").removeClass("startingCircle");

    	$.each(gNiveau1Depart, function(i, value) {
    		var cell = grille.grid("cellAt", value.addresse);
    		cell.cell("option", "value", value.value);
    		cell.addClass("startingCircle");
    	});
    }

    function solutionner() {
    	console.log("solutionner");
    }

    function traiteClick(e, info) {
    	var cell = $(this);
    	var value = $(this).cell('option').value;
    	var pressedAddress = $(this).cell('option', 'address');

    	if (value == 0 && gCurrentColorValue == 0)
    		return;

    	if (value != 0 && gCurrentColorValue != value && !cell.hasClass("startingCircle")) {
    		var address;
            do {
                address = popNextValueInStack(value);
                var tempCell = $("#divGrille").grid("cellAt", address);
                if (!tempCell.hasClass("startingCircle")) {
                    tempCell.cell('option', 'value', 0);
                    tempCell.removeClass("valueCurrentlySelected");
                }
            } while (address != pressedAddress);

            cell.cell('option', 'value', gCurrentColorValue);
            cell.addClass("valueCurrentlySelected");
            gAddresseCourante = pressedAddress;
            return;
    	}

        if (value != 0 && gCurrentColorValue == value && lastValueInStack(gCurrentColorValue) == pressedAddress && !cell.hasClass("startingCircle")) {
            cell.cell('option', 'value', 0);
            cell.removeClass("valueCurrentlySelected");
            popNextValueInStack(value);
            gAddresseCourante = lastValueInStack(value);
            return;
        }

    	if (cell.hasClass("startingCircle")) {
    		gCurrentColorValue = value;
            
            if (!stackIsEmptyForValue(value) && !isPossibleNextAddress(pressedAddress)) {
                clearStackForValue(value);
                gAddresseCourante = pressedAddress;
                pushCurrentValueInStack();
            }
            else if (lastValueInStack != cell.cell('option', 'address')) 
            {
                gAddresseCourante = pressedAddress;
                pushCurrentValueInStack();   
            }
    		currentValueChanged();
    	} else if (isPossibleNextAddress(pressedAddress)) {
    		cell.cell('option', 'value', gCurrentColorValue);
    		cell.addClass("valueCurrentlySelected");
    		gAddresseCourante = pressedAddress;
            pushCurrentValueInStack();
    	}

    	if ($("#divGrille").grid("cellsByCriterias", { value: 0 }).length == 0) {
    		solutionner();
    	}
    }

    function currentValueChanged() {
    	$(".valueCurrentlySelected").removeClass("valueCurrentlySelected");
    	$("#divGrille").grid("cellsByCriterias", { value: gCurrentColorValue }).addClass("valueCurrentlySelected");
    }

    function pushCurrentValueInStack() {
        switch (gCurrentColorValue) {
            case 1: gStackColor1.push(gAddresseCourante); break;
            case 2: gStackColor2.push(gAddresseCourante); break;
            case 3: gStackColor3.push(gAddresseCourante); break;
            case 4: gStackColor4.push(gAddresseCourante); break;
            case 5: gStackColor5.push(gAddresseCourante); break;
        }
    }

    function popNextValueInStack(value) {
        switch (value) {
            case 1: return gStackColor1.pop();
            case 2: return gStackColor2.pop();
            case 3: return gStackColor3.pop();
            case 4: return gStackColor4.pop();
            case 5: return gStackColor5.pop();
        }
    }   

    function lastValueInStack(value) {
        switch (value) {
            case 1: return gStackColor1.slice(-1)[0];
            case 2: return gStackColor2.slice(-1)[0];
            case 3: return gStackColor3.slice(-1)[0];
            case 4: return gStackColor4.slice(-1)[0];
            case 5: return gStackColor5.slice(-1)[0];
        }
    }

    function stackIsEmptyForValue(value) {
        switch (value) {
            case 1: return gStackColor1.lenght == 0;
            case 2: return gStackColor2.lenght == 0;
            case 3: return gStackColor3.lenght == 0;
            case 4: return gStackColor4.lenght == 0;
            case 5: return gStackColor5.lenght == 0;
        }   
    }

    function clearStackForValue(value) {
        switch (value) {
            case 1: return gStackColor1 = [];
            case 2: return gStackColor2 = [];
            case 3: return gStackColor3 = [];
            case 4: return gStackColor4 = [];
            case 5: return gStackColor5 = [];
        }
    }

    function preparerPartie() {
    	gNiveau = 1;
    	gCurrentColorValue = 0;

    	var grille = $("#divGrille");
    	
    	$("#divGrille").grid("cells").each(function (i, cell) {
    		var cell = $(cell);
    		cell.append('<div class="colorCircle"></div>');
    	});

    	nouvellePartie();
    }

    function isPossibleNextAddress(address) {
        if (gAddresseCourante == null)
            return false;

    	if ($("#divGrille").grid("cellAt", address) == gCurrentColorValue && address != gAddresseCourante)
    		return false;

    	if (address.row - 1 == gAddresseCourante.row && address.column == gAddresseCourante.column)
    		return true;

    	if (address.row + 1 == gAddresseCourante.row && address.column == gAddresseCourante.column)
    		return true;

    	if (address.row == gAddresseCourante.row && address.column - 1 == gAddresseCourante.column)
    		return true;

    	if (address.row == gAddresseCourante.row && address.column + 1 == gAddresseCourante.column)
    		return true;

    	return false;
    }
});