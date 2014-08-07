package world_chess_knight 
{
	import flash.display.DisplayObjectContainer;
	import flash.display.MovieClip;
	import flash.display.Sprite;
	/**
	 * ...
	 * @author General
	 */
	public class KnightMoveMarker extends MovieClip
	{
		public var cell_x:int;
		public var cell_y:int;		
		public function KnightMoveMarker() 
		{
			mouseChildren = false;
			mouseEnabled = true;
			buttonMode = true;
			stop();
		}
		
		public function show(cx:int, cy:int, par:DisplayObjectContainer):void 
		{
			cell_x = cx;
			cell_y = cy;			
			x = 25 + 50 * cell_x;
			y = 25 + 50 * cell_y;
			gotoAndPlay(1);
			par.addChild(this);
			mouseEnabled = true;
		}
		
		public function hide():void 
		{
			if (parent) {
				parent.removeChild(this);
			}
			stop();
			mouseEnabled = false;
		}
		
	}

}