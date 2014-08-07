Infr = function(game) {
	this.game = game;
	
	this.score = 0;
	this.prevScore = 0;	
	this.content=null;
	this.digSprites=[];
	
	this.isFin = false;
	this.maxValue = 0;
	this.maxWidth = 0;
	this.maxSmallWidth = 0;
	this.expandsRight = false;
	
	this.x0 = 0;
};
 
Infr.prototype = {
	init: function (ax, ay){
		this.content = this.game.add.group();
			
		
		this.x0 = this.content.x = ax;
		this.content.y = ay;


	//this.scrTxt=null;		
	},
	
	
	//icid:int, clid:int, str:String, fin:Boolean, maxV:int, maxH
	reset: function (str, fin, maxV, maxW, maxW2, expRight) {
		//console.log(this);

		this.isFin = fin;
		this.maxValue = maxV;
		this.maxWidth = maxW;
		
		this.maxSmallWidth = maxW2;
		this.expandsRight = expRight;
		
		this.showScore(0);	
		
	},
	
	addScore: function (scr) {
		this.showScore(this.score+scr);
	},
	
	showScore: function (scr) {
		this.score = scr;
		
		var str = ''+scr;
		var digsWidthChanged=false;
		if (str.length!=this.digSprites.length){
			digsWidthChanged = true;
		}
		for (var i=0; i<str.length; i++){
			var k = 0+str[i];
			if (i<this.digSprites.length){
				this.digSprites[i].frame = 9-k;
			}
			else{
				this.digSprites[i] = this.game.add.sprite(i*60,0,'PIC_DIG_FONT',9-k, this.content);
				this.digSprites[i].anchor.setTo(0,1);
			}
			this.digSprites[i].visible = true;
		}
		
		if (this.digSprites.length>str.length){
			for (var i=str.length; i<this.digSprites.length; i++){
				this.digSprites[i].visible = false;
			}
		}
		
		if (digsWidthChanged){
			var w = ((str.length==1)?this.maxWidth:this.maxSmallWidth);
			this.content.scale.set(w/(60*str.length));
			
			if (!this.expandsRight){
				this.content.x = ((str.length==1)?this.x0:this.x0-20);//TODO: жёстко забито пока
			}
			
		}
	},	
	
	update: function () {
	//    this.game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
	}
}