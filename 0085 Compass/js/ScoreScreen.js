ScoreScreen = function(game, resFn) {
		this.game=game;
		this.resFn = resFn;
		
		this.content=null;
		
		this.bgd=null;
		this.plank=null;
		this.capSpr=null;
		this.scrTxt=null;
		this.resBtn = null;
};

ScoreScreen.prototype = {
	init: function (){	
		this.content = this.game.add.group();
		this.content.visible = false;
		
		var bmd = this.game.add.bitmapData(1000,750);
		bmd.ctx.beginPath();
		bmd.ctx.rect(0,0,1000,750);
		bmd.ctx.fillStyle = '#ffffff';
		bmd.ctx.fill();					
		this.bgd = this.game.add.sprite(0, 0, bmd, null,this.content);
		this.bgd.alpha=0.75;
		this.bgd.inputEnabled = true;		
		

		this.plank = this.game.add.sprite(50,100,'PIC_PRESTART_PANEL', null,this.content);
		this.plank.scale.set(0.68,0.68);
		
		this.capSpr = this.game.add.sprite(340,60,'PIC_LVL_END',null,this.content);

		
		
		this.scrTxt = this.game.add.text(375, 218,'Your score:',
							{fill:"#991e01", font:"45px Arial", align: "center"},this.content);
		this.scrTxt.anchor.setTo(0.5, 0.5);		
		
		
		this.resBtn=this.game.add.button(340,377,'PIC_RESTART_BTN',this.resFn,this,1,0,2);
		//TODO: как обратиться к самостоятельно дописанной функции из game
		//console.log('resetClick button created');
		
		this.content.add(this.bgd);
		this.content.add(this.plank);
		this.content.add(this.capSpr);
		this.content.add(this.scrTxt);
		this.content.add(this.resBtn);
		
		this.capSpr.anchor.setTo(0.5, 0.5);
		this.resBtn.anchor.setTo(0.5, 0.5);
		
		
	},
	
	
	show: function (scr) {
		//console.log('show '+scr);
		//console.log(scr.toFixed(0));
		
		this.scrTxt.setText('Your score: '+scr.toFixed(0));
		this.content.visible = true;

        this.game.world.bringToTop(this.content);
		setGameScore(PLAYER_ID, +scr);
	},
	
	hide: function () {
		this.content.visible = false;
	},
	
	update: function () {
	
		
	}
}