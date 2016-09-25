function solutionner() {
	var finPartie = true;
    $("#divGrille").grid("cells").each(function(i) {
        if ($(this).cell("option", "value") != gNiveau1Solution[i]) {
            finPartie = false;
        }
    });

    if (finPartie) {
        gFinPartie = true;
        alert("Bravo!!!");
    }
}

function currentValueChanged() {
	$(".valueCurrentlySelected").removeClass("valueCurrentlySelected");
    if (gCurrentColorValue != 0) {
	   $("#divGrille").grid("cellsByCriterias", { value: gCurrentColorValue }).addClass("valueCurrentlySelected");
    }

    if (gCurrentColorValue != 0 && (gPreviousColor == 0 || gPreviousColor != gCurrentColorValue)) {
    	gNumberOfMoves++;
    	gPreviousColor = gCurrentColorValue;
    	$("#spanMovesNumber").text(String(gNumberOfMoves));
    }
}

function updateCellsFillPourcentage() {
    var emptyCells = $("#divGrille").grid("cellsByCriterias", { value: 0 });
    var pourcentage = Math.floor((gNumberCellsToFill - emptyCells.length) / gNumberCellsToFill * 100)
    $("#pourcentageFill").text(pourcentage + "%");
}

function isPossibleNextAddress(address) {
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