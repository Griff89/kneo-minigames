package world_chess_knight 
{
	import flash.display.MovieClip;
	import flash.text.TextField;
	/**
	 * ...
	 * @author General
	 */
	public class ChessBoard extends MovieClip
	{
		private var moveMarkers:Array;
		public function ChessBoard() 
		{
			x = 224;
			y = 65;
			moveMarkers = new Array();
			for (var i:int = 0; i < 8; i++ ) {
				var mrk:KnightMoveMarker = new KnightMoveMarker();
				moveMarkers.push(mrk);
			}
			mouseChildren = true;
			base.mouseEnabled = false;
			base.cacheAsBitmap = true;
			ptsTxt.mouseEnabled = false;
		}
		
		public function showScore(scr:int):void {
			ptsTxt.text = scr.toString();
		}
		
		public function showKnigtsAllowedMoves(kx:int, ky:int):void {
			var mid:int = 0;
			for (var cx:int = 0; cx < 8; cx++ ) {
				for (var cy:int = 0; cy < 8; cy++ ) {
					var adx:int = Math.abs(cx - kx);
					var ady:int = Math.abs(cy - ky);
					if (((adx == 1) && (ady == 2)) || ((adx == 2) && (ady == 1))) {
						var mrk:KnightMoveMarker = moveMarkers[mid];
						mrk.show(cx, cy, this);
						mid++;
					}
				}
			}
			for (var i:int = mid; i < 8; i++ ) {
				mrk = moveMarkers[i];
				mrk.hide();
			}
		}
		
	}

}