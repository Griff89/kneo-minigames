/**
 * ...
 * @author General
 */

SearchedToken = function(game) {
	this.game = game;
	this.content = null;
	this.bgd = null;
	this.smb = null;
	this.smbFr0 = 0;
	this.smbId = 0;
	this.rowId = 0;
	this.vx = 0;
	this.isOutOfScreen = true;
	this.arId = 0;
	this.rotSpeed=0;
}

SearchedToken.prototype = {
	init: function (parGroup) {
		//////console.log('init');
		this.content = this.game.add.group();
		parGroup.add(this.content);
		this.bgd = this.game.add.sprite(0,0,'PIC_BALL_BASE',0,this.content);
		this.smb = this.game.add.sprite(0,0,'PIC_BALL_INNER',0,this.content);
		this.smbFr0 = this.smb.frame;
		
		this.bgd.anchor.setTo(0.5,0.5);
		this.smb.anchor.setTo(0.5,0.5);
		this.bgd.owner = this;
		
		this.vx = 0.1;
		this.content.visible = false;
		this.isOutOfScreen = true;
	},
	step: function (dt,sd,rt) {
	//	////console.log('step '+this.content.x+' '+this.content.y+' '+this.content.visible+' '+sd);
		var wentOut = false;
		if (sd==1){
			this.content.x += this.vx*dt;
			if (this.content.x >= 1000+60){
				this.isOutOfScreen = true;
			}
			if ((dt<0)&&(this.content.x <= 0-60)){
				this.isOutOfScreen = true;
			}
		}		
		
		if (sd==-1){
			this.content.x -= this.vx*dt;
			if (this.content.x <= 0-60){
				this.isOutOfScreen = true;
			}
			if ((dt<0)&&(this.content.x >= 1000+60)){
				this.isOutOfScreen = true;
			}
		}
		
		if (rt==1){
			this.content.rotation += this.rotSpeed;
		}		
		
		if (rt==-1){
			this.content.rotation -= this.rotSpeed;
		}
		wentOut = this.isOutOfScreen;
		return wentOut;
	//	////console.log('step '+this.content.x+' '+this.content.y+' '+this.content.visible);
	},
	backStep: function (dt,sd,rt) {
	//	////console.log('step '+this.content.x+' '+this.content.y+' '+this.content.visible+' '+sd);
		if (sd==1){
			this.content.x -= 5*this.vx*dt;
			if (this.content.x <= 0-60){
				this.isOutOfScreen = true;
			}
		}		
		
		if (sd==-1){
			this.content.x -= 5*this.vx*dt;
			if (this.content.x >= 1000+60){
				this.isOutOfScreen = true;
			}			
		}
		
	//	////console.log('step '+this.content.x+' '+this.content.y+' '+this.content.visible);
	},
	appear: function (sd, ay, mprob, prob) {
		//////console.log('appear');
		if (sd==1){
			this.content.x = -60;
		}
		
		if (sd==-1){
			this.content.x = 1000+60;
		}
		
		this.content.y = 0;//ay;
		
		this.rotSpeed = Math.random()*0.04 - 0.02;
		
		if (Math.random()<prob){
			this.smbId = mprob;
		}
		else{
			this.smbId = Math.floor(Math.random()*15);
		}
		
		
		this.smb.frame = this.smbFr0+this.smbId;
		
		this.content.visible = true;
		this.content.scale.set(1,1);
		this.isOutOfScreen = false;
	},	
	back2Pool: function () {
		////console.log('back2Pool '+this.arId);
		this.content.visible = false;
	},	
	f3: function () {
		//////console.log('f3');
	}
}