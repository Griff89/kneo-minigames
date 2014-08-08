/**
 * ...
 * @author General
 */

MovedBlock = function(game) {
	this.game = game;
	this.base = null;
	this.baseFr0 = 0;
	this.twn = null;
}

MovedBlock.prototype = {
	init: function(w){
		this.base = this.game.add.sprite(0,0,'PIC_ALL_ART',"MovedBlockBase0000");
		this.baseFr0 = this.base.frame;
		this.base.anchor.setTo(0.5, 0);
		this.setWidth(w);
	},
	setWidth: function(w){
		this.base.width = w;
	},
	reAppear: function(w){
		this.base.frame = this.baseFr0+Math.floor(Math.random() * 4);
		this.setWidth(w);
	//	cacheAsBitmap = true;
		this.base.alpha = 0;
		this.base.x = Routines.prototype.RandomNumberFromTo(80+w / 2,  640 - 80 - w/2);
		this.base.y = 65;
		this.twn = this.game.add.tween(this.base);
		this.twn.to({alpha:1}, 130);
		this.twn.start();
		
	//	//console.log('reAppear '+this.base.x.toFixed(0)+' '+w );
	},
	getBoundsTo: function(rct){	
		rct.x = this.base.x - this.base.width/2;
		rct.y = this.base.y;
		rct.width = this.base.width;
		rct.height = this.base.height;
	}
}