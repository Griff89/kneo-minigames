Infr = function(game) {
	this.game = game;
	
	this.score = 0;
	this.prevScore = 0;	
	this.content=null;
	this.grp=null;
	this.digSprites=[];
	
	this.isFin = false;
	this.maxValue = 0;
	this.maxWidth = 0;
	this.maxSmallWidth = 0;
	this.expandsRight = false;
	
	this.x0 = 0;
	this.y0 = 0;
};
 
Infr.prototype = {
	init: function (ax, ay){
		this.content = this.game.add.group();
		this.grp = this.game.add.group();
			
		
		this.x0 = this.content.x = ax;
		this.y0 = this.content.y = ay;		
		
		//this.content.x = 0;
		//this.content.y = 0;


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
		//console.log('Infr showScore');
		
		this.score = scr;
		
		var str = ''+scr;
		var digsWidthChanged=false;
		if (str.length!=this.digSprites.length){
			digsWidthChanged = true;
		}
		for (var i=0; i<str.length; i++){
			
			var k = 0+str[i];
			//console.log(i+' '+k+' ');
			//console.log(this.content);
			if (i<this.digSprites.length){
				this.digSprites[i].frame = 9-k;
			}
			else{
				this.digSprites[i] = this.game.add.sprite(this.x0+58*i,this.y0,'PIC_DIG_FONT',9-k,this.grp);
				this.digSprites[i].anchor.setTo(0,1);
			}
			//console.log(this.digSprites[i].x+' '+this.digSprites[i].y+' '+this.digSprites[i].visible);
			//console.log(this.content.x+' '+this.content.y+' '+this.content.visible);
			
			this.digSprites[i].visible = true;
		}
		//console.log(this.digSprites);
		if (this.digSprites.length>str.length){
			for (var i=str.length; i<this.digSprites.length; i++){
				this.digSprites[i].visible = false;
			}
		}
		
		if (digsWidthChanged){
			var w = ((str.length==1)?this.maxWidth:this.maxSmallWidth);
			this.content.scale.set(w/(58*str.length));
			
			if (!this.expandsRight){
				this.content.x = ((str.length==1)?this.x0:this.x0-20);//TODO: жёстко забито пока
			}
			
		}
	},	
	
	update: function () {
	//    this.game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
	}
}