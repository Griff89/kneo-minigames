Infr = function(game) {
    this.game = game;
	this.iconId = 0;
	this.colorId = 0;
	this.strName = '';
	this.isFin = false;
	this.maxValue = 0;
	this.maxHeight = 0;
	
	this.isTime = false;
	this.score = 0;
	this.prevScore = 0;
	
	this.content=null;
	
	this.icon=null;
    this.bgdFlag = null;
	this.scoreFlag=null;
	this.flagsBMD=null;
	this.flagsSprite=null;
	
	this.capTxt=null;
	this.scrTxt=null;
};
 
Infr.prototype = {
	init: function (ax, ay){
		this.content = this.game.add.group();
	//	this.content.visible = false;
		
		//this.bgdFlag = this.game.add.sprite(0,0,'PIC_SCORE_FLAG')
		//this.bgdFlag.anchor.setTo(0.5, 0);
		//this.bgdFlag.y = -50;
		//this.bgdFlag.alpha= 0.5;
	//	this.content.add(this.bgdFlag);		
		
		//this.scoreFlag = this.game.add.sprite(0,0,'PIC_SCORE_FLAG');
		//this.scoreFlag.anchor.setTo(0.5, 0);
		//this.scoreFlag.y = -120;
	//	this.content.add(this.scoreFlag);
	
	

		
		this.flagsBMD = this.game.add.bitmapData(54,145);
		//this.flagsSprite=this.game.add.sprite(0, 0, this.flagsBMD);
		
		//this.flagsSprite.anchor.setTo(0.5, 0);
	//	this.content.add(this.flagsSprite);
		
		//TODO: как рисовать спрайт в битмапдату
		//this.flagsBMD.context.drawImage(this.flagsSprite,0,0);//??
		
		
		//this.flagsBMD.ctx.beginPath();
		//this.flagsBMD.ctx.rect(0,0,54,145);
		//this.flagsBMD.ctx.fillStyle = '#ff0000';
		//this.flagsBMD.ctx.fill();
		//this.flagsBMD.dirty = true;

		this.icon = this.game.add.sprite(-10,-25,'PIC_GENRE_ICONS');
		this.icon.anchor.setTo(0.5, 0.5);
		this.content.add(this.icon);		
		
		this.content.x = ax;
		this.content.y = ay;
		
	//	this.icon.frameName="GenreSideSymbol0019";
	
		
	//this.icon=null;
    //this.bgdFlag = null;
	//this.scoreFlag=null;
	//this.msk=null;
	//
		this.capTxt=this.game.add.text(0,30,'errors',{fill:"#ffffff", font:"14px Arial", align: "center"},this.content);
		this.capTxt.anchor.setTo(0.5, 0.5);
		this.scrTxt=this.game.add.text(0,50,'2/7',{fill:"#ffffff", font:"14px Arial", align: "center"},this.content);
		this.scrTxt.anchor.setTo(0.5, 0.5);
	//this.scrTxt=null;		
	},
	
	
	//icid:int, clid:int, str:String, fin:Boolean, maxV:int, maxH
	reset: function (icid, clid, str, fin, maxV, maxH) {
	
		//console.log(this);
	//    this.game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
			this.iconId = icid;
			
			this.icon.frame = this.iconId;
			this.colorId = clid;
			this.strName = str;
			this.isFin = fin;
			this.maxValue = maxV;
			this.maxHeight = maxH;

			this.isTime = false;
			//isTime = (strName.indexOf('time') != -1);
			
			//flagScore.gotoAndStop(colorId);
			//flagBest.gotoAndStop(colorId);
			
			//if (isFin) {
			//	flagBest.y = -66 + maxHeight;
			//}

			this.capTxt.text = str;
			this.showScore(0);	
		
	},
	
	addScore: function (scr) {
		this.showScore(this.score+scr);
	},
	
	showScore: function (scr) {
		this.score = scr;
		if (this.isFin) {
			this.scrTxt.text = scr+'/'+this.maxValue;
		} 
		else{
			this.scrTxt.text = scr;
		}
		//if (isFin) {
			//var h:int = scr * maxHeight / maxValue;
		//}
		//else {
			//if (scr <= maxValue / 2) {
				//h = scr * maxHeight / maxValue;
			//}
			//else {
				//h = (maxHeight / 2) * (1 + (1 - Math.exp(1 - score / (maxValue / 2))));
			//}				
		//}
		//flagScore.y = -66 + h;
		//prevScore = score;
		//score = scr;
		//if (!isTime) {
			//scrTxt.text = score.toString();
			//if (isFin) {
				//scrTxt.text += '/' + maxValue;
			//}
		//}
		//else {
			//var s1:int = scr / 100;
			//var dec:int = s1 % 10;
			//s1 = s1 / 10;
			//var sec:int = s1 % 60;
			//var m:int = s1 / 60;
			//if (m > 0) {
				//var scrStr:String = m.toString() + ':' + sec.toString() + '.' + dec.toString();
			//}
			//else {
				//scrStr = sec.toString() + '.' + dec.toString();
			//}
			//scrTxt.text = scrStr;
			//
			//if (int(prevScore / 500) < int(score / 500)) {
				//SoundPlayer.PlayASoundID(SoundPlayer.SND_TICK);
			//}
		//}	
	},	
	
	update: function () {
	//    this.game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
	}
}