/**
 * ...
 * @author General
 */

ClickMarker = function(game) {
	this.game = game;
	this.score = 0;
	this.tScore = 0;
	this.dScore = 0;
	
	this.hitRating = 0;
	
	this.content = null;
	this.clickMark = null;
	this.centMark = null;
	this.star = null;
	this.bLine = null;
	this.resPercent = null;//text
}

ClickMarker.prototype = {
	init: function () {
		this.content = this.game.add.group();
		this.content.visible = false;
		this.star = this.game.add.sprite(0,0,'PIC_ALL_ART','DottedStar0000',this.content);
		this.star.anchor.setTo(0.5, 0.53);
		
		this.clickMark = this.game.add.sprite(0,0,'PIC_ALL_ART','CLickedMark0000',this.content);
		this.clickMark.anchor.setTo(0.5, 0.5);
		
		this.centMark = this.game.add.sprite(0,0,'PIC_ALL_ART','CentreMark0000',this.content);
		this.centMark.anchor.setTo(0.5, 0.5);
		
		this.bLine = this.game.add.sprite(0,0,'PIC_ALL_ART','BasicAimingLine0000',this.content);
		this.bLine.anchor.setTo(0.5, 0);
		
		this.resPercent = this.game.add.text(0,0,'100',{font: "24px Arial", fill:'#ffffff'},this.content);
		this.resPercent.anchor.setTo(0.5, 0.5);
	},
	show: function (sx, sy, cx, cy, dt, rot, shownId) {
			if (this.twbLine){this.twbLine.stop()}
			if (this.twn){this.twn.stop()}
		
			this.content.x = sx;
			this.content.y = sy;
			
			this.centMark.x = 0;
			this.centMark.y = 0;
			
			this.star.x = 0;
			this.star.y = 0;
			this.star.rotation = rot;
			
			this.clickMark.x = cx - sx;
			this.clickMark.y = cy - sy;	
			
			this.bLine.x = this.clickMark.x;
			this.bLine.y = this.clickMark.y;
			
			
			
			var d = Routines.prototype.GetDistanceBetween(sx, sy, cx, cy);
			
			var rot1 = Routines.prototype.FindDirectionInDegrees(cx, cy, sx, sy);
			
			this.bLine.angle = 0;
			this.bLine.scale.set(1,0);
			this.bLine.angle = rot1+180;
			
			this.twbLine = this.game.add.tween(this.bLine.scale);
			this.twbLine.to({y:d/500},250);
			this.twbLine.start();
			
			this.tScore = dt;
			this.dScore = d;			
			if (shownId == 0) {
				//reaction
				this.score = Routines.prototype.calcFindShapeScore(this.tScore) * 3 / 7;
				if (this.dScore >= 15) {
					this.score *= (15 / this.dScore);
				}
			}
			else {
				//memory
				this.score = Routines.prototype.calcStarMemScore(this.dScore);
				if (this.tScore > 2000) {
					this.score *= (2000 / this.tScore);
				}
			}
			
			//trace('STAR SCORE:', score);
			this.hitRating = Math.floor((30 - this.score) / 5);
			
			this.resPercent.setText('+'+this.score.toFixed(0));// int(d).toString() + ' ' + dt.toString();
			this.resPercent.x = (cx - sx) / 2 ;
			this.resPercent.y = (cy - sy) / 2 ;	
			
			
		//	trace('time::', dt);
		//	trace('distance:', d);

			
			this.content.alpha = 1;
			
			this.twn = this.game.add.tween(this.content);
			this.twn.to({alpha:0},160,Phaser.Easing.Linear.None,true,1000);
			
			
			this.content.visible = true;
	},
	hide: function () {
		this.content.visible = false;
	}
}