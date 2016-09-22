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

    $(".learningJQ-cell").on("click", traiterClick);
    $(".learningJQ-cell").mouseenter(traiterHoverIn);
    
    preparerPartie();

    function nouvellePartie() {
    	gCurrentColorValue = 0;

		gStackColor1 = [];
		gStackColor2 = [];
		gStackColor3 = [];
		gStackColor4 = [];
		gStackColor5 = [];

    	var grille = $("#divGrille");

    	grille.grid("cells").cell('option', 'value', 0).removeClass("valueCurrentlySelected");

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

    function traiterClick(e, info) {
        var cell = $(this);
        var value = $(this).cell('option').value;
        var pressedAddress = $(this).cell('option', 'address');

        if (gCurrentColorValue != 0) {
            gCurrentColorValue = 0;
            gAddresseCourante = null;
            currentValueChanged();
        }
        else if (cell.hasClass("startingCircle")) {
            gCurrentColorValue = value;
            
            if (!stackIsEmptyForValue(value) && !isPossibleNextAddress(pressedAddress)) {
                clearStackForValue(value);
                gAddresseCourante = pressedAddress;
            }
            else if (lastValueInStack != cell.cell('option', 'address')) 
            {
                gAddresseCourante = lastValueInStack(value);
            }
            else {
                gAddresseCourante = pressedAddress;
            }

            pushCurrentValueInStack();
            currentValueChanged();
        }
    }

    function traiterHoverIn(e, info) {
    	var cell = $(this);
    	var value = $(this).cell('option').value;
    	var pressedAddress = $(this).cell('option', 'address');

    	if (gCurrentColorValue == 0)
    		return;

    	if (value != 0 && gCurrentColorValue != value && !cell.hasClass("startingCircle") && isPossibleNextAddress(pressedAddress) ||
                lastValueInStack(gCurrentColorValue) != pressedAddress && stackContainsAddress(gCurrentColorValue, pressedAddress)) {
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
            pushCurrentValueInStack();
            return;
    	} else if (value != 0 && gCurrentColorValue == value && isPossibleNextAddress(pressedAddress) &&
             (!cell.hasClass("startingCircle") || cell.hasClass("startingCircle") && stackContainsAddress(value, pressedAddress))) {
            var tempCell = $("#divGrille").grid("cellAt", popNextValueInStack(value));
            tempCell.cell('option', 'value', 0);
            tempCell.removeClass("valueCurrentlySelected");
            gAddresseCourante = lastValueInStack(value);
            return;
        } else if (!cell.hasClass("startingCircle") && isPossibleNextAddress(pressedAddress)) {
    		cell.cell('option', 'value', gCurrentColorValue);
    		cell.addClass("valueCurrentlySelected");
    		gAddresseCourante = pressedAddress;
            pushCurrentValueInStack();
    	}

    	if ($("#divGrille").grid("cellsByCriterias", { value: 0 }).length == 0 && gCurrentColorValue == 0) {
    		solutionner();
    	}
    }

    function currentValueChanged() {
    	$(".valueCurrentlySelected").removeClass("valueCurrentlySelected");
        if (gCurrentColorValue != 0) {
    	   $("#divGrille").grid("cellsByCriterias", { value: gCurrentColorValue }).addClass("valueCurrentlySelected");
        }
    }

    function preparerPartie() {
    	gNiveau = 1;
    	gCurrentColorValue = 0;

    	var grille = $("#divGrille");
    	
    	$("#divGrille").grid("cells").cell().append('<img class="colorCircle" src=""></img>');

    	nouvellePartie();
    }

    function isPossibleNextAddress(address) {
        if (gAddresseCourante == null)
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