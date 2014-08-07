/**
 * ...
 * @author General
 */

MovedBlock = function(game) {
	this.game = game;
	this.base = null;
	this.baseL = null;
	this.baseR = null;
	this.baseMid = null;
	this.baseBMD = null;
	this.base = null;
	this.baseFr0 = 0;
	this.baseWidth = 0;
	this.twn = null;
}

MovedBlock.prototype = {
	init: function(w){
		//this.base = this.game.add.sprite(0,0,'PIC_ALL_ART',"MovedBlockBase0000");
		this.baseBMD = this.game.make.bitmapData(600,60);
		this.baseL = this.game.make.sprite(0,0,'PIC_BLOCK',0);
		this.baseMid = this.game.make.sprite(0,0,'PIC_BLOCK',1);
		this.baseR = this.game.make.sprite(0,0,'PIC_BLOCK',2);
		
	//	this.base = this.game.add.sprite(0,0,'PIC_BLOCK',1);
		this.base = this.game.add.sprite(0,0,this.baseBMD);
	//	this.baseFr0 = this.base.frame;
	//	this.base.anchor.setTo(0.5, 0);
		this.setWidth(w);
	},
	setWidth: function(w){
		this.baseWidth = w;
		
		this.baseBMD.clear();
		if (w>8){
			this.baseBMD.draw(this.baseL,0,0);
			this.baseBMD.draw(this.baseR,w-4,0);
			this.baseBMD.draw(this.baseMid,4,0,w-8,this.baseMid.height);
		}
		else{
			this.baseBMD.draw(this.baseMid,0,0,w,this.baseMid.height);
		}		
		
	//	this.base.width = w;
	},
	reAppear: function(w){
		var fr = 3*Math.floor(Math.random() * 4)
		
		this.baseL.frame = 0+fr;
		this.baseMid.frame = 1+fr;
		this.baseR.frame = 2+fr;
		
		this.setWidth(w);
	//	cacheAsBitmap = true;
		this.base.alpha = 0;
	//	this.base.x = Routines.prototype.RandomNumberFromTo(200+w / 2,  1000 - 200 - w/2);
		this.base.x = Routines.prototype.RandomNumberFromTo(200, 1000 - 200 - w);
		
		this.base.y = 65;
		this.twn = this.game.add.tween(this.base);
		this.twn.to({alpha:1}, 130);
		this.twn.start();
		
	//	//console.log('reAppear '+this.base.x.toFixed(0)+' '+w );
	},
	getBoundsTo: function(rct){
		rct.x = this.base.x;
		rct.y = this.base.y;
		rct.width = this.baseWidth;
		rct.height = this.base.height;
	}
}