package world_chess_knight 
{
	import flash.display.DisplayObjectContainer;
	import flash.display.MovieClip;
	/**
	 * ...
	 * @author General
	 */
	public class Coin extends MovieClip
	{
		public var isOnBoard:Boolean;
		public function Coin() 
		{
			mouseChildren = false;
			mouseEnabled = false;
		}
		
		public function hide():void 
		{
			//if (parent) {
			//	parent.removeChild(this);
			//}
			if (parent) {
				parent.addChild(this);
			}
			gotoAndPlay(2);
			isOnBoard = false;
		}
		
		public function show(par:DisplayObjectContainer):void {
			par.addChild(this);
			isOnBoard = true;
			gotoAndStop(1);
		}
		
	}

}