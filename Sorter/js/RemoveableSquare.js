/**
 * ...
 * @author General
 */

RemoveableSquare = function(game) {
	this.game = game;
	this.sprite = null;
	this.twn = null;
	
	this.isOnScreen = false;
	this.mouseEnabled = false;
	
	this.appearedMoment = 0;
}

RemoveableSquare.prototype = {
	init: function () {
		this.sprite = this.game.add.sprite(0,0,"PIC_PAINT");
		this.sprite.inputEnabled = true;
		this.sprite.inputEnabled.useHandCursor = true;
		this.sprite.anchor.setTo(0.5);
		this.sprite.owner = this;
	},
	reset: function () {
		this.mouseEnabled = false;
		this.sprite.visible = false;
		this.angle = 0;
		this.sprite.alpha = 0;
		this.sprite.frame = Math.floor(Math.random() * 19);
		this.isOnScreen = false;
	},
	
	rect2Over: function () 
	{
		if (this.isOnScreen) {
			this.mouseEnabled = false;
			
			if (this.twn){this.twn.stop()}
			
			this.twn = this.game.add.tween(this.sprite);
			this.twn.to({alpha:0, angle:360},200);
			this.twn.onComplete.add(this.onTwnComplete, this);
			this.twn.start();			
			this.isOnScreen = false;
		}
	},
	onTwnComplete: function () {
		this.sprite.visible = false;
	},
	show: function () {
		this.sprite.angle = 0;
		this.sprite.alpha = 0;			
		this.mouseEnabled = true;
		this.sprite.visible = true;
		if (this.twn){this.twn.stop()}
		
		this.twn = this.game.add.tween(this.sprite);
		this.twn.to({alpha:1},100);
		this.twn.start();

		this.isOnScreen = true;
		
		this.appearedMoment = Date.now();
	},	
	
	f2: function () {
	
	},
	f3: function () {
	
	}
}