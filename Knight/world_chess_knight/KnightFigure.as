package world_chess_knight 
{
	import flash.display.MovieClip;

	/**
	 * ...
	 * @author General
	 */
	public class KnightFigure extends MovieClip
	{
		public var cell_x:int;
		public var cell_y:int;
		public function KnightFigure() 
		{
			mouseChildren = false;
			mouseEnabled = false;			
		}
		
		public function placeAtCell(cx:int, cy:int):void {
			cell_x = cx;
			cell_y = cy;
			x = 250 + 50 * cell_x;
			y = 90 + 50 * cell_y;			
		}		
	}
}