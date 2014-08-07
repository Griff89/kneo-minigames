/**
 * ...
 * @author General
 */

ShapeWithPoints = function(game, corCb) {
	this.game = game;
	this.correctCallBack = corCb;
	this.pts = [];
	this.edgs = [];
	this.nm = '';
	this.nmTxt = null;

	this.ansPt = null;//:ShapePoint;
	this.ansEdg1 = null;//:ShapeEdge;
	this.ansEdg2 = null;//:ShapeEdge;
	this.pointScore = 0;//:int;

	this.hitRating = 0;//:int;

	this.draggedPoint = null;//:ShapePoint;

	this.inf = null;//:AccuracyInformer;

	this.twn1 = null;//:UltimateTweener;
	this.twn2 = null;//:UltimateTweener;
	this.twn3 = null;//:UltimateTweener;	
}

ShapeWithPoints.prototype = {
	init: function () {
		this.content = this.game.add.group();
		
		this.nmTxt=this.game.add.bitmapText (1000, 390, 'PIC_FONT2', '0', 28);
        this.nmTxt.align = 'center';
        this.nmTxt.pivot.x = (this.nmTxt.textWidth / 2);
        this.nmTxt.pivot.y = (this.nmTxt.textHeight / 2);
		this.content.add(this.nmTxt);
		
	//	this.nmTxt = this.game.add.text(320,260,'text',{font:"16px Arial", align:"center"},this.content);
	//	this.inf = this.game.add.text(320,260,'text2',{font:"16px Arial", align:"center"},this.content);
		
		this.inf=this.game.add.bitmapText (0, 0, 'PIC_FONT24', '0', 28);
        this.inf.align = 'center';
        this.inf.pivot.x = (this.inf.textWidth / 2);
        this.inf.pivot.y = (this.inf.textHeight / 2);
		this.content.add(this.inf);	
		
		this.inf.visible = false;
		
		//this.nmTxt.anchor.setTo(0.5,0.5);
		//this.inf.anchor.setTo(0.5,0.5);
	},
	initShape: function (tpId, func, ctx) {
		this.clear();
		
		var rad = 230;
		var phi = Math.random() * 2 * Math.PI;
		var x0 = 500;
		var y0 = 400;
		var ptsNum;
		switch (tpId) {//triangle, square, rectangle, hexagon, star
			case 1: {
				ptsNum = 3;
				this.nm = 'triangle';
				break;
			}
			case 2: {
				ptsNum = 4;
				this.nm = 'square';
				break;
			}
			case 3: {
				ptsNum = 4;
				this.nm = 'rectangle';
				break;
			}
			case 4: {
				ptsNum = 6;
				this.nm = 'hexagon';
				break;
			}
			case 5: {
				ptsNum = 5;
				this.nm = 'star';
				break;
			}
		}
		this.nmTxt.text = this.nm;
		var i = 0;
		while (i < ptsNum) {
			var ax = x0 + rad * Math.cos(phi);
			var ay = y0 - rad * Math.sin(phi);
			var dPhi = 2 * Math.PI / ptsNum;
			if (tpId == 3) {
				dPhi = ((i % 2 == 0)?1:2) * Math.PI / 3;
			}
			if (tpId == 5) {
				dPhi *= 3;
			}
			
			phi += dPhi;
			
			var pt = new ShapePoint(this.game);
			pt.init( ax, ay, i != ptsNum - 1 ,1);
			if (!pt.isFixed){
				pt.sprite.events.onInputDown.add(func, ctx);
			}
			this.pts.push(pt);
			i++;
		}
		
		var len = this.pts.length;
		var lastPt = this.pts[len - 1];
		this.ansPt = new ShapePoint(this.game);
		this.ansPt.init(lastPt.sprite.x, lastPt.sprite.y, true, 3);
		
		for (i = 0; i < len; i++) {
			var edg = new ShapeEdge(this.game);
			edg.init(this.pts[i], this.pts[(i + 1) % len],1);
			this.edgs.push(edg);
		}
		
		this.ansEdg1 = new ShapeEdge(this.game);
		this.ansEdg1.init(this.ansPt, this.pts[0],3);
		
		this.ansEdg2 = new ShapeEdge(this.game);
		this.ansEdg2.init(this.ansPt, this.pts[len - 2],3);
		
		this.ansEdg1.update();
		this.ansEdg2.update();
		
		//random movement
		var need1More = true;
		while (need1More) {
			need1More = false;
			var rr = Routines.prototype.RandomNumberFromTo(30, 80);
			var rPhi = Math.random() * Math.PI * 2;
			var nx = lastPt.sprite.x + rr * Math.sin(rPhi);
			var ny = lastPt.sprite.y - rr * Math.cos(rPhi);
			need1More =  ((nx < 79) || (ny < 72) || (nx > 562) || (ny > 435));
		}
		
		lastPt.sprite.x = nx;
		lastPt.sprite.y = ny;
		lastPt.updateEdges();
		
		var len = this.edgs.length;
		for (var i=0; i<len; i++) {
			this.edgs[i].update();
			this.content.add(this.edgs[i].sprite);
		//	addChild(ed);
		}
		
		var len = this.pts.length;
		for (var i=0; i<len; i++) {
			this.content.add(this.pts[i].sprite);
		//addChild(pt);
		}		
	
	},
	onTwnComplete: function () {
		this.correctCallBack();
	},
	startDraggingPoint: function (pt) 
	{
		this.draggedPoint = pt;
	
	},
	
	checkDraggedPointPosition: function ()
	{
		//inf = new AccuracyInformer
		var dist = Routines.prototype.GetDistanceBetween(this.ansPt.sprite.x, this.ansPt.sprite.y, 
								this.draggedPoint.sprite.x, this.draggedPoint.sprite.y);

		
		this.showInformerScore(this.draggedPoint.sprite.x, this.draggedPoint.sprite.y - 30, dist);
	//	pointScore = inf.showScore(this, draggedPoint.x, draggedPoint.y - 30, dist);
	//	hitRating = inf.hitRating;

		return this.pointScore;
	},
	
	showInformerScore: function (ax, ay, dist) {
		var res = 0;
		var str = ' ';
		this.inf.x = ax;
		this.inf.y = ay;
		this.content.bringToTop(this.inf);
		if (dist < 3) {
			res = 20;
			str = 'perfect!';
			this.hitRating = 0;
		}
		else {
			if (dist < 8) {
				res = 18;
				str = 'almost perfect!';
				this.hitRating = 1;
			}
			else {
				if (dist < 13) {
					res = 15;
					str = 'not bad';
					this.hitRating = 2;
				}
				else {
					if (dist < 25) {
						res = 10;
						str = 'average';
						this.hitRating = 3;
					}
					else {
						res = 10 - (dist - 25) / 30;
						if (res <= 0) {
							res = 1;
						}
						str = 'miss';
						this.hitRating = 4;
					}						
				}					
			}
		}
		this.inf.text = str;
		this.inf.visible=true;
		this.pointScore = res;			
	},
	
	handleDragging: function (ax, ay) 
	{
		
		if (this.draggedPoint) {
			this.draggedPoint.sprite.x = ax;
			this.draggedPoint.sprite.y = ay;
			this.draggedPoint.updateEdges();
		}
	},
	
	showCorrect: function () 
	{
		this.ansEdg1.sprite.alpha = 0;
		this.ansEdg1.visible = true;
		this.content.add(this.ansEdg1.sprite);
		this.twn2 = this.game.add.tween(this.ansEdg1.sprite);
		this.twn2.to({alpha:1},350);
		this.twn2.start();		
		
		this.ansEdg2.sprite.alpha = 0;
		this.ansEdg2.visible = true;
		this.content.add(this.ansEdg2.sprite);
		this.twn3 = this.game.add.tween(this.ansEdg2.sprite);
		this.twn3.to({alpha:1},350);
		this.twn3.start();
		
		this.ansPt.sprite.alpha = 0;
		this.ansPt.sprite.visible = true;
		this.content.add(this.ansPt.sprite);
		this.twn1 = this.game.add.tween(this.ansPt.sprite);
		this.twn1.to({alpha:1},350);
		this.twn1.onComplete.add(this.onTwnComplete,this);
		this.twn1.start();
	},
	
	clear: function () 
	{
		this.draggedPoint = null;
		
		if (this.ansPt) {
			this.ansPt.clear();
			this.ansEdg1.clear();
			this.ansEdg2.clear();
		}
		
		var len = this.pts.length;
		for (var i=0; i<len; i++) {
			this.pts[i].clear();
			this.pts[i].sprite.destroy();
		}
		len = this.edgs.length;
		for (var i=0; i<len; i++) {
			this.edgs[i].clear();
			this.edgs[i].sprite.destroy();
		}
		
		this.inf.visible = false;
		
		this.pts = [];
		this.edgs = [];
	},
	f3: function () {
	
	}
}