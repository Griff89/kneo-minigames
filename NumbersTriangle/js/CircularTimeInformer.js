/**
 * ...
 * @author General
 */

CircularTimeInformer = function(game, sndFunc) {
	this.game = game;
	this.soundFunc = sndFunc;
	this.sprite = null;
	this.spriteFr0 = 0;
	this.totalFrames = 0;
	
	
}

CircularTimeInformer.prototype = {
	init: function () {
		this.sprite = this.game.add.sprite(500,403,'PIC_ALL_ART',"CircularTimeInformer0000");
		this.sprite.anchor.setTo(0.5, 0.5);
		this.spriteFr0 = this.sprite.frame;
		this.totalFrames = 13;
		
	},
	showPercent: function (p) {
			var fr = this.sprite.frame;
			var n = ((p == 1)?(this.totalFrames - 1):(Math.floor(p * this.totalFrames)));
			this.sprite.frame = this.spriteFr0 + n;
			if (fr < this.sprite.frame) {
				this.soundFunc('SND_TICK',3);
			}	
	},
	f3: function () {
	
	}
}