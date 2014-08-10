/**
 * ...
 * @author General
 */

CircleWithCentre = function(game) {
	this.game = game;
	this.content=null;
	
	this.base=null;
	this.baseFr0=0;
	this.clickMark=null;
	this.centMark=null;
	this.resPercent=null;
	
	this.bBottom = 0;
	this.bTop = 0;
	this.vy = 0.0;

	this.cx = 0;
	this.cy = 0;
	this.rad = 0;
	this.phase = 0.0;
	this.omega = 0.0;

	this.clickRating = 0;
	this.hitRating = 0;
	
	this.mouseEnabled = false;
}

CircleWithCentre.prototype = {
	init: function () {
		this.content = this.game.add.group();
		this.base = this.game.add.sprite(0,0,'PIC_ALL_ART','CircleBase0000',this.content);
		this.base.anchor.setTo(0.5, 0.5);
	//	this.base.angle = -180+Math.random()*360;
		this.baseFr0 = this.base.frame;
		
		this.base.owner = this;
		
		this.clickMark = this.game.add.sprite(0,0,'PIC_ALL_ART','CLickedMark0000',this.content);
		this.clickMark.anchor.setTo(0.5, 0.5);
		
		this.centMark = this.game.add.sprite(0,0,'PIC_ALL_ART','CentreMark0000',this.content);
		this.centMark.anchor.setTo(0.5, 0.5);
		
		this.resPercent = this.game.add.text(0,0,'%',{font:"24px Arial", fill:"#ffffff", align:"center"},this.content);
		this.resPercent.anchor.setTo(0.5, 0.5);
		
		
	},
	reset: function (bid) {
		this.clickMark.visible = false;
	//	base.scaleX = base.scaleY = 0.5 + 2 * Math.random();
		this.base.angle = Math.random() * 360;
		this.base.frame = this.baseFr0+bid-1;
		
		this.centMark.visible = false;
		this.centMark.x = this.centMark.y = 0;
		this.resPercent.visible = false;
		
	//	buttonMode = true;
		this.mouseEnabled = true;
		this.clickRating = 0;
	},
	
	react2Click: function (pointer) {
		
		//console.log('react2Click');
		//console.log(pointer);
		
		var d = Routines.prototype.GetDistanceBetween(pointer.x, pointer.y, this.content.x, this.content.y);//Math.sqrt(e.localX * e.localX + e.localY * e.localY);
		
		var r = 148 / 2; // у базы будут фиксированные выступающие части
	//	var r:Number = base.width / 2;
		var percent = 1 - d / r;
		//percent = int(Math.ceil(percent * 10)) * 10;
		percent *= 100;
		
		this.clickRating = Math.ceil(percent);
		if (this.clickRating >= 99) {
			this.hitRating = 0;
		}else {
			if (this.clickRating >= 95) {
				this.hitRating = 1;
			}
			else {
				if (this.clickRating >= 90) {
					this.hitRating = 2;
				}
				else {
					if (this.clickRating >= 80) {
						this.hitRating = 3;
					}
					else {
						this.hitRating = 7 - 3 * Math.floor(this.clickRating / 80);
					}
				}					
			}
		}
		this.resPercent.text=this.clickRating.toFixed(0);
		this.resPercent.visible = true;
		
		this.centMark.visible = true;
		
		this.clickMark.x = pointer.x-this.content.x;
		this.clickMark.y = pointer.y-this.content.y;
		this.clickMark.visible = true;
		
	//	buttonMode = false;
		this.mouseEnabled = false;
	},
	
	initVerticalMovement: function (bT, bB, x0, y0) 
	{
		this.content.x = x0;
		this.content.y = y0;
		this.vy = 1;
		this.bTop = bT;
		this.bBottom = bB;
	},
	
	doVerticalMovement: function (dt) {
		this.content.y += this.vy * dt;
		if (this.content.y < this.bTop) {
			this.content.y = this.bTop;
			this.vy = -this.vy;
		}
		if (this.content.y > this.bBottom) {
			this.content.y = this.bBottom;
			this.vy = -this.vy;
		}
	},
	
	initCircleMovement: function (x0, y0, r, ph) 
	{
		this.cx = x0;
		this.cy = y0;
		this.rad = r;
		this.phase = ph;
		this.omega = 1;
		this.calcCircleCoords();
	},
	
	doCircleMovement: function (dt) {
		this.phase += this.omega * dt;
		this.calcCircleCoords();
	},
	
	drawOnBMD: function (bmd) {
		bmd.draw(this.base,this.content.x, this.content.y);
		bmd.draw(this.clickMark,this.content.x+this.clickMark.x, this.content.y+this.clickMark.y);
		bmd.draw(this.centMark,this.content.x+this.centMark.x, this.content.y+this.centMark.y);
	//	bmd.draw(this.resPercent,this.content.x+this.resPercent.x, this.content.y+this.resPercent.y);
	},
	calcCircleCoords: function () 
	{
		this.content.x = this.cx + this.rad * Math.sin(this.phase);
		this.content.y = this.cy - this.rad * Math.cos(this.phase);
	},	
	f1: function () {
	},
	
};