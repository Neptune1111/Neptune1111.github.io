function setup() {
	// création d'un canvas  
	var cnv=createCanvas(400, 400);
	
	// le canvas est placé dans la page html 
	cnv.parent('sketch-holder');
} 

function draw() {
	
	// couleur du fond
	background(0, 0, 0);
	//couleur des lignes
	stroke(200, 200, 200);
	// epaisseur d'une ligne
	strokeWeight(2);
	// couleur de la balle
	fill (255, 255, 255);
	
	xBalle = (xBalle + xBalleVitesse * multiplicateurVitesseBalle);
	yBalle = (yBalle + yBalleVitesse * multiplicateurVitesseBalle);
		
	if (yBalle <= 0 || yBalle >= 400) {
		yBalleVitesse = yBalleVitesse * -1;
	}

	if (keyIsDown (KEY_Z)) {						// Déplacer la plateforme 1
		yRectangle1 = (yRectangle1 - VITESSE_PLATEFORME * multiplicateurVitesseBalle) 
		if (yRectangle1 < 0){
			yRectangle1 =0;

		}
		  
	}
	
	if (keyIsDown (KEY_S)) {						
		yRectangle1 = (yRectangle1 + VITESSE_PLATEFORME * multiplicateurVitesseBalle) ;
		if (yRectangle1 > 350) {
			yRectangle1 = 350;
		}
	}
	
	if (keyIsDown (KEY_J)) {						// Déplacer la plateforme 2
		yRectangle2 = (yRectangle2 - VITESSE_PLATEFORME * multiplicateurVitesseBalle) ;
		if (yRectangle2 < 0){
			yRectangle2 =0;
		}
	}	
	
	if (keyIsDown (KEY_N)) {
		yRectangle2 = (yRectangle2 + VITESSE_PLATEFORME * multiplicateurVitesseBalle) ;
		if (yRectangle2 > 350) {
			yRectangle2 = 350;
		}
	}
	
	if (CollisionPlateformeBalle1() == true ) {			// Faire rebondir la balle sur la plateforme 1
		xBalleVitesse = Math.abs(xBalleVitesse);
	}
	
	if (CollisionPlateformeBalle2 () == true) {			// Faire rebondir la balle sur la plateforme 2
		xBalleVitesse = Math.abs(xBalleVitesse) * -1;
		
	}
		
	
	if (keyIsDown (KEY_J) && keyIsDown (KEY_N) && CollisionPlateformeBalle2 == 1) {
		xBalleVitesse = xBalleVitesse + 2;

	}
	
	if (keyIsDown (KEY_S) && KEY_Z && CollisionPlateformeBalle1 == 1){
        yBalleVitesse = yBalleVitesse + 2;
		
	}	
	
	
	if (xBalle < 0 || xBalle > 400) {
		
		MiseAJourScore(xBalle > 400);
		yBalle = 200;
		xBalle = 200;
		RandomStart();
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
    beginShape();
    vertex (0, 0);
    vertex (400, 0);
    vertex (400, 400);
    vertex (0, 400);
    vertex (0, 0);
    endShape();
    
}



// Fonction qui dit Collision = oui ou non pôur la plateforme 1
function CollisionPlateformeBalle1() { 
	var yPlateforme1 = yRectangle1 - 10
	var yPlateforme1Min = yPlateforme1
	var yPlateforme1Max = (yPlateforme1 + 60)
	if (yBalle < yPlateforme1Max && yBalle > yPlateforme1Min && xBalle < 75 && xBalle > 70) {
		multiplicateurVitesseBalle = multiplicateurVitesseBalle * 1.1;
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
		multiplicateurVitesseBalle = multiplicateurVitesseBalle * 1.1;
		return true;
	}
	return false;
}


function MiseAJourScore(JoueurGaucheMarque) {
	var k;
	if (JoueurGaucheMarque == true) {
		k = 0;
	}	else {
		k = 1;
	}
	pointsJoueur[k] = pointsJoueur[k] + 1;
	conteneurPointsJoueur[k].innerText = pointsJoueur[k];
}

function RandomStart() {
	const THETA = Math.random() * 120 - 60;
	xBalleVitesse = Math.cos(THETA*Math.PI/180) * 2 * Math.SQRT2;
	yBalleVitesse = Math.sin(THETA*Math.PI/180) * 2 * Math.SQRT2;
	multiplicateurVitesseBalle = 1;
}

function GameStart() {
    if (keyIsPressed === true) {
        gameStart = true;
        console.log('Game Start');
    } else {
        return false;
    }
}
function GameEnd() {
   if (pointsJoueur > 7) {
        gameEnd = true;
    } else {
        return false;
    }
}



var limite = [400, 0];
var pointsJoueur = [0, 0];
var conteneurPointsJoueur = [document.getElementById("conteneurPointsJoueur1"), document.getElementById("conteneurPointsJoueur2")];

var xBalle = 200.0;
var yBalle = 200.0;

var yRectangle1 = 175; 
var yRectangle2 = 175;
var xBalleVitesse;
var yBalleVitesse;
RandomStart(); 
var multiplicateurVitesseBalle = 1;

const KEY_J = 74;
const KEY_N = 78;
const KEY_Z = 90;
const KEY_S = 83;
const VITESSE_PLATEFORME = 3.75;