/**
 * ...
 * @author General
 */
DroppingBlockFragment = function(game) {
	this.game = game;
	this.twn = null;//:UltimateTweener;
	this.bmd = null;//:BitmapData;
	this.bmp = null;//:Bitmap;
	this.mtrx = null;//:Matrix;	
	this.rct  = null;
}

DroppingBlockFragment.prototype = {
	init: function(mw, mh){
		this.rct = new Phaser.Rectangle();
		//twn = new UltimateTweener();
		//twn.addEventListener(Event.COMPLETE, onTweenComplete);
		this.bmd = this.game.add.bitmapData(mw, mh);//, true, 0);
		this.bmp = this.game.add.sprite(0,0,this.bmd);		
		
		//this.bmd2 = this.game.add.bitmapData(mw, mh);//, true, 0);
		//this.bmd2.fill(88,88,88,88);
		//this.bmp2 = this.game.add.sprite(0,0,this.bmd2);
		//addChild(bmp);
		
		//mtrx = new Matrix();
	},
	onTweenComplete: function(){

	},
	showFallingPart: function(mbRCT, mbBMD, isLeft, dist){//:MovedBlock
		//console.log('showFallingPart');
		this.bmp.angle = 0;
		this.bmp.alpha = 1;
		
		//bmd.fillRect(bmd.rect, 0);
		
		this.rct.copyFrom(mbRCT);
		this.rct.x = 0;
		this.rct.y = 0;
		//mtrx.identity();
		//mtrx.translate( -rct.left, -rct.top);
		//rct.x = 0;
		//rct.y = 0;
		
		if (isLeft) {
			this.rct.width = dist;
		}
		else {
			this.rct.x=this.rct.right-dist;
		}
		this.bmd.clear();
	//	this.bmd.fill(255,255,255,255);
		this.bmd.copyPixels(mbBMD, this.rct, 0,0);//mtrx, null, null, rct);
		this.bmp.x = -(this.rct.left + this.rct.right) / 2;
		
		this.bmp.y = mbRCT.y;
		if (isLeft) {
			this.bmp.x = mbRCT.x;// - mbRCT.width / 2 + this.rct.width / 2;
		}
		else {
			this.bmp.x = mbRCT.right-dist;// - this.rct.width;
		}
		
		this.bmp.visible = true;
		//console.log(this.bmp);
		//console.log(this.rct);
		//console.log(mbRCT);
		
	//	this.bmp.x = 10;
	//	this.bmp.y = 10;
	//	this.bmd.fill(255,255,255,255);
	//	this.bmd.dirty = true;		
	//	
	//	this.bmp2.x = 10;
	//	this.bmp2.y = 10;
	//	this.bmd2.fill(255,255,255,255);
	//	this.bmd2.dirty = true;
		this.twn = this.game.add.tween(this.bmp);
		this.twn.to({x:(isLeft?(this.bmp.x - 20):(this.bmp.x + 50)), y:(this.bmp.y + 200), angle:(isLeft? -180:180), alpha:0},500);
		this.twn.start();

	},
	f1: function(){

	},
	f2: function(){

	}
}