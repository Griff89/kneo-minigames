/**
 * ...
 * @author General
 */

Routines = function() {
	
}

Routines.prototype = {
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