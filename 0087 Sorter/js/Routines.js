/**
 * ...
 * @author General
 */

Routines = function() {
	
}

Routines.prototype = {
	isDistBetweenPtsSmallerThan: function (x1, y1, x2, y2, threshold) {
		var dx = Math.abs(x2 - x1);
		var dy = Math.abs(y2 - y1);
		var trSQR = threshold * threshold;
		if (dx > threshold) { return false }
		if (dy > threshold) { return false }
		if ((dx<threshold*0.7)&&(dy<threshold*0.7)){return true}
		return (dx * dx + dy * dy < trSQR);		
	},	
	
	calcAccDragScore: function (d) 
	{
		var res = 0;
		if (d <= 2) {
			res = 20;
		}
		else {
			if (d <= 10) {
				res = 20 - (d - 2) * 10 / 8;
			}
			else {
				res = 10 * 10 / d;
			}
		}
		return res;				
	},
	
	calcPrecDragScore:function (dt) 
	{
		return Routines.prototype.calcFindShapeScore(dt * 0.85) * 2 / 7;
	},	
	
	
	calcDifferenceBetweenAnglesInDeg: function calcDifferenceBetweenAnglesInDeg(a1, a2) {
		var da = a2 - a1;
		while (da > 180) {
			da -= 360;
		}
		while (da < -180) {
			da += 360;
		}		
		return da;
	},
	
	GetDistanceBetween: function (x1, y1, x2, y2) {
		var dx = x2 - x1;
		var dy = y2 - y1;
		return Math.sqrt(dx*dx+dy*dy);
	},
	FindDirectionInDegrees: function (x1, y1, x2, y2) {
		var dx = x2 - x1;
		var dy = y2 - y1;
		var dirRad = Math.atan2( dx, -dy);
		return dirRad * 180 / Math.PI;	
	},
	calcChessScore: function(tm) {
		var res = 0;

		if (tm <= 900) {
			res = 7 + Math.ceil((900 - tm) * 7 / 900);
		}
		else {
			if (tm <= 3000) {
				res = 7 - (tm - 900) * 6 / 2100;
			}
			else {
				res = 1;					
			}
		}
		return res;		
	},
	calcShowDirScore: function(sideDelta) 
	{
		var res = 0;
		if (sideDelta <= 3.74) {
			res = 40;
		}
		else {
			if (sideDelta <= 10.75) {
				res = 40 - (sideDelta - 3.74) * 10 / 7.01;
			}
			else {
				if (sideDelta <= 30) {
					res = 30 - (sideDelta - 10.75) * 20 / 19.25;
				}
				else {
					res = 300 / (sideDelta);
				}
			}
		}
		return res;			
	},	
	calcCircleCentreScore: function (perc) {
		var res = 0;
		if (perc >= 99) {
			res = 25;
		}
		else {
			if (perc >= 95) {
				res = 21 + perc-95;
			}
			else {
				if (perc >= 90) {
					res = 21-(95-perc)*2;
				}
				else {
					res = 11 * 90 / perc;
				}
			}
		}
		return res;			
	},
	calcCountShapesScore: function (dt) 
	{
		return Routines.prototype.calcFindShapeScore(dt * 0.2) * 4 / 14;
	},	
	calcFindShapeScore: function(tm)
	{
		var res = 0;
		if (tm <= 500) {
			res = 70 + (500 - tm) * 70 / 500;
		}
		else {
			if (tm <= 2500) {
				res = 70 - (tm - 500) * 30 / 2000;
			}
			else {
				if (tm <= 12500) {
					res = 40 - (tm - 2500) * 39 / 10000;
				}
				else {
					res = 1;
				}					
			}
		}
		return res;
	},
	calcStarMemScore: function(dScore)
	{
		var res = 0;
		if (dScore <= 16) {
			res = 16;
		}
		else {
			res = 16 * 16 / dScore;
		}
		return res;	
	},
	RandomNumberFromTo: function (mn,mx) {
		return Math.floor(mn+(mx-mn)*Math.random());
	},
	f1: function () {
	
	}
}