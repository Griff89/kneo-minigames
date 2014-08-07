/**
 * ...
 * @author General
 */
GeomTaskView = function(game) {
	this.game = game;
	this.content = null;
	this.bgd = null;
	this.shapeTxt = null;
	this.okSmb = null;
	this.brd = null;
	
	this.brdFr0 = 0;
	
	this.shapeId = 0;
	this.colorId = 0;

	this.shapeText = ['anything','circle','square', 'hexagon', 'triangle','star'];
	this.colorText = ['any', 'red', 'yellow', 'green', 'blue', 'purple', 'white','black'];

	this.shapesNum = 0;
	this.colorsNum = 0;

	this.prevShapeId = 0;
	this.prevColorId = 0;

	this.twnOK = null;
	this.twnBrd = null;
}

GeomTaskView.prototype = {
	init: function () {
		this.content = this.game.add.group();
		this.content.x = 228;
		this.content.y = 136;
		
		this.bgd = this.game.add.sprite(0,0,'PIC_ALL_ART','GeomTaskViewBGD0000',this.content);
		this.bgd.anchor.setTo(0,0.5);
		
		this.shapeTxt = this.game.add.text(100,0,'Find anything',{font:"24px Arial", align:"center", fill:"#493012"},this.content);
		this.shapeTxt.anchor.setTo(0.5,0.5);
		
		this.brd = this.game.add.sprite(0,0,'PIC_ALL_ART','GeomBorder0000',this.content);
		this.brd.anchor.setTo(0.5,0.5);
		this.brdFr0 = this.brd.frame;
		this.brd.scale.set(0.65,0.65);
		
		this.okSmb = this.game.add.sprite(0,8,'PIC_ALL_ART','OKSymbol0000',this.content);
		this.okSmb.anchor.setTo(0.5,0.5);
		
		this.shapesNum = 5;
		this.colorsNum = 8;
		
		this.prevShapeId = -1;
		this.shapeId = -1;
		this.prevColorId = -1;
		this.colorId = -1;
	},
	resetTask: function (phase, answer) {
		if (this.twnOK){this.twnOK.stop()}
		if (this.twnBrd){this.twnBrd.stop()}
		
		if (answer) {
			this.shapeId = answer.shapeId;
			this.colorId = 0;
			this.brd.frame = this.brdFr0+this.shapeId-1;
			this.brd.x = 0;
			this.okSmb.x = 0;
			this.shapeTxt.text = (phase + 1).toFixed(0) + ' .Find ' + this.shapeText[this.shapeId];
			this.shapeTxt.visible = true;
			this.okSmb.visible = false;
		}	
	},
	hidePhaseFrame: function () {
		this.shapeTxt.visible = true;
		this.brd.visible = true;	
	},
	showPhrase: function (str) {
		this.shapeTxt.text = str;
		this.shapeTxt.visible = true;
		this.okSmb.visible = false;
		this.brd.visible = false;		
	},
	showCorrect: function () {
		this.okSmb.visible = true;
		this.shapeTxt.visible = false;
		this.twnOK = this.game.add.tween(this.okSmb);
		this.twnOK.to({x:128},120);
		this.twnOK.start();
		
		this.twnBrd = this.game.add.tween(this.brd);
		this.twnBrd.to({x:68},120);
		this.twnBrd.start();
	},
	f1: function () {
	},
	f1: function () {
	}
}