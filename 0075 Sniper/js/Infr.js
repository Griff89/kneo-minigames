Infr = function(game, sf) {
    this.game = game;
    this.sndFunc = sf;
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
		
		this.content.x = ax;
		this.content.y = ay;
		this.content.orgX = ax;

	//	this.icon.frameName="GenreSideSymbol0019";
	
		
	//this.icon=null;
    //this.bgdFlag = null;
	//this.scoreFlag=null;
	//this.msk=null;
	//
		//this.capTxt=this.game.add.text(0,30,'errors',{fill:"#ffffff", font:"14px Arial", align: "center"},this.content);
		//this.capTxt.anchor.setTo(0.5, 0.5);
        this.scrTxt=this.game.add.bitmapText (73, 52, 'red', '0', 36);
        this.scrTxt.align = 'center';
        this.scrTxt.pivot.x = (this.scrTxt.textWidth / 2);
        this.scrTxt.pivot.y = (this.scrTxt.textHeight / 2);
        this.content.add(this.scrTxt);
	//this.scrTxt=null;		
	},
	
	
	//icid:int, clid:int, str:String, fin:Boolean, maxV:int, maxH
	reset: function (icid, clid, str, fin, maxV, maxH) {
	
		console.log('reset');
		console.log(this);
		console.log(this.isTime);
	//    this.game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
			this.iconId = icid;

			this.colorId = clid;
			this.strName = str;
			this.isFin = fin;
			this.maxValue = maxV;
			this.maxHeight = maxH;

		//	this.isTime = false;
			//isTime = (strName.indexOf('time') != -1);
			
			//flagScore.gotoAndStop(colorId);
			//flagBest.gotoAndStop(colorId);
			
			//if (isFin) {
			//	flagBest.y = -66 + maxHeight;
			//}

			//this.capTxt.text = str;
			this.showScore(0);	
		
	},
	
	addScore: function (scr) {
		this.showScore(this.score+scr);
	},
	
	setNewMax: function (mx) {
		this.maxValue = mx;
		this.showScore(this.score);
	},
	
	showScore: function (scr) {
		this.prevScore = this.score;
		this.score = scr;

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
		
		//score = scr;
		if (!this.isTime) {
			if (this.isFin) {
				this.scrTxt.text = scr.toFixed(0)+'/'+this.maxValue;
			} 
			else{
				this.scrTxt.text = scr.toFixed(0);
			}
		}
		else {
			var s1 = Math.floor(scr / 100);
			var dec = s1 % 10;
			s1 = Math.floor(s1 / 10);
			var sec = s1 % 60;
			var m = Math.floor(s1 / 60);
			if (m > 0) {
				var scrStr = m + ':' + sec + '.' + dec;
			}
			else {
				scrStr = sec + '.' + dec;
			}
			this.scrTxt.text = scrStr;
			
			if (Math.floor(this.prevScore / 500) < Math.floor(this.score / 500)) {
				this.sndFunc('SND_TICK',3);
			}
		}

        setTimeout(function(){
            this.content.x = this.content.orgX - this.scrTxt.textWidth / 2;
        }.bind(this), 20);
	},	
	
	update: function () {
	//    this.game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
	}
}