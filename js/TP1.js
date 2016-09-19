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

		gStackColor1 = new Array();
		gStackColor2 = new Array();
		gStackColor3 = new Array();
		gStackColor4 = new Array();
		gStackColor5 = new Array();

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

    	if (value != 0 && gCurrentColorValue == value && !cell.hasClass("startingCircle")) {
    		cell.cell('option', 'value', 0);
    		cell.removeClass("valueCurrentlySelected");
    		return;
    	} 

    	if (cell.hasClass("startingCircle")) {
    		gCurrentColorValue = value;
    		gAddresseCourante = pressedAddress;
    		currentValueChanged();
    	} else if (isPossibleNextAddress(pressedAddress)) {
    		cell.cell('option', 'value', gCurrentColorValue);
    		cell.addClass("valueCurrentlySelected");
    		gAddresseCourante = pressedAddress;
    	}

    	if ($("#divGrille").grid("cellsByCriterias", { value: 0 }).length == 0) {
    		solutionner();
    	}
    }

    function currentValueChanged() {
    	$(".valueCurrentlySelected").removeClass("valueCurrentlySelected");
    	$("#divGrille").grid("cellsByCriterias", { value: gCurrentColorValue }).addClass("valueCurrentlySelected");
    }

    function preparerPartie() {
    	gNiveau = 1;
    	gCurrentValue = 0;

    	var grille = $("#divGrille");
    	
    	$("#divGrille").grid("cells").each(function (i, cell) {
    		var cell = $(cell);
    		cell.append('<div class="colorCircle"></div>');
    	});

    	nouvellePartie();
    }

    function isPossibleNextAddress(address) {
    	if ($("#divGrille").grid("cellAt", address) == gCurrentValue && address != gAddresseCourante)
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