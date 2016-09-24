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
        if (secondAddress == thirdAddress) {
            secondCell.addClass("startCircleWithPathBottom");
        } else {
            if (secondAddress.row  == thirdAddress.row && secondAddress.column - 1 == thirdAddress.column) {
                secondCell.removeClass("verticalLine horizontalLine");
                secondCell.addClass("leftBottomCornerLine");
            } else if (secondAddress.row  == thirdAddress.row && secondAddress.column + 1 == thirdAddress.column) {
                secondCell.removeClass("verticalLine horizontalLine");
                secondCell.addClass("rightBottomCornerLine");
            } else if (secondAddress.row - 1  == thirdAddress.row && secondAddress.column == thirdAddress.column) {
                secondCell.removeClass("horizontalLine");
                secondCell.addClass("verticalLine");
            }
        }
    } else if (currentAddress.row + 1 == secondAddress.row && currentAddress.column == secondAddress.column) {
        if (secondAddress == thirdAddress) {
            secondCell.addClass("startCircleWithPathTop");
        } else {
            if (secondAddress.row  == thirdAddress.row && secondAddress.column - 1 == thirdAddress.column) {
                secondCell.removeClass("verticalLine horizontalLine");
                secondCell.addClass("leftTopCornerLine");
            } else if (secondAddress.row  == thirdAddress.row && secondAddress.column + 1 == thirdAddress.column) {
                secondCell.removeClass("verticalLine horizontalLine");
                secondCell.addClass("rightTopCornerLine");
            } else if (secondAddress.row + 1  == thirdAddress.row && secondAddress.column == thirdAddress.column) {
                secondCell.removeClass("horizontalLine");
                secondCell.addClass("verticalLine");
            }
        }
    } else if (currentAddress.row == secondAddress.row && currentAddress.column - 1 == secondAddress.column) {
        if (secondAddress == thirdAddress) {
            secondCell.addClass("startCircleWithPathRight");
        } else {
            if (secondAddress.row - 1 == thirdAddress.row && secondAddress.column == thirdAddress.column) {
                secondCell.removeClass("verticalLine horizontalLine");
                secondCell.addClass("rightTopCornerLine");
            } else if (secondAddress.row + 1 == thirdAddress.row && secondAddress.column == thirdAddress.column) {
                secondCell.removeClass("verticalLine horizontalLine");
                secondCell.addClass("rightBottomCornerLine");
            } else if (secondAddress.row == thirdAddress.row && secondAddress.column - 1 == thirdAddress.column) {
                secondCell.removeClass("verticalLine ");
                secondCell.addClass("horizontalLine");
            }
        }
    } else if (currentAddress.row == secondAddress.row && currentAddress.column + 1 == secondAddress.column) {
        if (secondAddress == thirdAddress) {
            secondCell.addClass("startCircleWithPathLeft");
        } else {
            if (secondAddress.row - 1 == thirdAddress.row && secondAddress.column == thirdAddress.column) {
                secondCell.removeClass("verticalLine horizontalLine");
                secondCell.addClass("leftTopCornerLine");
            } else if (secondAddress.row + 1 == thirdAddress.row && secondAddress.column == thirdAddress.column) {
                secondCell.removeClass("verticalLine horizontalLine");
                secondCell.addClass("leftBottomCornerLine");
            } else if (secondAddress.row == thirdAddress.row && secondAddress.column + 1 == thirdAddress.column) {
                secondCell.removeClass("verticalLine");
                secondCell.addClass("horizontalLine");
            }
        }
    } 

    updateCurrentCellImage(currentAddress, currentCell, secondAddress, secondCell);       
}

function updateCurrentCellImage(currentAddress, currentCell, previousAddress, previousCell) {
    if (currentCell.hasClass("originAddress")) {
        if (currentAddress.row - 1 == previousAddress.row)
            currentCell.addClass("startCircleWithPathTop");
        else if (currentAddress.row + 1 == previousAddress.row)
            currentCell.addClass("startCircleWithPathBottom");
        else if (currentAddress.column - 1 == previousAddress.column)
            currentCell.addClass("startCircleWithPathLeft");
        else if (currentAddress.column + 1 == previousAddress.column)
            currentCell.addClass("startCircleWithPathRight");
    }
    else {
        if (currentAddress.row == previousAddress.row) {
            currentCell.addClass("horizontalLine");                
        } else {
            currentCell.addClass("verticalLine");
        }
    }
}