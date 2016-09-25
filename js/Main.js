$(function() {
	$("#btnNouvellePartie").on('click', nouvellePartie);

    $(".learningJQ-cell").on("click", traiterClick);
    $(".learningJQ-cell").mouseenter(traiterHoverIn);
    
    preparerPartie();

    function preparerPartie() {
        gNiveau = 1;
        gCurrentColorValue = 0;
        gPreviousColor = 0;
        gNumberOfMoves = 0;
        gFinPartie = false;
        
        $("#spanMovesNumber").text(String(gNumberOfMoves));
        $("#divGrille").grid("cells").cell().append('<img class="colorCircle" src=""></img>');

        nouvellePartie();
    }

    function nouvellePartie() {
        gCurrentColorValue = 0;

        gStackColor1 = [];
        gStackColor2 = [];
        gStackColor3 = [];
        gStackColor4 = [];
        gStackColor5 = [];

        var grille = $("#divGrille");

        grille.grid("cells").cell('option', 'value', 0).removeClass("valueCurrentlySelected leftTopCornerLine leftBottomCornerLine rightTopCornerLine rightBottomCornerLine verticalLine horizontalLine startCircleWithPathBottom startCircleWithPathTop startCircleWithPathLeft startCircleWithPathRight");

        $(".originAddress").removeClass("originAddress");

        $.each(gNiveau5Depart, function(i, value) {
            var cell = grille.grid("cellAt", value.addresse);
            cell.cell("option", "value", value.value);
            cell.addClass("originAddress");
        });

        
        var numberOfStartingCells = $(".originAddress").length;
        var numberOfCells = $("#divGrille").grid("cells").length;
        gNumberCellsToFill = numberOfCells - numberOfStartingCells;
        updateCellsFillPourcentage();
    }
});
