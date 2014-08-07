/**
 * ...
 * @author General
 */

SearchTask = function(game) {
	this.game = game;
	this.content = null;
	this.bgd = null;

	this.itemBGD = null;
	this.itemSample = null;
	this.itemFr0 = 0;
	
	this.findId = 0;
	this.findNum = 0;
	
	this.dg1 = null;
	this.dg2 = null;
}

SearchTask.prototype = {
	init: function () {
		this.content = this.game.add.group();
	//	this.bgd = this.game.add.sprite(0,0,'PIC_SIL_ART','FindThis0000',this.content);
		
		this.itemBGD = this.game.add.sprite(280,60,'PIC_BALL_BASE',0,this.content);
		this.itemBGD.anchor.setTo(0.5,0.5);		
		
		this.itemSample = this.game.add.sprite(280,60,'PIC_BALL_INNER',0,this.content);
		this.itemSample.anchor.setTo(0.5,0.5);
		this.itemFr0 = this.itemSample.frame;
		
		this.dg1 = this.game.add.sprite(370,50,'PIC_DIG_FONT_2',0,this.content);
		this.dg2 = this.game.add.sprite(370+35,50,'PIC_DIG_FONT_2',0,this.content);
	
	
		this.content.x = 0;
		this.content.y = 0;
	},
	showNewTask: function (itm, n) {
		//console.log('showNewTask');
		this.itemSample.frame = this.itemFr0+itm;

		
		this.findId = itm;
		this.findNum = n;
		this.showNum(this.findNum);
	},
	fixFound: function () {
		this.findNum--;
		this.showNum(this.findNum);
	},
	showNum: function (n) {
		
		var s = n.toFixed(0);
		
		if (s.length==1){
			this.dg1.frame = 9-n;
			this.dg2.visible = false;		
		}
		else{
			this.dg2.frame = 9-(n%10);
			this.dg2.visible = true;		
			this.dg1.frame = 9-Math.floor(n/10);
		}
		
	}
}