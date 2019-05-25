function setup() {
	// création d'un canvas  
	var cnv=createCanvas(400, 400);
	
	// le canvas est placé dans la page html 
	cnv.parent('sketch-holder');
} 

function draw() {
	g
	// couleur du fond
	background(0, 0, 0);
	//couleur des lignes
	stroke(200, 200, 200);
	// epaisseur d'une ligne
	strokeWeight(2);
	// couleur de la balle
	fill (255, 255, 255);
	
	
	if (Gauche == true)  {								// Faire déplacer la balle
		xBalle = (xBalle - xBalleVitesse);	
		
	}
 		else {
		xBalle = (xBalle + xBalleVitesse);
		
	}
	
	if (xBalle >= 400) {
		Gauche = true;

	}
	
	if (xBalle <= 0) {
		Gauche = false;
	}
	
	if (Haut == true) {
		yBalle = (yBalle - yBalleVitesse);
		
	}
		else {
		yBalle = (yBalle + yBalleVitesse);
		
	}	
	
	if (yBalle <= 0) {
		Haut = false;
	}

	if (yBalle >= 400) {
		Haut = true;
	}
	
	if (keyIsDown (KEY_Z)) {						// Déplacer la plateforme 1
		yRectangle1 = (yRectangle1 - VITESSE_PLATEFORME) 
		if (yRectangle1 < 0){
			yRectangle1 =0;
		}
		  
	}
	
	if (keyIsDown (KEY_S)) {						
		yRectangle1 = (yRectangle1 + VITESSE_PLATEFORME) ;
		if (yRectangle1 > 350) {
			yRectangle1 = 350;
		}
	}
	
	if (keyIsDown (KEY_J)) {						// Déplacer la plateforme 2
		yRectangle2 = (yRectangle2 - VITESSE_PLATEFORME) ;
		if (yRectangle2 < 0){
			yRectangle2 =0;
		}
	}	
	
	if (keyIsDown (KEY_N)) {
		yRectangle2 = (yRectangle2 + VITESSE_PLATEFORME) ;
		if (yRectangle2 > 350) {
			yRectangle2 = 350;
		}
	}
	
	if (CollisionPlateformeBalle1() == true && Gauche == true) {			// Faire rebondir la balle sur la plateforme 1
		if (Gauche == true) {
			Gauche = false ;
		}
		else {
			Gauche = true;
		}
		
	}
	
	if (CollisionPlateformeBalle2 () == true && Gauche == false) {			// Faire rebondir la balle sur la plateforme 2
		if (Gauche == false) {
			Gauche = true;
		}
		else {
			Gauche = false; 
		}
	}
	

	
	
	if (keyIsDown (KEY_J) && keyIsDown (KEY_N) && CollisionPlateformeBalle2 == 1) {
		xBalleVitesse = xBalleVitesse + 2;

	}
	
	if (keyIsDown (KEY_S) && KEY_Z && CollisionPlateformeBalle1 == 1){
        yBalleVitesse = yBalleVitesse + 2;
		
	}	
	
	MiseAJourScore();
	if (xBalle == 0 || xBalle == 400) {
		yBalle = 200;
		xBalle = 200;
	}

	
	
	
	
	
	
	
	
	// Plateforme joueur 1
	rect (50, yRectangle1, 10, 50) ;
	// Plateforme joueur 
	rect (350, yRectangle2, 10, 50);
	// Balle de jeu
	ellipse (xBalle, yBalle, 15, 15);
    
    //zone de "danger" rouge
    stroke (200, 0, 0);
    fill (200, 0, 0);
    rect (2, 2, 10, 400);
    
    //zone de "danger" bleu
    stroke (0, 0, 200);
    fill (0, 0, 200);
    rect (388, 2, 10, 400);
    
    
    // contour du terrain
    stroke (255, 255, 255); // couleur du contour
    strokeWeight(3); // épaisseur du contour
    noFill(); 
    beginShape ();
    vertex (0, 0);
    vertex (400, 0);
    vertex (400, 400);
    vertex (0, 400);
    vertex (0, 0);
    endShape ();
    
}



// Fonction qui dit Collision = oui ou non pôur la plateforme 1
function CollisionPlateformeBalle1() { 
	var yPlateforme1 = yRectangle1 - 10
	var yPlateforme1Min = yPlateforme1
	var yPlateforme1Max = (yPlateforme1 + 60)
	if (yBalle < yPlateforme1Max && yBalle > yPlateforme1Min && xBalle < 75 && xBalle > 70) {
		
		console.log ('Collision à gauche') 
		return true;
	}
	
	return false;


}

// Fonction qui dit Collision = oui ou non pour la plateforme 2
function CollisionPlateformeBalle2() {
	var yPlateforme2 = yRectangle2 
	var yPlateforme2Min = yPlateforme2
	var yPlateforme2Max = (yPlateforme2 + 60)
	if (yBalle < yPlateforme2Max && yBalle > yPlateforme2Min && xBalle > 345 && xBalle < 350) {
		console.log ('Collision à droite')
		return true;
	}
	return false;
}


function MiseAJourScore() {
	for (k = 0; k < 2; k = k + 1) {
		if (xBalle == limite[k]) {
			pointsJoueur[k] = pointsJoueur[k] + 1;
			conteneurPointsJoueur[k].innerText = pointsJoueur[k];
			
		}
	
	}
	
}




var limite = [400, 0];
var pointsJoueur = [0, 0];
var conteneurPointsJoueur = [document.getElementById("conteneurPointsJoueur1"), document.getElementById("conteneurPointsJoueur2")];

var xBalle = 200.0;
var yBalle = 200.0;

var Gauche = true; 
var Haut = true;

var yRectangle1 = 175; 
var yRectangle2 = 175;
var xBalleVitesse = 2.0;
var yBalleVitesse = 2.0;



const KEY_J = 74;
const KEY_N = 78;
const KEY_Z = 90;
const KEY_S = 83;
const VITESSE_PLATEFORME = 3.75;