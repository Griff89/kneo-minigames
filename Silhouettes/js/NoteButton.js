/**
 * ...
 * @author General
 */

NoteButton = function(game) {
	this.game = game;
	this.content=null;
	
	this.track=null;
	this.body=null;
	this.wrongSmb=null;
	this.border=null;
	
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
		
		this.track = this.game.add.sprite(0,0,'PIC_ALL_ART','NoteTrack0000',this.content);
		this.track.anchor.setTo(0.5,0.5);
		this.trackFr0 = this.track.frame;

		this.body = this.game.add.sprite(0,0,'PIC_ALL_ART','NoteInner0000',this.content);
		this.body.noteId = this.noteId;
		this.body.anchor.setTo(0.5,0.5);
		this.bodyFr0 = this.body.frame;
		
		this.body.owner = this;
		
		this.wrongSmb = this.game.add.sprite(0,0,'PIC_ALL_ART','NoteWrong0000',this.content);
		this.wrongSmb.scale.set(1.1,1.1);
		this.wrongSmb.anchor.setTo(0.5,0.5);
		this.wrongSmbFr0 = this.wrongSmb.frame;
		
		this.border = this.game.add.sprite(0,0,'PIC_ALL_ART','GeomBorder0000',this.content);
		this.border.anchor.setTo(0.5,0.5);
		this.borderFr0 = this.border.frame;
		
		////console.log('Button createD');
		////console.log(this.trackFr0);
		////console.log(this.bodyFr0);
		////console.log(this.wrongSmbFr0);
		////console.log(this.borderFr0);
		
		this.shapeId = sid;
		this.colorId = cid;
		
		this.track.frame = this.trackFr0+(cid-1) * 5 + (sid-1);
		this.body.frame = this.bodyFr0+(cid-1) * 5 + (sid-1);
		this.wrongSmb.frame = this.wrongSmbFr0+(sid-1);
		this.border.frame = this.borderFr0+(sid-1);

		this.border.scale.set(0.65,0.65);
		////console.log('border x:'+this.border.x);
		////console.log('track x:'+this.track.x);
		////console.log('track left:'+this.track._bounds.left);
		////console.log('track right:'+this.track._bounds.right);
		////console.log('track right:'+this.track.frame);
		////console.log(this.track);
		
		this.wrongSmb.visible = false;
		this.track.visible = false;
		
		//this.body.inputEnabled = true;
		//this.body.input.start(0, true);
		//this.body.events.onInputDown.add(this.shake, this);
		////console.log('NID: '+this.noteId);
		
		this.wrongTween = this.game.add.tween(this.wrongSmb);
		this.wrongTween.onComplete.add(this.onWrongTweenComplete, this);
		this.trackTween = this.game.add.tween(this.track);
		this.trackTween.onComplete.add(this.onTrackTweenComplete, this);
	},
	f2: function (item, pointer) {
		//console.log('f2 '+item.noteId);
		//console.log(this.noteId);
		//console.log(this);
		//console.log(item);
		//console.log(pointer);
	},
	shake: function () {
		this.bodyTween= this.game.add.tween(this.body);
		this.bodyTween.to({angle:10},150,Phaser.Easing.Bounce.In, true, 0,1,true);
		
		this.brdTween= this.game.add.tween(this.border);
		this.brdTween.to({angle:10},150,Phaser.Easing.Bounce.In, true, 0,1,true);
		
		
		
		this.track.scale.set(0.5);
		this.track.alpha = 1;
		this.track.angle = 0;
		this.track.visible = true;
		
		this.trackTween = this.game.add.tween(this.track);
		this.trackTween.onComplete.add(this.onTrackTweenComplete, this);
		this.trackTween.to({alpha:0, width:this.track.width*4,height:this.track.height*4,angle:(Math.random()<0.5)?10:-10},300, Phaser.Easing.Linear.None, false, 100,0,false);
		this.trackTween.start(100);
	},
	showError: function () {
		
		this.wrongSmb.alpha = 1;
		this.wrongSmb.visible = true;
		
		this.wrongTween = this.game.add.tween(this.wrongSmb);
		this.wrongTween.onComplete.add(this.onWrongTweenComplete, this);		

		this.wrongTween.to({alpha:0},300, Phaser.Easing.Linear.None, false, 100, 2,false);
		
		this.wrongTween.start(100);
	},
	onWrongTweenComplete: function () {
		//console.log('onWrongTweenComplete');
		this.wrongSmb.visible = false;
	},
	onTrackTweenComplete: function () {
		//console.log('onTrackTweenComplete');
		this.track.visible = false;
	}	
}

function onDown(item, pointer) {
	//console.log('onDown '+item.noteId);

}