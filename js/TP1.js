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

    	grille.grid("cells").cell('option', 'value', 0).removeClass("valueCurrentlySelected leftTopLine leftBottomLine rightTopLine rightBottomLine verticalLine horizontalLine startCircleWithPathBottom startCircleWithPathTop startCircleWithPathLeft startCircleWithPathRght");

    	$(".originAddress").removeClass("originAddress");

    	$.each(gNiveau1Depart, function(i, value) {
    		var cell = grille.grid("cellAt", value.addresse);
    		cell.cell("option", "value", value.value);
    		cell.addClass("originAddress");
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
        else if (cell.hasClass("originAddress")) {
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

    	if (value != 0 && gCurrentColorValue != value && !cell.hasClass("originAddress") && isPossibleNextAddress(pressedAddress) ||
                lastValueInStack(gCurrentColorValue) != pressedAddress && stackContainsAddress(gCurrentColorValue, pressedAddress)) {
    		var address;
            do {
                address = popNextValueInStack(value);
                var tempCell = $("#divGrille").grid("cellAt", address);
                if (!tempCell.hasClass("originAddress")) {
                    tempCell.cell('option', 'value', 0);
                    tempCell.removeClass("valueCurrentlySelected leftTopLine leftBottomLine rightTopLine rightBottomLine verticalLine horizontalLine startCircleWithPathBottom startCircleWithPathTop startCircleWithPathLeft startCircleWithPathRght");
                }
            } while (address != pressedAddress);

            cell.cell('option', 'value', gCurrentColorValue);
            cell.addClass("valueCurrentlySelected");
            gAddresseCourante = pressedAddress;
            pushCurrentValueInStack();
            return;
    	} else if (value != 0 && gCurrentColorValue == value && isPossibleNextAddress(pressedAddress) &&
             (!cell.hasClass("originAddress") || cell.hasClass("originAddress") && stackContainsAddress(value, pressedAddress))) {
            var tempCell = $("#divGrille").grid("cellAt", popNextValueInStack(value));
            tempCell.cell('option', 'value', 0);
            tempCell.removeClass("valueCurrentlySelected leftTopLine leftBottomLine rightTopLine rightBottomLine verticalLine horizontalLine startCircleWithPathBottom startCircleWithPathTop startCircleWithPathLeft startCircleWithPathRght");
            gAddresseCourante = lastValueInStack(value);
            return;
        } else if (!cell.hasClass("originAddress") && isPossibleNextAddress(pressedAddress)) {
    		cell.cell('option', 'value', gCurrentColorValue);
    		cell.addClass("valueCurrentlySelected");
    		gAddresseCourante = pressedAddress;
            pushCurrentValueInStack();
    	}

        updateCurrentPath();

    	if ($("#divGrille").grid("cellsByCriterias", { value: 0 }).length == 0 && gCurrentColorValue == 0) {
    		solutionner();
    	}
    }

    function currentValueChanged() {
    	$(".valueCurrentlySelected").removeClass("valueCurrentlySelected leftTopLine leftBottomLine rightTopLine rightBottomLine verticalLine horizontalLine");
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

    function updateCurrentPath() {
        var currentAddress = lastValueInStack(gCurrentColorValue);
        var secondAddress = secondLastValueInStack(gCurrentColorValue);
        var thirdAddress = thirdLastValueInStack(gCurrentColorValue);

        var currentCell = $("#divGrille").grid("cellAt", currentAddress);
        var secondCell = $("#divGrille").grid("cellAt", secondAddress);
        var thirdCell = $("#divGrille").grid("cellAt", thirdAddress);

        if (currentAddress == secondAddress) {
            currentCell.removeClass("startCircleWithPathBottom startCircleWithPathTop startCircleWithPathRight startCircleWithPathLeft");
            currentCell.addClass("startCircle");
            return;
        }

        if (currentAddress.row - 1 == secondAddress.row && currentAddress.column == secondAddress.column) {
            currentCell.addClass("verticalLine");

            if (secondAddress == thirdAddress) {
                secondCell.addClass("startCircleWithPathBottom");
                return;
            } else {
                if (secondAddress.row  == thirdAddress.row && secondAddress.column - 1 == thirdAddress.column) {
                    secondCell.removeClass("verticalLine horizontalLine");
                    secondCell.addClass("leftBottomLine");
                }
                else if (secondAddress.row  == thirdAddress.row && secondAddress.column + 1 == thirdAddress.column) {
                    secondCell.removeClass("verticalLine horizontalLine");
                    secondCell.addClass("rightBottomLine");
                }
            }
        }

        if (currentAddress.row + 1 == secondAddress.row && currentAddress.column == secondAddress.column) {
            currentCell.addClass("verticalLine");

            if (secondAddress == thirdAddress) {
                secondCell.addClass("startCircleWithPathTop");
                return;
            } else {
                if (secondAddress.row  == thirdAddress.row && secondAddress.column - 1 == thirdAddress.column) {
                    secondCell.removeClass("verticalLine horizontalLine");
                    secondCell.addClass("leftTopLine");
                }
                else if (secondAddress.row  == thirdAddress.row && secondAddress.column + 1 == thirdAddress.column) {
                    secondCell.removeClass("verticalLine horizontalLine");
                    secondCell.addClass("rightTopLine");
                }
            }
        }

        if (currentAddress.row == secondAddress.row && currentAddress.column - 1 == secondAddress.column) {
            currentCell.addClass("horizontalLine");

            if (secondAddress == thirdAddress) {
                secondCell.addClass("startCircleWithPathRight");
                return;
            } else {
                if (secondAddress.row - 1 == thirdAddress.row && secondAddress.column == thirdAddress.column) {
                    secondCell.removeClass("verticalLine horizontalLine");
                    secondCell.addClass("rightTopLine");
                }
                else if (secondAddress.row + 1 == thirdAddress.row && secondAddress.column == thirdAddress.column) {
                    secondCell.removeClass("verticalLine horizontalLine");
                    secondCell.addClass("rightBottomLine");
                }
            }
        }

        if (currentAddress.row == secondAddress.row && currentAddress.column + 1 == secondAddress.column) {
            currentCell.addClass("horizontalLine");

            if (secondAddress == thirdAddress) {
                secondCell.addClass("startCircleWithPathLeft");
                return;
            } else {
                if (secondAddress.row - 1 == thirdAddress.row && secondAddress.column == thirdAddress.column) {
                    secondCell.removeClass("verticalLine horizontalLine");
                    secondCell.addClass("leftTopLine");
                }
                else if (secondAddress.row + 1 == thirdAddress.row && secondAddress.column == thirdAddress.column) {
                    secondCell.removeClass("verticalLine horizontalLine");
                    secondCell.addClass("leftBottomLine");
                }
            }
        }        
    }
});