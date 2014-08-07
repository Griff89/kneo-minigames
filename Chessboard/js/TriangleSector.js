/**
 * ...
 * @author General
 */

TriangleSector = function(game) {
	this.game = game;
	this.content = null;
	this.base = null;
	this.errSmb = null;
	this.corSmb = null;
	this.txtCont = null;
	this.txtGroup = null;
	
	this.errSmbFr0 = 0;
	this.corSmbFr0 = 0;
	this.baseSmbFr0 = 0;
	
	this.sectorId = 0;
	this.num = 0;
	this.stateId = 0;//0 - готов для нового числа, 1 - один из двух, 2 - только что был нажат

}

TriangleSector.prototype = {
	init: function () {
		this.content = this.game.add.group();
		this.base = this.game.add.sprite(0,0,'PIC_ALL_ART',"TriangleSector0000",this.content);
		this.base.anchor.set(0.5,1);
		this.baseSmbFr0 = this.base.frame;
		this.base.owner = this;
		
		this.errSmb = this.game.add.sprite(0,-90,'PIC_ALL_ART','ErrorSymbol0000', this.content);
		this.errSmb.anchor.set(0.5,0.5);
		this.errSmbFr0 = this.errSmb.frame;
		var ar = [];
		for (var i=0; i<17; i++){
			ar.push(this.errSmbFr0+i);
		}
		this.errSmb.animations.add('play',ar);
		
		
		this.corSmb = this.game.add.sprite(0,-90,'PIC_ALL_ART','FoundItemCheckMark0000', this.content);
		this.corSmb.anchor.set(0.5,0.5);
		this.corSmbFr0 = this.corSmb.frame;
		var ar = [];
		for (var i=0; i<8; i++){
			ar.push(this.corSmbFr0+i);
		}
		this.corSmb.animations.add('play',ar);
		
		
		this.txtGroup = this.game.add.group(this.content);
		this.txtGroup.x = 0;
		this.txtGroup.y = -90;
		this.txtCont = this.game.add.bitmapText (-30, -20, 'PIC_FONT', '2/7', 28,this.txtGroup);
	//	this.txtCont.anchor.set(0.5,0.5);
		
		this.base.inputEnabled = true;
		this.base.events.onInputDown.add(this.onDown, this);
		this.base.events.onInputOut.add(this.onOut, this);
		this.base.input.useHandCursor = true;
	},
	onDown: function () {
		this.content.scale.set(1.05, 1.05);
	},	
	onOut: function () {
		this.content.scale.set(1, 1);
	},
	reset: function (sid) {
		this.txtGroup.rotation = -this.content.rotation;
		this.errSmb.rotation = -this.content.rotation;
		this.corSmb.rotation = -this.content.rotation;
		
		this.txtGroup.visible = false;
		this.errSmb.visible = false;
		this.corSmb.visible = false;
		
		this.errSmb.animations.stop();
		this.corSmb.animations.stop();
		
		this.stateId = sid;
		this.base.frame = this.baseFr0+this.stateId;
	},
	
	showCorrect: function () 
	{
		this.txtGroup.visible = false;
		this.corSmb.visible = true;
		this.corSmb.animations.play('play',30);
		this.stateId = 2;
	},
	
	showWrong: function () 
	{
		this.txtGroup.visible = false;
		this.errSmb.visible = true;
		this.errSmb.animations.play('play',30);
		this.stateId = 2;
	},
	
	showNumber: function (n) 
	{
		//console.log('showNumber '+n);
		this.num = n;
		this.stateId = 1;
		this.errSmb.visible = false;
		this.corSmb.visible = false;
		
		this.errSmb.animations.stop();
		this.corSmb.animations.stop();
		
		this.txtCont.text = this.num.toFixed(0);
		this.txtGroup.visible = true;
		//if (n<100){
			//this.txtGroup.x = -20;
		//}
		//else{
			//this.txtGroup.x = -30;
		//}
		this.txtCont.visible = true;
		//console.log('OK');
	},	
	f2: function () {
	
	},
	f3: function () {
	
	}
}