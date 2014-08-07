ScoreScreen = function(game, resFn) {
		this.game=game;
		this.resFn = resFn;
		
		this.content=null;
		
		this.bgd=null;
		this.capSpr=null;
		this.scrTxt=null;
		this.resBtn = null;
};

ScoreScreen.prototype = {
	init: function (){	
		this.content = this.game.add.group();
		this.content.visible = false;
		
		this.bgd = this.game.add.sprite(0,0,'PIC_BGD');
		this.bgd.alpha = 0.8;
		this.capSpr = this.game.add.sprite(320,60,'PIC_LVL_END');
		this.scrTxt=this.game.add.text(233,100,'Your score:',{fill:"#ffffff", font:"36px Arial", align: "left"});
		this.resBtn=this.game.add.button(320,377,'PIC_RESTART_BTN',this.resFn,this,1,0,2);
		//TODO: как обратиться к самостоятельно дописанной функции из game
		//console.log('resetClick button created');
		
		this.content.add(this.bgd);
		this.content.add(this.capSpr);
		this.content.add(this.scrTxt);
		this.content.add(this.resBtn);
		
		this.capSpr.anchor.setTo(0.5, 0.5);
		this.resBtn.anchor.setTo(0.5, 0.5);
		
		
	},
	
	
	show: function (scr) {
		//console.log()
		this.scrTxt.text = 'Your score: '+scr;
		this.content.visible = true;

        if (parent.window.kw && parent.window.app && parent.window.app.getMediator) {
            parent.window.app.getMediator().trigger('onSetScore', 72, +scr);
        }
	},
	
	hide: function () {
		this.content.visible = false;
	},
	
	update: function () {
	
		
	}
}