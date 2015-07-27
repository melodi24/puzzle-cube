"use strict";
var cubeSize = 3;

var allCubePieces = [];
//set of all rotatable layers of cube
var x0layer = [];
var x1layer = [];
var x2layer = [];

var y0layer = [];
var y1layer = [];
var y2layer = [];

var z0layer = [];
var z1layer = [];
var z2layer = [];


var colors = {	W: "white", 
				Y: "yellow", 
				R: "red", 
				O: "orange", 
				B: "blue", 
				G: "green" 
			}

var sides = { 	TOP: 0, 
				BOTTOM: 1, 
				LEFT: 2, 
				RIGHT: 3, 
				FRONT: 4, 
				BACK: 5
			}

var pieceType = {	CENTER: 0,
					MIDDLE: 1,
					EDGE: 2,
					CORNER: 3
				}

var xPos = {LEFT: 0, MID: 1, RIGHT: 2 }
var yPos = {TOP:  0, MID: 1, BOTTOM: 2}
var zPos = {LEFT: 0, MID: 1, RIGHT: 2 }

function cubePiece(cubePieceType, locationX, locationY, locationZ, colors) {
	this.cubePieceType = cubePieceType;
	this.locX = locationX;
	this.locY = locationY;
	this.locZ = locationZ;
	this.colors = colors;
}

//initial placement of pieces is solved cube with 
//front: white, back: yellow, left: blue, right: green, top:red, and bottom: orange
function initializeCubePieces() {

	//very center of cube
	allCubePieces.push(new cubePiece(pieceType.CENTER, xPos.MID, yPos.MID, zPos.MID, []));

	//middles of each side
	allCubePieces.push(new cubePiece(pieceType.MIDDLE, xPos.MID, 	yPos.MID, 	 zPos.FRONT, [colors.W, sides.FRONT]));
	allCubePieces.push(new cubePiece(pieceType.MIDDLE, xPos.MID, 	yPos.MID, 	 zPos.BACK,  [colors.Y, sides.BACK]));
	allCubePieces.push(new cubePiece(pieceType.MIDDLE, xPos.MID, 	yPos.TOP, 	 zPos.MID,   [colors.R, sides.TOP]));
	allCubePieces.push(new cubePiece(pieceType.MIDDLE, xPos.MID, 	yPos.BOTTOM, zPos.MID,   [colors.O, sides.BOTTOM]));
	allCubePieces.push(new cubePiece(pieceType.MIDDLE, xPos.LEFT, 	yPos.MID, 	 zPos.MID,   [colors.B, sides.LEFT]));
	allCubePieces.push(new cubePiece(pieceType.MIDDLE, xPos.RIGHT, 	yPos.MID, 	 zPos.MID,   [colors.G, sides.RIGHT]));

	//edges, in sets of vertical layers
	allCubePieces.push(new cubePiece(pieceType.EDGE, xPos.MID,	 yPos.TOP, zPos.FRONT, 	[[colors.R, sides.TOP], [colors.W, sides.FRONT]]));
	allCubePieces.push(new cubePiece(pieceType.EDGE, xPos.MID,	 yPos.TOP, zPos.BACK, 	[[colors.R, sides.TOP], [colors.Y, sides.BACK]]));
	allCubePieces.push(new cubePiece(pieceType.EDGE, xPos.LEFT,	 xPos.TOP, zPos.MID, 	[[colors.R, sides.TOP], [colors.B, sides.LEFT]]));
	allCubePieces.push(new cubePiece(pieceType.EDGE, xPos.RIGHT, yPos.TOP, zPos.MID, 	[[colors.R, sides.TOP], [colors.G, sides.RIGHT]]));

	allCubePieces.push(new cubePiece(pieceType.EDGE, xPos.LEFT,	 yPos.MID, zPos.FRONT, 	[[colors.B, sides.LEFT],  [colors.W, sides.FRONT]]));
	allCubePieces.push(new cubePiece(pieceType.EDGE, xPos.LEFT,	 yPos.MID, zPos.BACK, 	[[colors.B, sides.LEFT],  [colors.Y, sides.BACK]]));
	allCubePieces.push(new cubePiece(pieceType.EDGE, xPos.RIGHT, yPos.MID, zPos.FRONT, 	[[colors.G, sides.RIGHT], [colors.W, sides.FRONT]]));
	allCubePieces.push(new cubePiece(pieceType.EDGE, xPos.RIGHT, yPos.MID, zPos.BACK, 	[[colors.G, sides.RIGHT], [colors.Y, sides.BACK]]));

	allCubePieces.push(new cubePiece(pieceType.EDGE, xPos.MID,	 yPos.BOTTOM, zPos.FRONT, [[colors.O, sides.BOTTOM], [colors.W, sides.FRONT]]));
	allCubePieces.push(new cubePiece(pieceType.EDGE, xPos.MID,	 yPos.BOTTOM, zPos.BACK,  [[colors.O, sides.BOTTOM], [colors.Y, sides.BACK]]));
	allCubePieces.push(new cubePiece(pieceType.EDGE, xPos.LEFT,  xPos.BOTTOM, zPos.MID,   [[colors.O, sides.BOTTOM], [colors.B, sides.LEFT]]));
	allCubePieces.push(new cubePiece(pieceType.EDGE, xPos.RIGHT, yPos.BOTTOM, zPos.MID,   [[colors.O, sides.BOTTOM], [colors.G, sides.RIGHT]]));

	//corners, in sets of vertical layers
	allCubePieces.push(new cubePiece(pieceType.CORNER, xPos.LEFT,  yPos.TOP, zPos.FRONT, [[colors.R, sides.TOP], [colors.B, sides.LEFT],  [colors.W, sides.FRONT]]));
	allCubePieces.push(new cubePiece(pieceType.CORNER, xPos.LEFT,  yPos.TOP, zPos.BACK,  [[colors.R, sides.TOP], [colors.B, sides.LEFT],  [colors.Y, sides.BACK]]));
	allCubePieces.push(new cubePiece(pieceType.CORNER, xPos.RIGHT, yPos.TOP, zPos.FRONT, [[colors.R, sides.TOP], [colors.G, sides.RIGHT], [colors.W, sides.FRONT]]));
	allCubePieces.push(new cubePiece(pieceType.CORNER, xPos.RIGHT, yPos.TOP, zPos.BACK,  [[colors.R, sides.TOP], [colors.G, sides.RIGHT], [colors.Y, sides.BACK]]));

	allCubePieces.push(new cubePiece(pieceType.CORNER, xPos.LEFT,  yPos.BOTTOM, zPos.FRONT, [[colors.O, sides.BOTTOM], [colors.B, sides.LEFT],  [colors.W, sides.FRONT]]));
	allCubePieces.push(new cubePiece(pieceType.CORNER, xPos.LEFT,  yPos.BOTTOM, zPos.BACK,  [[colors.O, sides.BOTTOM], [colors.B, sides.LEFT],  [colors.Y, sides.BACK]]));
	allCubePieces.push(new cubePiece(pieceType.CORNER, xPos.RIGHT, yPos.BOTTOM, zPos.FRONT, [[colors.O, sides.BOTTOM], [colors.G, sides.RIGHT], [colors.W, sides.FRONT]]));
	allCubePieces.push(new cubePiece(pieceType.CORNER, xPos.RIGHT, yPos.BOTTOM, zPos.BACK,  [[colors.O, sides.BOTTOM], [colors.G, sides.RIGHT], [colors.Y, sides.BACK]]));
}