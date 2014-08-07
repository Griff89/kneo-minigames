/**
 * ...
 * @author General
 */

GeomShape = function(game, grp) {
	this.game = game;
	this.bigGroup = grp;
	this.content=null;
	
	this.bgd=null;
	this.bgdFr0=0;
	
	this.brd=null;
	this.brdFr0=0;
	
	this.cover=null;
	this.coverFr0=null;
	
	this.shapeId = 0;
	this.colorId = 0;
	
	this.shapesNum = 5;
	this.colorsNum = 7;
	
	this.twn = null;
	this.coverTwn = null;
	this.coverDelayedActionId = 0;//0 - nothing, 1 - show true, 2 - show wrong
	
	this.hideAfterWrong = false;
	
	this.isCovered = false;
	this.isHit = false;
	
	this.isGuessed = false;
}

GeomShape.prototype = {
	init: function () {
		this.content = this.game.add.group(this.bigGroup);
		this.content.visible = false;
		
		this.bgd = this.game.add.sprite(0,0,'PIC_ART_GEOM','NoteInner0000',this.content);
		this.bgd.anchor.setTo(0.5, 0.5);
		this.bgdFr0 = this.bgd.frame;
		this.bgd.owner = this;
		
	
		
		
		this.brd = this.game.add.sprite(0,0,'PIC_ART_GEOM','GeomBorder0000',this.content);
		this.brd.anchor.setTo(0.5, 0.5);
		this.brd.scale.set(0.65,0.65);
		this.brdFr0 = this.brd.frame;	
		
		this.cover = this.game.add.sprite(0,0,'PIC_ART_GEOM','GeomHider0008',this.content);
		this.cover.anchor.setTo(0.5, 0.5);
		this.coverFr0 = this.cover.frame;
	//	this.cover.animations.add('show',[this.coverFr0,this.coverFr0+1,this.coverFr0+2,this.coverFr0+3,
	//									this.coverFr0+4,this.coverFr0+5,this.coverFr0+6,this.coverFr0+7,this.coverFr0+8]);
										
	//	this.cover.animations.add('hide',[this.coverFr0+8,this.coverFr0+7,this.coverFr0+6,this.coverFr0+5,
	//									this.coverFr0+4,this.coverFr0+3,this.coverFr0+2,this.coverFr0+1,this.coverFr0]);
		//this.cover.animations.onComplete.add(this.onHiderComplete, this)
		//TODO: animation onComplete
		
	},
	onHiderComplete: function () {
		this.cover.frame = this.coverFr0+8;
	},
	onTweenComplete: function () {
		this.correctCallBack();
	},
	onCoverComplete: function () {
		switch(coverDelayedActionId) {
			case 0: {
				break;
			}
			case 1: {
				this.cover.visible = false;
				this.getHit();
				this.correctCallBack();
				break;
			}
			case 2: {
				this.cover.visible = false;
				this.showWrong();
				break;
			}
		}		
	},
	resetShapeAndColor: function (shid, cid) {
		//console.log('resetShapeAndColor '+shid+' '+cid);
		if (shid != 0) {
			this.shapeId = shid;
		}
		else {
			this.shapeId = Math.floor(1 + Math.random() * this.shapesNum);
		}

		if (cid != 0) {
			this.colorId = cid;
		}
		else {
			this.colorId = Math.floor(1 + Math.random() * this.colorsNum);
		}
		
		this.brd.frame = this.brdFr0+this.shapeId-1;
		
		////console.log('bgd frame');
		////console.log(this.bgdFr0);
		////console.log(this.colorId);
		////console.log(this.shapeId);
		////console.log(this.colorsNum);
		////console.log(this.shapesNum);
		
		
		this.bgd.frame = this.bgdFr0+(this.colorId-1) * this.shapesNum + (this.shapeId-1);
		

		this.cover.animations.stop();		
		this.cover.visible = false;
		this.cover.frame = this.coverFr0;
		

		this.content.visible = true;
		
		this.isCovered = false;
		this.isHit = false;
		
		if (this.twn){this.twn.stop()}
		if (this.coverTwn){
			this.coverTwn.stop(); 
			//this.coverTwn.onComplete.removeAll()
		}
		
		
		this.content.alpha = 1;
		this.coverDelayedActionId = 0;
		this.content.rotation = Routines.prototype.RandomNumberFromTo(-20, 20);
		this.content.scale.set(1,1);
		

				
	}
	
}