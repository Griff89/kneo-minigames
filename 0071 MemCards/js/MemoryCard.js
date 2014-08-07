/**
 * ...
 * @author General
 */

MemoryCard = function(game) {
	this.game = game;
	this.content = null;
	this.isClosed = false;
	this.phase = 0;
	this.w0 = 0;
	this.y0 = 0;
	this.scl0 = 0;
	this.faceId = 0;
	
	this.faceFr0 = 0;
	this.eyesFr0 = 0;
	this.mouthFr0 = 0;	
	
	this.bgd = null;
	this.cardClosedFrame = 8;
	
	this.face = null;
	this.eyes = null;
	this.mouth = null;

	this.cover = null;
	////console.log('Creating...');
}

MemoryCard.prototype = {
	init: function (ax, ay) {
	//	//console.log('MemCard.init');
		this.content = this.game.add.group();
		this.bgd = this.game.add.sprite(0,0,'PIC_KNEO_CARDS',this.cardClosedFrame,this.content);
		this.bgd.anchor.setTo(0.5, 0.5);		
		this.bgd.owner = this;
		
		this.w0 = this.content.width;
	
		this.content.visible = false;
		
		this.content.x = ax;
		this.content.y = ay;


	},
	
	onTwnComplete: function () {
		switch (this.phase) {
			case 1: {
				this.bgd.frame = this.faceId;
				this.twn1 = this.game.add.tween(this.content.scale);
			//	hideTween.onComplete.add(this.onTwnComplete, this);

				this.twn1.to({x:this.scl0},170, Phaser.Easing.Linear.None, true, 0, 0,false);					
				break;
			}
			case 3: {
				this.bgd.frame = this.cardClosedFrame;//faceId;
				this.twn2 = this.game.add.tween(this.content.scale);
				this.twn2.to({x:this.scl0},170, Phaser.Easing.Linear.None, true, 0, 0,false);
				break;
			}
			case 2:
			case 4: {
				break;
			}
		}
	},
	setCoordsAndScale: function (ax,ay,scl) {
		this.content.scale.set(scl, scl);
		this.content.x = ax;
		this.content.y = ay;
		
		this.y0 = ay;
		this.scl0 = scl;
		this.w0 = this.content.width;
	},
	setFace: function (fid) {
		if (this.twn1)(this.twn1.stop())
		if (this.twn2)(this.twn2.stop())
		if (this.openTwn)(this.openTwn.stop())
		if (this.closeTwn)(this.closeTwn.stop())
		if (this.correctTwn)(this.correctTwn.stop())
		
		this.faceId = fid;
		
		this.bgd.frame = this.cardClosedFrame;//faceId;
		
		
	//	this.content.width = this.w0;
		this.isClosed = true;
		

		this.content.alpha = 1;	
		
	//	this.content.y = this.y0;	
		
		
	},
	open: function () {
		this.phase = 1;
		this.openTwn = this.game.add.tween(this.content.scale);
		this.openTwn.onComplete.add(this.onTwnComplete, this);
		this.openTwn.to({x:0}, 130, Phaser.Easing.Linear.None, true, 0, 0, false);
		this.openTwn.start();
		this.isClosed = false;	
	},
	close: function () {
		this.phase = 3;
		this.closeTwn = this.game.add.tween(this.content.scale);
		this.closeTwn.onComplete.add(this.onTwnComplete, this);
		this.closeTwn.to( { x:0 }, 130, Phaser.Easing.Linear.None, true, 0, 0, false);
		
		this.isClosed = true;	
	},
	showCorrect: function () {
		this.correctTwn = this.game.add.tween(this.content);
		
		this.correctTwn.to({alpha:0, y:this.y0-50}, 500, Phaser.Easing.Linear.None, true, 0, 0, false);
	},
	f3: function () {
	
	}
}