/**
 * ...
 * @author General
 */

NoteButton = function(game) {
	this.game = game;
	this.content=null;
	
	this.body=null;
	
	
	this.wrongTween = null;
	this.trackTween = null;
	this.brdTween = null;
	this.bodyTween = null;
	
	this.trackFr0=0;
	this.bodyFr0=0;
	this.wrongSmbFr0=0;
	this.borderFr0=0;
	
	this.shakeTimer=null;
	this.shakeTTL=0;
	this.y0=0;
	this.noteId=0;
}

NoteButton.prototype = {
	init: function (ax,ay, id, cid, sid) {
		this.noteId=id;
		
		this.content = this.game.add.group();
		this.content.x=ax;
		this.content.y=ay;

		this.body = this.game.add.sprite(0,0,'PIC_NOTE_BTNS',0,this.content);
		this.body.noteId = this.noteId;
		this.body.anchor.setTo(0.5,0.5);
		this.bodyFr0 = this.body.frame;
		
		this.body.owner = this;
		
		this.shapeId = sid;
		this.colorId = cid;
		
		
		this.body.frame = this.bodyFr0+(sid-1)*12+(cid-1);
		this.body.animations.add('light',[this.body.frame+6,this.body.frame]);
		this.body.animations.add('wrong',[60+sid-1, this.body.frame]);
		
	},
	f2: function (item, pointer) {
		//console.log('f2 '+item.noteId);
		//console.log(this.noteId);
		//console.log(this);
		//console.log(item);
		//console.log(pointer);
	},
	shake: function () {
		this.body.animations.stop();
		this.body.animations.play('light',5);
	},
	showError: function () {
		this.body.animations.stop();
		this.body.animations.play('wrong',5);
	}
	
}
