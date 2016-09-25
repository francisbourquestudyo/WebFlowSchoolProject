function preparerPartie() {
    gNiveau = 1;
    $("#buttonLevel1").addClass("currentLevel");
    gCurrentStartingCircle = gNiveau1Depart;
    gCurrentSolution = gNiveau1Solution;

    $("#divGrille").grid("cells").cell().append('<img class="colorCircle" src=""></img>');

    nouvellePartie();
}

function nouvellePartie() {
    gCurrentColorValue = 0;
    gPreviousColor = 0;

    gNumberOfMoves = 0;
    $("#movesNumberSpan").text("Coups effectués : " + gNumberOfMoves);
    $("#currentLevelSpan").text("Niveau " + gNiveau);
    
    gFinPartie = false;

    gStackColor1 = [];
    gStackColor2 = [];
    gStackColor3 = [];
    gStackColor4 = [];
    gStackColor5 = [];

    var grille = $("#divGrille");

    grille.grid("cells").cell('option', 'value', 0).removeClass("valueCurrentlySelected leftTopCornerLine leftBottomCornerLine rightTopCornerLine rightBottomCornerLine verticalLine horizontalLine startCircleWithPathBottom startCircleWithPathTop startCircleWithPathLeft startCircleWithPathRight");

    $(".originAddress").removeClass("originAddress");

    $.each(gCurrentStartingCircle, function(i, value) {
        var cell = grille.grid("cellAt", value.addresse);
        cell.cell("option", "value", value.value);
        cell.addClass("originAddress");
    });
    
    var numberOfStartingCells = $(".originAddress").length;
    var numberOfCells = $("#divGrille").grid("cells").length;
    gNumberCellsToFill = numberOfCells - numberOfStartingCells;
    updateCellsFillPourcentage();
}

function solutionner() {
	var finPartie = true;
    $("#divGrille").grid("cells").each(function(i) {
        if ($(this).cell("option", "value") != gCurrentSolution[i]) {
            finPartie = false;
        }
    });

    for (var i = 1; i < 6; i++) {
        if (!stackIsEmptyForValue(i) && !($("#divGrille").grid("cellAt", lastValueInStack(i)).hasClass("originAddress"))) {
            finPartie = false;
        }
    }

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
    	$("#movesNumberSpan").text("Coups effectués : " + gNumberOfMoves);
    }
}

function updateCellsFillPourcentage() {
    var emptyCells = $("#divGrille").grid("cellsByCriterias", { value: 0 });
    var pourcentage = Math.floor((gNumberCellsToFill - emptyCells.length) / gNumberCellsToFill * 100)
    $("#pourcentageFillSpan").text("Completé : " + pourcentage + "%");
}

function levelButtonPressed() {
    gNiveau = parseInt($(this).val());

    $(".currentLevel").removeClass("currentLevel");
    $(this).addClass("currentLevel");

    currentLevelDidChanged()

}

function nextLevelButtonPressed() {
    gNiveau++;

    if (gNiveau > 5)
        gNiveau = 1;

    $(".currentLevel").removeClass("currentLevel");
    $("#buttonLevel" + gNiveau).addClass("currentLevel");

    currentLevelDidChanged();
}

function previousLevelButtonPressed() {
    gNiveau--;

    if (gNiveau < 1)
        gNiveau = 5;

    $(".currentLevel").removeClass("currentLevel");
    $("#buttonLevel" + gNiveau).addClass("currentLevel");

    currentLevelDidChanged();
}

function currentLevelDidChanged() {
    switch(gNiveau) {
        case 1:
            gCurrentStartingCircle = gNiveau1Depart;
            gCurrentSolution = gNiveau1Solution;
            break;

        case 2:
            gCurrentStartingCircle = gNiveau2Depart;
            gCurrentSolution = gNiveau2Solution;
            break;

        case 3:
            gCurrentStartingCircle = gNiveau3Depart;
            gCurrentSolution = gNiveau3Solution;
            break;

        case 4:
            gCurrentStartingCircle = gNiveau4Depart;
            gCurrentSolution = gNiveau4Solution;
            break;

        case 5:
            gCurrentStartingCircle = gNiveau5Depart;
            gCurrentSolution = gNiveau5Solution;
            break;
    }

    nouvellePartie();
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