/**
 * ...
 * @author General
 */

ShapeEdge = function(game) {
	this.game = game;
	this.sprite = null;
	this.fr0 = 0;
}

ShapeEdge.prototype = {
	init: function ( pt1, pt2, frid) {
		this.pt1 = pt1;		
		this.pt2 = pt2;	
		
		this.sprite = this.game.make.sprite(0,0,'PIC_LINE');
		this.sprite.anchor.setTo(0.5, 1);
		//this.fr0 = this.sprite.frame;
		//
		//if ((this.pt1.isFixed && this.pt2.isFixed)) {
			//this.sprite.frame = this.fr1;
		//}
		//else {
			//this.sprite.frame = this.fr0;
		//}
		//
		//if (frid != 1) {
			//this.sprite.frame = this.fr0+frid-1;
		//}
		
		this.pt1.attachEdge(this);
		this.pt2.attachEdge(this);
		
		
	},
	update: function () 
	{
		this.sprite.x = this.pt1.sprite.x;
		this.sprite.y = this.pt1.sprite.y;
		var phi = Routines.prototype.FindDirectionInDegrees(this.pt1.sprite.x, this.pt1.sprite.y, this.pt2.sprite.x, this.pt2.sprite.y);
		var d = Routines.prototype.GetDistanceBetween(this.pt1.sprite.x, this.pt1.sprite.y, this.pt2.sprite.x, this.pt2.sprite.y);
		this.sprite.rotation = 0;
		this.sprite.scale.set(1,d);
		this.sprite.angle = phi;
	},
	
	clear: function () 
	{
		this.pt1 = null;
		this.pt2 = null;
		this.sprite.visible = false;
	},
	f3: function () {
	
	}
}