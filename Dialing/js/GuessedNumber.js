GuessedNumber = function(game) { 
    this.game = game;
	this.content=null;
    this.bgdSprite = null;
	this.resSmb=null;
	this.arId=0;
	this.num=0; 
	this.btnWidth=171;
	this.btnScl=1;
};
 
GuessedNumber.prototype = {
 
	
	preload: function () {
	//    this.game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
	},
	
	init: function (id) {
		
		this.content=this.game.add.group();
		
		this.arId=id;
		
		this.bgdSprite = this.game.add.sprite(0, 0, 'PIC_GUESSED_NUM', id);
		this.bgdSprite.anchor.setTo(0.5, 0.5);
		this.content.add(this.bgdSprite);
	
		this.resSmb = this.game.add.sprite(10, 10, 'PIC_GUESS_RES');
		this.content.add(this.resSmb);
		
		this.resSmb.visible=false;
		this.content.visible=false;		
	},
	
	clear: function() {
		this.resSmb.visible=false;
		this.bgdSprite.frame=11;
	},
		
	
	setScale: function(scl) {
		this.content.scale.set(scl);
		
		this.btnScl=scl;
	},
	
	setCoordsInLine: function(id, tot) {
		this.content.x = 500 + (this.btnScl*this.btnWidth+ 1) * (0.5 + id - tot * 0.5);
		this.content.y = 240;
		
		this.content.visible = true;
	},
	
	showNewRandomNumber: function() {
		this.num = Math.floor(Math.random() * 10);
		this.bgdSprite.frame = 9-this.num;	
	},
	
	showQuestionMark: function() {
		this.bgdSprite.frame = 10;
	},
	
	showDialResult: function(n) {
		var b;
		if (n==this.num){
			b=true;
			this.resSmb.frame=0;
		}
		else{
			b=false;
			this.resSmb.frame=1;
		}
		this.bgdSprite.frame = 9-this.num;
		this.resSmb.visible=true;
		return (b);
	},
	
	update: function() {
		
	}	
	//update: function() {
		//
	//}
	
};