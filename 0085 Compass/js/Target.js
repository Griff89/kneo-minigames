/**
 * ...
 * @author General
 */

Target = function(game) {
	this.game = game;
	this.sprite = null;
	
	this.phase = 0;
	this.rad = 0;
	this.centreY = 0;
	this.centreX = 0;
	this.omega = 0;
	
	this.vx = 0;
	this.tLeft = 0;
	this.tRight = 0;
	
	this.twn = null;	
}

Target.prototype = {
	init: function () {
		this.sprite = this.game.add.sprite(0,0,"PIC_TARGET");
		this.sprite.visible = true;
		this.sprite.anchor.setTo(0.5, 0.5);	
	},
	showAtCoords: function (ax, ay) 
	{
		this.sprite.alpha = 0;
		this.sprite.x = ax;
		this.sprite.y = ay;
		this.sprite.visible = true;
		this.twn = this.game.add.tween(this.sprite);
		this.twn.to({alpha:1},200);
		this.twn.start();
	},
	
	doCircleStep: function (dt) 
	{
		this.phase += this.omega * dt;
		this.calcCircleCoords();
	},
	
	setCircleMovementCoords: function (cx, cy, r, ph)
	{
		this.centreX = cx;
		this.centreY = cy;
		this.rad = r;
		this.phase = ph;
		this.omega = ((Math.random() < 0.5)?1: -1);
		
		this.calcCircleCoords();
		this.sprite.visible = true;
	},
	
	doLineStep: function (dt)
	{
		this.sprite.x += this.vx * dt;
		if (this.sprite.x < this.tLeft) {
			this.sprite.x = this.tLeft;
			this.vx = -this.vx;
		}
		if (this.sprite.x > this.tRight) {
			this.sprite.x = this.tRight;
			this.vx = -this.vx;
		}
	},
	
	prepare2HorzMovement: function (lft, rht) 
	{
		this.tLeft = lft;
		this.tRight = rht;
		this.vx = ((Math.random() < 0.5)?1: -1);
	},
	
	calcCircleCoords: function ()
	{
		this.sprite.x = this.centreX + this.rad * Math.sin(this.phase);
		this.sprite.y = this.centreY - this.rad * Math.cos(this.phase);
	},	
	f2: function () {
	
	},
	f3: function () {
	
	}
}