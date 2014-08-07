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
	this.faceId = 0;
	
	this.faceFr0 = 0;
	this.eyesFr0 = 0;
	this.mouthFr0 = 0;	
	
	this.face = null;
	this.eyes = null;
	this.mouth = null;
	this.bgd = null;
	this.cover = null;
	//console.log('Creating...');
}

MemoryCard.prototype = {
	init: function (ax, ay) {
		//console.log('MemCard.init');
		this.content=this.game.add.group();
		this.bgd = this.game.add.sprite(0,0,'PIC_CARD_ELEMS','MemoryCardBase0000',this.content);
		this.bgd.anchor.setTo(0.5, 0.5);		
		this.bgd.owner = this;
		
		this.w0 = this.content.width;
	
		this.face = this.game.add.sprite(0,0,'PIC_CARD_ELEMS','FaceShape0000',this.content);
		this.face.anchor.setTo(0.5, 0.5);
		this.faceFr0 = this.face.frame;		
				
		this.eyes = this.game.add.sprite(0,-20,'PIC_CARD_ELEMS','FaceEyes0000',this.content);
		this.eyes.anchor.setTo(0.5, 0.5);
		this.eyesFr0 = this.eyes.frame;
				
		this.mouth = this.game.add.sprite(0,20,'PIC_CARD_ELEMS','FaceMouth0000',this.content);
		this.mouth.anchor.setTo(0.5, 0.5);
		this.mouthFr0 = this.mouth.frame;
	
		this.cover = this.game.add.sprite(0,0,'PIC_CARD_ELEMS','MemCardTop0000',this.content);
		this.cover.anchor.setTo(0.5, 0.5);		
		

		

		this.content.x = ax;
		this.content.y = ay;

		this.y0 = ay;

	},
	
	onTwnComplete: function () {
		switch (this.phase) {
			case 1: {
				this.cover.visible = false;
				var twn = this.game.add.tween(this.content.scale);
			//	hideTween.onComplete.add(this.onTwnComplete, this);		

				twn.to({x:1},170, Phaser.Easing.Linear.None, true, 0, 0,false);					
				break;
			}
			case 3: {
				this.cover.visible = true;
				var twn = this.game.add.tween(this.content.scale);
				twn.to({x:1},170, Phaser.Easing.Linear.None, true, 0, 0,false);
				break;
			}
			case 2:
			case 4: {
				break;
			}
		}	
	},
	setFace: function (fid) {
		var fcid = fid % 3;
		fid = Math.floor(fid/3);
		var mid = fid % 3;
		var eid =  Math.floor(fid / 3);
		
		this.eyes.frame = this.eyesFr0+eid;
		this.mouth.frame = this.mouthFr0+mid;
		this.face.frame = this.faceFr0+fcid;
		
		this.cover.visible = true;
		
		this.width = this.w0;
		this.isClosed = true;
		
		this.faceId = fid;
		this.content.alpha = 1;	
		
		this.content.y = this.y0;	
		
		
	},
	open: function () {
		this.phase = 1;
		var twn = this.game.add.tween(this.content.scale);
		twn.onComplete.add(this.onTwnComplete, this);
		twn.to({x:0}, 130, Phaser.Easing.Linear.None, true, 0, 0, false);
		twn.start();
		this.isClosed = false;	
	},
	close: function () {
		this.phase = 3;
		var twn = this.game.add.tween(this.content.scale);
		twn.onComplete.add(this.onTwnComplete, this);
		twn.to( { x:0 }, 130, Phaser.Easing.Linear.None, true, 0, 0, false);
		
		this.isClosed = true;	
	},
	showCorrect: function () {
		var twn = this.game.add.tween(this.content);
		
		twn.to({alpha:0, y:this.y0-50}, 500, Phaser.Easing.Linear.None, true, 0, 0, false);
	},
	f3: function () {
	
	}
}