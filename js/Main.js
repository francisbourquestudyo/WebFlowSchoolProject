$(function() {
	$("#btnNouvellePartie").on('click', nouvellePartie);
    $(".levelButton").on('click', currentLevelChanged)

    $(".learningJQ-cell").on("click", traiterClick);
    $(".learningJQ-cell").mouseenter(traiterHoverIn);
    
    preparerPartie();
});
