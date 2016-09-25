function traiterClick(e, info) {
    var cell = $(this);
    var value = $(this).cell('option').value;
    var pressedAddress = $(this).cell('option', 'address');

    if (gFinPartie)
        return;

    if (gCurrentColorValue != 0) {
        gCurrentColorValue = 0;
        gAddresseCourante = null;
        currentValueChanged();
    }
    else if (pressedAddress == lastValueInStack(value)) {
        gCurrentColorValue = value;
        gAddresseCourante = pressedAddress;
        currentValueChanged();
    } else if (cell.hasClass("originAddress")) {
        gCurrentColorValue = value;
        
        if (!stackIsEmptyForValue(value) && !stackContainsAddress(value, pressedAddress)) {
            var tempCell;
            do {
                address = popNextValueInStack(value);
                tempCell = $("#divGrille").grid("cellAt", address);
                if (!tempCell.hasClass("originAddress")) {
                    tempCell.cell('option', 'value', 0);
                    tempCell.removeClass("valueCurrentlySelected leftTopCornerLine leftBottomCornerLine rightTopCornerLine rightBottomCornerLine verticalLine horizontalLine startCircleWithPathBottom startCircleWithPathTop startCircleWithPathLeft startCircleWithPathRight");
                }
                else {
                    tempCell.removeClass("startCircleWithPathBottom startCircleWithPathRight startCircleWithPathTop startCircleWithPathLeft");
                }
            } while (!stackIsEmptyForValue(value));
            gAddresseCourante = pressedAddress;
            pushCurrentValueInStack();
        }
        else {
            gAddresseCourante = pressedAddress;
            pushCurrentValueInStack();
        }

        currentValueChanged();
    }

    solutionner();
}

function traiterHoverIn(e, info) {
	var cell = $(this);
	var value = $(this).cell('option').value;
	var pressedAddress = $(this).cell('option', 'address');

    if (gFinPartie)
        return;

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
                tempCell.removeClass("valueCurrentlySelected leftTopCornerLine leftBottomCornerLine rightTopCornerLine rightBottomCornerLine verticalLine horizontalLine startCircleWithPathBottom startCircleWithPathTop startCircleWithPathLeft startCircleWithPathRight");
            }
            else {
                tempCell.removeClass("startCircleWithPathBottom startCircleWithPathRight startCircleWithPathTop startCircleWithPathLeft");
            }
        } while (address != pressedAddress);

        cell.cell('option', 'value', gCurrentColorValue);
        cell.addClass("valueCurrentlySelected");
        
        gAddresseCourante = pressedAddress;
        pushCurrentValueInStack();
        
        updateCurrentPath();
        updateCellsFillPourcentage();
	} else if (value != 0 && gCurrentColorValue == value && isPossibleNextAddress(pressedAddress) &&
         (!cell.hasClass("originAddress") || cell.hasClass("originAddress") && stackContainsAddress(gCurrentColorValue, pressedAddress))) {
        var tempCell = $("#divGrille").grid("cellAt", popNextValueInStack(value));
        tempCell.cell('option', 'value', 0);
        tempCell.removeClass("valueCurrentlySelected leftTopCornerLine leftBottomCornerLine rightTopCornerLine rightBottomCornerLine verticalLine horizontalLine startCircleWithPathBottom startCircleWithPathTop startCircleWithPathLeft startCircleWithPathRight");
        
        gAddresseCourante = lastValueInStack(value);
        
        updateCurrentPath();
        updateCellsFillPourcentage();
    } else if (isPossibleNextAddress(pressedAddress) && (!cell.hasClass("originAddress") || value == gCurrentColorValue)) {
		if ($("#divGrille").grid("cellAt", lastValueInStack(gCurrentColorValue)).hasClass("originAddress") && secondLastValueInStack(gCurrentColorValue) != lastValueInStack(gCurrentColorValue))
            return;

        cell.cell('option', 'value', gCurrentColorValue);
		cell.addClass("valueCurrentlySelected");

		gAddresseCourante = pressedAddress;
        pushCurrentValueInStack();

        updateCurrentPath();
        updateCellsFillPourcentage();
	}
}