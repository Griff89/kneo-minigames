/**
 * ...
 * @author General
 */

ShapePoint = function(game) {
	this.game = game;
	this.sprite = null;
	this.fr0 = 0;
	this.isFixed = false;
	this.edgs = [];
}

ShapePoint.prototype = {
	init: function (ax, ay, fx, fr) {
		this.isFixed = fx;
		if (this.isFixed){
			this.sprite = this.game.make.sprite(ax,ay,'PIC_RED_DOT');
		} else{
			this.sprite = this.game.make.sprite(ax,ay,'PIC_GREEN_DOT');	
		}
		
		
		
		this.sprite.anchor.setTo(0.5, 0.5);
		this.sprite.owner = this;
		
		
		
		//this.fr0 = this.sprite.frame;
		
		//this.sprite.frame = this.fr0+fr-1;
		
		if (!this.isFixed) {
			//this.sprite.frame = this.fr0+fr+1;
			this.sprite.inputEnabled = true;
			this.sprite.input.useHandCursor = true;
		}
		//if (fr != 1) {
			//this.sprite.frame = this.fr0+fr-1;
		//}
		
	},
	attachEdge: function (edg) {
		this.edgs.push(edg);
	},
	
	updateEdges: function () {
		var len = this.edgs.length;
		
		for (var i=0; i<len; i++) {
			this.edgs[i].update();
		}
	},
	
	clear: function () 
	{
		edgs = null;
		this.sprite.destroy();			
	},
	f2: function () {
	
	},
	f3: function () {
	
	}
}