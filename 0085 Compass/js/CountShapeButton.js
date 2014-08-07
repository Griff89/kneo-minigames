/**
 * ...
 * @author General
 */

CountShapeButton = function(game) {
	this.game = game;
	this.content=null;
	
	this.msk=null;
	this.mskFr0=0;
	this.brd=null;
	this.brdFr0=0;
	this.txt=null;
	this.errSmb=null;
	this.errSmbFr0=null;
	this.corSmb=null;
	this.corSmbFr0=null;
	
	this.willBCorrect = false;
	this.borderId = 0;
	//this.numFilter:GlowFilter;
	this.numY0 = 0;//
}

CountShapeButton.prototype = {
	init: function () {
		this.content = this.game.add.group();
		
		this.msk = this.game.add.sprite(0,0,'PIC_ALL_ART',"GeomMask0000",this.content);
		this.msk.anchor.setTo(0.5, 0.5);
		this.mskFr0 =this.msk.frame;	
		this.msk.scale.set(0.75, 0.75);
		this.msk.owner = this;
		
		this.brd = this.game.add.sprite(0,0,'PIC_ALL_ART',"GeomBorder0000",this.content);
		this.brd.anchor.setTo(0.5, 0.5);
		this.brd.scale.set(0.75, 0.75);
		this.brdFr0 = this.brd.frame;
		
		this.txt = this.game.add.text(0,0,'555',{align:"center", fill:"#46280E", font:"36px Arial"},this.content);
		this.txt.anchor.setTo(0.5, 0.5);
		this.numY0 = this.txt.y;
		
		this.errSmb = this.game.add.sprite(10,-10,'PIC_ALL_ART',"ErrorSymbol0000",this.content);
		this.errSmb.anchor.setTo(0.5, 0.5);
		this.errSmbFr0 = this.errSmb.frame;
		var errAnimArray = [];
		for (var i=0; i<17; i++){errAnimArray.push(this.errSmbFr0+i)};
		this.errSmb.animations.add('appear',errAnimArray);
		
		this.corSmb = this.game.add.sprite(10,-10,'PIC_ALL_ART',"FoundItemCheckMark0000",this.content);
		this.corSmb.anchor.setTo(0.5, 0.5);
		this.corSmbFr0 = this.corSmb.frame;
		var corrAnimArray = [];
		for (var i=0; i<8; i++){corrAnimArray.push(this.corSmbFr0+i)};
		this.corSmb.animations.add('appear',corrAnimArray);
		
		this.setOut();
	},
	f1: function () {
	},
	
	setOut: function () 
	{
		this.txt.y = this.numY0;
	//	txt.filters = [];
		this.msk.alpha = 0.7;
	},
	
	setOver: function () 
	{
		this.txt.y = this.numY0;
	//	txt.filters = [numFilter];
		this.msk.alpha = 0.85;			
	},
	
	setDown: function ()
	{
		this.txt.y = this.numY0+2;
	//	txt.filters = [numFilter];
		this.msk.alpha = 1;			
	},	
	
	setBorder: function (bid) {
		this.borderId = bid;
		this.brd.frame = this.brdFr0+bid;
		this.msk.frame = this.mskFr0+bid;
	},
	
	showCorrect: function () {
		this.corSmb.visible = true;
		this.corSmb.animations.play('appear');			
	},
	
	showWrong: function () {
		this.errSmb.visible = true;
		this.errSmb.animations.play('appear');			
	},
	
	sleep: function () {
		this.txt.visible = false;
	//	mouseEnabled = false;
		this.errSmb.animations.stop();
		this.corSmb.animations.stop();
		this.errSmb.visible = false;
		this.corSmb.visible = false;
		this.setOut();
	},
	
	awake: function (num, willBCorr) {
		this.willBCorrect = willBCorr;
		this.txt.text = num.toFixed(0);
		this.txt.visible = true;
	//	mouseEnabled = true;
	}	
	
}