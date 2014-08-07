package world_shoot_quick 
{
	import flash.display.Sprite;
	import flash.text.TextField;
	/**
	 * ...
	 * @author General
	 */
	public class CrossHair extends Sprite
	{
		
		public function CrossHair() 
		{
			mouseChildren = false;
			mouseEnabled = false;
			x = ConstLibrary.stageWidth / 2;
			y = ConstLibrary.stageHeight / 2;
		}
		
	
	}

}