package world_drag_shapes_2holes 
{
	import flash.display.MovieClip;
	/**
	 * ...
	 * @author General
	 */
	public class GeomHole extends MovieClip
	{
		public var shapeId:int;
		public function GeomHole(id:int) 
		{
			shapeId = id;
			gotoAndStop(id);
			mouseChildren = false;
			mouseEnabled = false;
			cacheAsBitmap = true;
		}		
	}
}