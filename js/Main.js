$(function() {
	$("#newGameButton").on('click', nouvellePartie);
    $(".levelButton").on('click', levelButtonPressed);
    $("#nextLevelButton").on('click', nextLevelButtonPressed);
    $("#previousLevelButton").on('click', previousLevelButtonPressed);

    $(".learningJQ-cell").on("click", traiterClick);
    $(".learningJQ-cell").mouseenter(traiterHoverIn);
    
    preparerPartie();
});
