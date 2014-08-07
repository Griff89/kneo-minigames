/**
 * ...
 * @author General
 */

FollowObjectMark = function(game, comlFun) {
	this.game = game;
	this.completeFunc = comlFun;
	
	this.hideTimer = game.time.create(false);
	this.targetObject = null;
	
	this.sprite = null;
	this.w0 = 0;
	this.h0 = 0;
}

FollowObjectMark.prototype = {
	init: function () {
		this.sprite = this.game.add.sprite(0,0,'PIC_OBJ_MARK');
		//this.sprite.animations.add('appear',[0,1,2,3,4,5,6,7,8,9]);
		//this.sprite.animations.add('show',[9,10,11,12,13,14,15,16,17]);
		//this.sprite.events.onAnimationComplete.add(this.startLoopAnim,this);
		this.sprite.anchor.setTo(0.5,0.5);
		this.w0 = this.sprite.width;
		this.h0 = this.sprite.height;
	},
	onHideComplete: function () 
	{
		this.completeFunc();
		this.hide();
	},
	
	showFigure: function (mob) 
	{
		this.targetObject = mob;
		this.sprite.x = mob.ptX+mob.content.width/2;
		this.sprite.y = mob.ptY+mob.content.height/2-10;
		
		//this.sprite.animations.play('appear',30);
	//	circle.gotoAndPlay(1);
		
		this.sprite.visible = true;
	//	par.addChild(this);
		
		this.hideTimer.stop();
		this.hideTimer.add(1500,this.onHideComplete,this);
		this.hideTimer.start();
		
		if (this.twn){this.twn.stop()}
		this.twn = this.game.add.tween(this.sprite);
		
		this.sprite.width = this.w0 ;
		this.sprite.height = this.h0;

		this.twn.to({angle:50, width: this.w0*0.8, height: this.h0*0.8},500, Phaser.Easing.Linear.NONE,false,0,2,true);
		this.twn.start();		
	},
	
	hide: function () {
		this.sprite.visible = false;
		this.sprite.animations.stop();
	},	
	startLoopAnim: function () {

		//this.sprite.animations.play('show',30);
	
	},
	f3: function () {
	
	}
}