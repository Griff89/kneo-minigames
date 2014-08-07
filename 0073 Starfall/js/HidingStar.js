/**
 * ...
 * @author General
 */

HidingStar = function(game) {
	this.game = game;
	this.fr0 = 0;
	this.star = null;
}

HidingStar.prototype = {
	init: function () {
		this.star = this.game.add.sprite(0,0,'STAR');
        this.star.scale.set(.51,.51)
		this.star.anchor.setTo(0.5,0.53);
		this.star.visible = false;
		
		this.fr0 = this.star.frame;
		
	},

	onScaleComplete: function () {
		this.twn = this.game.add.tween(this.star);
		this.twn.to({alpha:0},500);
		this.twn.start();
	},
	onTweenComplete: function () {
		this.star.visible = false;
	},
	forceHide: function () {
		//tm.stop();
		//twn.cancelTweening();
		this.hideTimer.stop();
		if (this.twn){this.twn.stop()}
		
		this.star.visible = false;
	},
	showOnScreen: function (ax, ay) {
		//console.log('showOnScreen '+ax+' '+ay);
		this.star.x = ax;
		this.star.y = ay;
		this.star.rotation = Math.floor(Math.random() * 360);
		this.star.alpha = 1;
		//twn.cancelTweening();
		if (this.twn){this.twn.stop()}
		if (this.anim && this.anim.isRunning){this.onScaleComplete()}
		this.TTL = 0;
	//	tm.reset();
	//	tm.start();

		this.star.visible = true;

        var frames = [1, 2, 3, 4, 3, 2, 1];
        var framesOnOneSecond = frames.length / 600 * 1000;

        this.anim = this.star.animations.add('shineOnYouCrazyDiamond', frames, framesOnOneSecond);
        this.anim.onComplete.add(this.onScaleComplete.bind(this));

        this.star.animations.play('shineOnYouCrazyDiamond');
	}
}