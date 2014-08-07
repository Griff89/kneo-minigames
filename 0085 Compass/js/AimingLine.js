/**
 * ...
 * @author General
 */

AimingLine = function(game, sndCb, complCb) {
	this.game = game;
	this.soundCallBack = sndCb;
	this.completeCallBack = complCb;
	this.content = null;
	this.line0 = null;
	this.line1 = null;
	this.lineDist = 0;
	this.deltaText = null;
	this.deltaTextGr = null;
	
	this.txtTwn = null;
	this.hideTwn = null;
	this.twn0 = null;
	this.twn1 = null;
	
	this.deltaAngles = null;
	
	this.sideDelta = null;
	this.hitRating = null;
}

AimingLine.prototype = {
	init: function () {
		this.content = this.game.add.group();
		this.line0 = this.game.add.sprite(0,0,'PIC_LINE',0,this.content);
		this.line1 = this.game.add.sprite(0,0,'PIC_LINE',0,this.content);
		this.line0.anchor.setTo(0.5, 1);
		this.line1.anchor.setTo(0.5, 1);
		
		this.deltaTextGr = this.game.add.group();
		this.content.add(this.deltaTextGr);
		this.deltaText = this.game.add.bitmapText (0, 0, 'PIC_FONT2','00000');
        this.deltaText.align = 'center';
        this.deltaText.pivot.x = (this.deltaText.textWidth / 2);
        this.deltaText.pivot.y = (this.deltaText.textHeight / 2);
        this.deltaTextGr.add(this.deltaText);
		

		
	},
	
	onLine1Complete: function ()
	{
		this.deltaTextGr.y -= 10;
		if (this.txtTwn){this.txtTwn.stop()}
		this.txtTwn = this.game.add.tween(this.deltaTextGr);
		this.txtTwn.to({y:this.deltaTextGr.y+10, alpha:1},300);
		this.txtTwn.onComplete.add(this.onTextTweenComplete, this)
		this.txtTwn.start();
	},
	
	onLine0Complete: function ()
	{
		this.twn1.start();
		//this.startShowingLine(this.line1, this.twn1, this.onLine1Complete);
	},
	//
	onHideTweenComplete: function()
	{
		this.content.visible = false;
	},
	
	
	hide: function(){
		if (this.hideTwn)(this.hideTwn.stop());
		this.hideTwn = this.game.add.tween(this.content);
		this.hideTwn.onComplete.add(this.onHideTweenComplete, this);
		this.hideTwn.to({alpha:0},250);
		this.hideTwn.start();
	},
	
	onTextTweenComplete: function ()
	{
		this.completeCallBack();
	},
	
	startShowingDirection: function (x0, y0, x1, y1, rot0) 
	{
		if (this.txtTwn){this.txtTwn.stop()}
		if (this.hideTwn){this.hideTwn.stop()}
		
		this.content.alpha = 1;
		var d = Routines.prototype.GetDistanceBetween(x0, y0, x1, y1);
		
		var rot1 = Routines.prototype.FindDirectionInDegrees(x0, y0, x1, y1);
		
		//(line0 as BasicAimingLine).prepare2Show(d, rot0);
		//(line1 as BasicAimingLine).prepare2Show(d, rot1);	
		
		this.line0.angle = 0;
		this.line0.scale.set(1,0);
		this.line0.angle = rot0;
		
		if (this.twn0){this.twn0.stop()}
		this.twn0 = this.game.add.tween(this.line0.scale);
		this.twn0.to({y:d},250);
		this.twn0.onComplete.add(this.onLine0Complete, this);
		
		this.line1.angle = 0;
		this.line1.scale.set(1,0);
		this.line1.angle = rot1;
			
		if (this.twn1){this.twn1.stop()}
		this.twn1 = this.game.add.tween(this.line1.scale);
		this.twn1.to({y:d},250);
		this.twn1.onComplete.add(this.onLine1Complete, this);
		

		
		
		var ex1 = d * Math.sin(rot1 * Math.PI / 180);		
		var ey1 = -d * Math.cos(rot1 * Math.PI / 180);		
		
		var ex0 = d * Math.sin(rot0 * Math.PI / 180);		
		var ey0 = -d * Math.cos(rot0 * Math.PI / 180);
		
		
		this.deltaAngles = Routines.prototype.calcDifferenceBetweenAnglesInDeg(rot0, rot1);
		
		this.deltaAngles *= (Math.PI/180);
		
		
		this.deltaAngles = Math.abs(this.deltaAngles);
		while (this.deltaAngles > Math.PI) {
			this.deltaAngles -= Math.PI;
		}
		
		if (this.deltaAngles < Math.PI / 2) {
			var sideDist = d * Math.tan(this.deltaAngles);
			this.sideDelta = sideDist;
		//	trace('sideDist:', sideDist);
			if (sideDist <= 3.74) {
				this.hitRating = 0;
				var str = 'exact hit!';
			}
			else {
				if (sideDist <= 10.75) {
					this.hitRating = 1;
					str='hit!'
				}
				else {
					if (sideDist <= 30) {
						this.hitRating = 2;
						str='almost  hit'
					}
					else {
						if (this.deltaAngles < Math.PI / 4) {
							str = "close...";
							if (this.deltaAngles < Math.PI / 8) {
								this.hitRating = 3;
							}
							else {
								this.hitRating = 4;
							}
							
						}
						else {
							str = "wrong :(";
							if (this.deltaAngles < 3 * Math.PI / 8) {
								this.hitRating = 5;
							}
							else {
								this.hitRating = 6;
							}								
						}
					}
				}
			}
		}
		else {
			this.hitRating = 7;
			str = "no way";
		}
		this.deltaText.text = str;
		this.deltaTextGr.alpha = 0;
		
		//deltaText.x = (ex1 + ex0) / 2 - deltaText.width / 2;
		//deltaText.y = (ey1 + ey0) / 2 - deltaText.height / 2;
		this.deltaTextGr.x = ex0;
		this.deltaTextGr.y = ey0;
		//trace('coords', ey1, ey0, y0);
		if (ey0 < 0) {
			this.deltaText.y += 30;
		}
		else {
			this.deltaText.y -= 30;
		}
		
		this.twn0.start();
		//(line0 as BasicAimingLine).startShowing();
		
		this.content.x = x0;
		this.content.y = y0;
		this.content.visible = true;
	},
	f2: function () {
	
	},
	f3: function () {
	
	}
}