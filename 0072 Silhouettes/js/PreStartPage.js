/**
 * ...
 * @author General
 */

PreStartPage = function(game, startCb) {
	this.game = game;
	this.content = null;
	this.startCallback = startCb;
}

PreStartPage.prototype = {
	init: function (txt) {
		this.content=this.game.add.group();		
	//	//console.log(game.add);
	//	//console.log(preStartPage);
		var bmd = this.game.make.bitmapData(1000,750);
		bmd.ctx.beginPath();
		bmd.ctx.rect(0,0,1000,750);
		bmd.ctx.fillStyle = '#ffffff';
		bmd.ctx.fill();					
		this.bgdTrans = this.game.add.sprite(0, 0, bmd, null,this.content);
		this.bgdTrans.alpha=0.75;
		this.bgdTrans.inputEnabled = true;
		//	nt.body.input.start(0, true);
	//	
		this.prePanel = this.game.add.sprite(50,100,'PIC_PRESTART_PANEL', null,this.content);
		this.prePanel.scale.set(0.68,0.68);
		
		this.boy = this.game.add.sprite(1026,141,'PIC_GAME_DESIGNER',null, this.content);
		
		this.button = this.game.add.button(375, 356, 'PIC_BIG_BTN_BASE', this.startClick, this, 0, 1, 2, null,this.content);
		this.button.anchor.setTo(0.5, 0.5);
		this.button.input.useHandCursor = true;
	
		this.btnCap = this.game.add.sprite(375,356,'PIC_BTN_CAPTION', null, this.content);
		this.btnCap.anchor.setTo(0.5, 0.5);
		
		this.explCap = this.game.add.text(375, 124,txt,
							{fill:"#991e01", font:"40px Arial", align: "center", wordWrap: true, wordWrapWidth: 590}
							,this.content);
		this.explCap.anchor.setTo(0.5, 0);
		
		//#991e01 - цвет заголовка, Voces Regular, 45
		
	},
	startClick: function () {
		this.startCallback();
	},	
	hide: function () {
		this.content.visible = false;
	},	
	show: function () {
		this.boy.x = 1026;
		this.content.visible = true;
		this.game.add.tween(this.boy).to({x:566},1000, Phaser.Easing.Linear.None, true, 0, 0,false);
		
	},
	f3: function () {
	
	}
}