/**
 * ...
 * @author General
 */

GeomShape = function(game, corrCb) {
	this.game = game;
	this.correctCallBack = corrCb;
	this.content=null;
	
	this.bgd=null;
	this.bgdFr0=0;
	
	this.wrongSmb=null;
	this.wrongSmbFr0=0;
	
	this.cover=null;
	this.coverFr0=null;
	
	this.shapeId = 0;
	this.colorId = 0;
	
	this.shapesNum = 5;
	this.colorsNum = 7;
	
	this.twn = null;
	this.coverTwn = null;
	this.coverDelayedActionId = 0;//0 - nothing, 1 - show true, 2 - show wrong
	
	this.hideAfterWrong = false;
	
	this.isCovered = false;
	this.isHit = false;
	
	this.isGuessed = false;
}

GeomShape.prototype = {
	init: function () {
		this.content = this.game.add.group();
		
		this.bgd = this.game.add.sprite(0,0,'PIC_SHAPES',0,this.content);
		this.bgd.anchor.setTo(0.5, 0.5);
		this.bgdFr0 = this.bgd.frame;
		this.bgd.owner = this;
		this.bgd.scale.set(0.5, 0.5);
		
		this.wrongSmb = this.game.add.sprite(0,0,'PIC_ICONS',4,this.content);
		this.wrongSmb.anchor.setTo(0.5, 0.5);
	
		this.wrongSmb.visible = false;
		
		this.cover = this.game.add.sprite(0,-8,'PIC_ICONS',0,this.content);
		this.cover.anchor.setTo(0.5, 0.5);
		this.cover.scale.set(1.2, 1.2);

		this.coverFr0 = this.cover.frame;	
	},

	onTweenComplete: function () {
		this.correctCallBack();
	},
	onCoverComplete: function () {
		switch(coverDelayedActionId) {
			case 0: {
				break;
			}
			case 1: {
				this.cover.visible = false;
				this.getHit();
				this.correctCallBack();
				break;
			}
			case 2: {
				this.cover.visible = false;
				this.showWrong();
				break;
			}
		}		
	},
	resetShapeAndColor: function (shid, cid) {		
		if (shid != 0) {
			this.shapeId = shid;
		}
		else {
			this.shapeId = Math.floor(1 + Math.random() * this.shapesNum);
		}

		if (cid != 0) {
			this.colorId = cid;
		}
		else {
			this.colorId = Math.floor(1 + Math.random() * this.colorsNum);
		}
		
		
		this.bgd.frame = this.bgdFr0+(this.colorId-1) * this.shapesNum + (this.shapeId-1);
			
		this.cover.visible = false;
		this.cover.frame = this.coverFr0;
		

		this.content.visible = true;
		
		this.isCovered = false;
		this.isHit = false;
		
		if (this.twn){this.twn.stop()}
		if (this.coverTwn){
			this.coverTwn.stop(); 
			//this.coverTwn.onComplete.removeAll()
		}
		
		
		this.content.alpha = 1;
		this.coverDelayedActionId = 0;
		this.bgd.rotation = Routines.prototype.RandomNumberFromTo(-20, 20);
		this.content.scale.set(1,1);
		
		this.wrongSmb.visible = false;
				
	},
	showCover: function () {
		
		this.cover.frame = this.coverFr0+Math.floor(Math.random()*3);
		this.cover.rotation = -this.content.rotation + 2 * Math.random() - 1;


		this.cover.visible = true;
		this.cover.alpha = 1;	
		
		this.isCovered = true;
	},
	afterWrongTween: function () {
		if (this.hideAfterWrong){
			this.getHit();
		}
	},
	showWrong: function () {
		this.hideAfterWrong = true;
		this.cacheAsBitmap = false;
		
		this.wrongSmb.alpha = 1;
		this.wrongSmb.visible = true;
		this.wrongTween = this.game.add.tween(this.wrongSmb);
		this.wrongTween.onComplete.add(this.afterWrongTween, this);
		this.wrongTween.to({alpha:0},300, Phaser.Easing.Linear.None, true, 100, 2,false);
		//this.wrong.gotoAndPlay(1);
		this.isHit = true;
	},
	getHit: function () {
		this.twn = this.game.add.tween(this.content);
		this.twn.to({rotation:360, alpha:0},300, Phaser.Easing.Linear.None, true);
		this.twn.start();
		this.isHit = true;		
	},
	uncoverAndWrong: function () {
		if (this.coverTwn){
			this.coverTwn.stop(); 
			//this.coverTwn.onComplete.removeAll()
		}		
		
		this.coverTwn = this.game.add.tween(this.cover);
		this.coverTwn.onComplete.add(this.onCoverComplete, this);
		coverDelayedActionId = 2;	
		this.coverTwn.to({alpha:0},100,Phaser.Easing.Linear.None, true);
	
	},
	uncoverAndHit: function () {
		if (this.coverTwn){
			this.coverTwn.stop(); 
			//this.coverTwn.onComplete.removeAll()
		}
		this.coverTwn = this.game.add.tween(this.cover);
		this.coverTwn.onComplete.add(this.onCoverComplete, this);
		coverDelayedActionId = 1;	
		this.coverTwn.to({alpha:0},100,Phaser.Easing.Linear.None, true);
	}
	
}