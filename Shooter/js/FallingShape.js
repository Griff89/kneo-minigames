/**
 * ...
 * @author General
 */

FallingShape = function(game,sndCb, failCb) {
	this.game = game;
	this.geom = null;
	this.soundCallBack = sndCb;
	this.failCallBack = failCb;

	this.errSmb = null;
	this.corSmb = null;
	
	this.corTwn = null;
	this.errTwn = null;
	this.geomTwn = null;
	
	this.moveMode = 0;//1 - wave, 2 - fall, 3 - nothing
	this.arId = 0;
	
	this.g = 0.0;
	this.phase = 0.0;
	this.fallTime = 0.0;
	
	this.planned2Fall = false;	
	
	this.speedCoef = 1;
}

FallingShape.prototype = {
	init: function () {
		this.geom = this.game.add.sprite(0,0,'PIC_SHAPES');
		this.geom.owner = this;
		
		this.errSmb = this.game.add.sprite(0,0,'PIC_YESNO',1);
		this.corSmb = this.game.add.sprite(0,0,'PIC_YESNO',0);
		this.geom.scale.set(0.5, 0.5);
		this.geom.anchor.setTo(0.5,0.5);
		this.errSmb.anchor.setTo(0.5,0.5);
		this.errSmb.visible = false;		
		
		this.corSmb.anchor.setTo(0.5,0.5);
		this.corSmb.visible = false;
		
		this.g = 98;
		
	},
	reset: function (id) {
		this.arId = id;
		
		this.geom.frame = (Math.floor(Math.random() * 3)+ 5* Math.floor(Math.random() * 7));
		
		this.phase = id * Math.PI / 3;
		this.geom.x = 110 + 84 * id;
		this.moveMode = 1;
		this.planned2Fall = false;
		this.doWaveMovement(0);
		
		this.geom.visible = true;
		this.errSmb.visible = false;
		this.corSmb.visible = false;
	},
	
	showWrong: function () {
		this.errSmb.x = this.geom.x;
		this.errSmb.y = this.geom.y;
		this.errSmb.alpha = 1;
		this.errSmb.visible = true;
		if (this.errTwn){this.errTwn.stop()}
		this.errTwn = this.game.add.tween(this.errSmb);
		this.errTwn.to({alpha:0},300,Phaser.Easing.Linear.NONE, true,0,2);
		this.errTwn.start();		
	//	shp.showWrong(true);
		this.geom.visible = false;
	//	mouseEnabled = false;
		this.moveMode = 3;
	},
	showCorrect: function () {
		if (this.corTwn){this.corTwn.stop()};
		this.corSmb.x = this.geom.x;
		this.corSmb.y = this.geom.y;	
		    
		this.corSmb.alpha = 0;
		this.corSmb.visible = true;
		
		this.corTwn = this.game.add.tween(this.corSmb);
		this.corTwn.to({alpha:1},500);
		this.corTwn.start();		
		
		this.geom.visible = false;
		
		this.moveMode = 3;
	},
	
	getFallTime: function () {
		return this.fallTime;
	},
	
	step: function (dt) {

		if (this.moveMode==2) {
			this.doFallMovement(dt*this.speedCoef);
		}
		else {
			if (this.moveMode==1) {
				this.doWaveMovement(dt*0.5);
			}
		}
	},
	
	fallOrder: function () {
		this.planned2Fall = true;
	},
	
	startFalling: function () {

		this.fallTime = 0;
		this.moveMode = 2;
	},
	
	doWaveMovement: function (dt) {
		this.phase += dt;
		this.geom.y = 120 + 20 * Math.sin(this.phase);
		if (this.planned2Fall) {
			if (this.geom.y >= 139) {
				this.startFalling();
				this.soundCallBack('SND_BLOCK_FALL',1);
			}
		}
	},
	
	doFallMovement: function (dt) {
		this.fallTime += dt
		this.geom.y = 140 + 0.5 * this.g * this.fallTime * this.fallTime;
		if (this.geom.y >= 433) {
			this.showWrong();
			this.failCallBack();
		}
	},	
	f2: function () {
	
	},
	f3: function () {
	
	}
}