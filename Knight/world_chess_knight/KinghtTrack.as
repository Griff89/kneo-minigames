package world_chess_knight 
{
	import flash.display.MovieClip;
	/**
	 * ...
	 * @author General
	 */
	public class KinghtTrack extends MovieClip
	{
		
		public function KinghtTrack() 
		{
			mouseChildren = false;
			mouseEnabled = false;
		}
		
		public function showMovement(cx0:int, cy0:int, cx1:int, cy1:int):void 
		{
			x = 250 + 50 * cx0;
			y = 90 + 50 * cy0;
			
			
			gotoAndPlay(1);
			
			var ang:Number = Routines.FindDirectionInDegrees(cx0, cy0, cx1, cy1);
			ang -= 63;

			innerTrack.rotation = ang;
			innerTrack.gotoAndPlay(1);
		}
		
	}

}