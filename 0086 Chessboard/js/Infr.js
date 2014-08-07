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
		
		this.flagsBMD = this.game.add.bitmapData(54,145);

		this.content.x = ax;
		this.content.y = ay;
        this.content.orgX = ax;

        this.scrTxt=this.game.add.bitmapText (0, 0, 'PIC_FONT2','0000');
        this.scrTxt.align = 'center';
        this.scrTxt.pivot.x = (this.scrTxt.textWidth / 2);
        this.scrTxt.pivot.y = (this.scrTxt.textHeight / 2);
        this.content.add(this.scrTxt);

	},
	
	
	//icid:int, clid:int, str:String, fin:Boolean, maxV:int, maxH
	reset: function (icid, clid, str, fin, maxV, maxH) {
	
		//console.log('reset');
		//console.log(this);
		//console.log(this.isTime);
	//    this.game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
			this.iconId = icid;

			this.colorId = clid;
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
			
			//if (m > 0) {
				//var scrStr = m + ':' + ((sec<10)?('0'+sec):sec) + '.' + dec;
			//}
			//else {
				//scrStr = sec + '.' + dec;
			//}
			scrStr = m + ':'+ ((sec<10)?('0'+sec):sec)+ ' ' + dec;
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