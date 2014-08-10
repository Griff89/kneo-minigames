/**
 * ...
 * @author General
 */

FacePic = function(game) {
	this.game = game;
	this.content = null;
	this.isClosed = false;
	this.phase = 0;
	this.w0 = 0;
	this.y0 = 0;
	this.shapeId = 0;
	
	this.faceFr0 = 0;
	this.eyesFr0 = 0;
	this.mouthFr0 = 0;	
	
	this.face = null;
	this.eyes = null;
	this.mouth = null;
	
	this.sign = null;
	
	this.arId = 0;
}

FacePic.prototype = {
	init: function (ax,ay) {
		this.content=this.game.add.group();
	
		this.face = this.game.add.sprite(0,0,'PIC_FACE_ELEMS','FaceShape0000',this.content);
		this.face.anchor.setTo(0.5, 0.5);
		this.faceFr0 = this.face.frame;	
		this.face.owner = this;
		this.face.inputEnabled = true;
		this.face.input.useHandCursor = true;
				
		this.eyes = this.game.add.sprite(0,-20,'PIC_FACE_ELEMS','FaceEyes0000',this.content);
		this.eyes.anchor.setTo(0.5, 0.5);
		this.eyesFr0 = this.eyes.frame;
				
		this.mouth = this.game.add.sprite(0,20,'PIC_FACE_ELEMS','FaceMouth0000',this.content);
		this.mouth.anchor.setTo(0.5, 0.5);
		this.mouthFr0 = this.mouth.frame;
		
		this.sign = this.game.add.sprite(0,0,'PIC_YESNO',0, this.content);
		this.sign.anchor.setTo(0.5, 0.5);
		
		
		this.content.x = ax;
		this.content.y = ay;
	},
	
	reset: function (id) {
		this.shapeId = id;
		
		var fid = id % 3;
		id = Math.floor(id/3);
		var mid = id % 3;
		var eid = Math.floor(id / 3);
		
		this.eyes.frame = this.eyesFr0+eid;
		this.mouth.frame = this.mouthFr0+mid;
		this.face.frame = this.faceFr0+fid;

		this.content.alpha = 1;
		this.sign.visible = false;
		if (this.signTwn){this.signTwn.stop()}
	},
	
	showError: function () {
		if (this.signTwn){this.signTwn.stop()}
		this.signTwn = this.game.add.tween(this.sign);
		this.sign.alpha = 0;
		this.sign.visible = true;
		this.sign.frame = 1;
		this.signTwn.to({alpha:1}, 300,Phaser.Easing.Linear.NONE, false, 0, 2, false);
		this.signTwn.onComplete.add(this.onWrongTwnOver, this);
		this.signTwn.start();
	},
	
	onCorTwnOver: function () {
		this.content.viaible = false;
	},
	
	onWrongTwnOver: function () {
		this.sign.visible = false;
	},
	
	showCorrect: function () 
	{
		if (this.signTwn){this.signTwn.stop()}
		this.signTwn = this.game.add.tween(this.sign);
		this.sign.alpha = 0;
		this.sign.visible = true;
		this.sign.frame = 0;
		this.signTwn.to({alpha:1}, 500);
	//	this.signTwn.onComplete.add(this.onCorTwnOver, this);
		this.signTwn.start();
	},
	
	
	f2: function () {
	
	},
	f3: function () {
	
	}
}