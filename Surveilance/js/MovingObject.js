/**
 * ...
 * @author General
 */

MovingObject = function(game, sndFunc) {
	this.game = game;
	this.soundFunction = sndFunc;
	
	this.content = null;
	this.note = null;
	this.sign = null;
	this.signTwn = null;
	
	this.borderRect = null;//:Rectangle;
	this.vx = 0.0;
	this.vy = 0.0;
	this.areaRect = null;
	
	this.ptX=0;	
	this.ptY=0;	
}

MovingObject.prototype = {
	init: function () {
		this.areaRect = new Phaser.Rectangle(170, 134, 775, 476);
		this.borderRect = new Phaser.Rectangle();
		
		this.content = this.game.add.group();
		this.note = this.game.add.sprite(0,0,'PIC_SHAPES',0,this.content);
		this.note.anchor.setTo(0.5, 0.5);
	//	this.note.init(0,0,0,0,0);
		this.note.owner = this;
		
		this.sign = this.game.add.sprite(0,0,'PIC_YESNO',0,this.content);
		this.sign.anchor.setTo(0.5, 0.5);
		
		this.sign.visible = false;
	},
	step: function (dt) {
		this.ptX += this.vx * dt;
		this.ptY += this.vy * dt;
		var hasReflected = false;
		if (this.ptX + this.borderRect.left < this.areaRect.left) {
			this.ptX = this.areaRect.left-this.borderRect.left;
			this.vx = -this.vx;
			hasReflected = true;
		}
		if (this.ptX + this.borderRect.right > this.areaRect.right) {
			this.ptX = this.areaRect.right-this.borderRect.right;
			this.vx = -this.vx;
			hasReflected = true;
		}
		
		if (this.ptY + this.borderRect.top < this.areaRect.top) {
			this.ptY = this.areaRect.top-this.borderRect.top;
			this.vy = -this.vy;
			hasReflected = true;
		}			
		if (this.ptY + this.borderRect.bottom >this.areaRect.bottom) {
			this.ptY = this.areaRect.bottom-this.borderRect.bottom;
			this.vy = -this.vy;
			hasReflected = true;
		}
		
		//this.content.x = this.ptX+content.width/2;
		//this.content.y = this.ptY+content.height/2;
		if (hasReflected) {
			this.soundFunction('SND_SMALL_SHAPE_BOUNCE',5);
		}
	},
	
	resetCoords: function () {
		this.ptX = Routines.prototype.RandomNumberFromTo(this.areaRect.left - this.borderRect.left, this.areaRect.right - this.borderRect.right);
		this.ptY = Routines.prototype.RandomNumberFromTo(this.areaRect.top - this.borderRect.top, this.areaRect.bottom - this.borderRect.bottom);
	},
	
	onSignTwnComplete: function () {
		this.sign.visible = false;
	},
	showCorrect: function () {
		if (this.signTwn){this.signTwn.stop()}
		this.signTwn = this.game.add.tween(this.sign);
		this.signTwn.onComplete.add(this.onSignTwnComplete, this);
		this.sign.frame = 0;
		this.sign.alpha = 0;
		this.sign.visible = true;
		
		this.signTwn.to({alpha:1},250);
		this.signTwn.start();
	},
	
	showWrong: function () {
		if (this.signTwn){this.signTwn.stop()}
		this.signTwn = this.game.add.tween(this.sign);
		this.signTwn.onComplete.add(this.onSignTwnComplete, this);
		this.sign.frame = 1;
		this.sign.alpha = 0;
		this.sign.visible = true;
		
		this.signTwn.to({alpha:1},250, Phaser.Easing.Linear.NONE,false, 0, 2 );
		this.signTwn.start();	
		
	},
	
	getRemoved: function () 
	{
		this.content.visible = false;
	},
	
	setNoteShape: function (cid, sid, rct) 
	{
	//	this.note.content.scale.set(0.5, 0.5);
		this.note.frame = cid+sid*5;
		
		this.borderRect = rct;
		
		
		this.vx = 5 + 5 * Math.random();
		if (Math.random() < 0.5) {
			this.vx = -this.vx;
		}
		
		this.vy = 5 + 5 * Math.random();
		if (Math.random() < 0.5) {
			this.vy = -this.vy;
		}
	},	
	f2: function () {
	
	},
	f3: function () {
	
	}
}