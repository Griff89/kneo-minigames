package world_shoot_quick 
{
	import flash.display.MovieClip;
	import flash.events.Event;
	import GeomShape;
	/**
	 * ...
	 * @author General
	 */
	public class FallingShape extends MovieClip
	{
		public var moveMode:int;//1 - wave, 2 - fall, 3 - nothing
		public var arId:int;
		
		private var g:Number;
		private var phase:Number;
		private var fallTime:Number;
		
		private var planned2Fall:Boolean;
		
		private var shp:GeomShape;
		
		public function FallingShape() 
		{
			g = 98;
			
			shp = new GeomShape();
			addChild(shp);
		}
		
		public function reset(id:int):void {
			arId = id;
			
			shp.resetShapeAndColor(1 + int(Math.random() * 3), 1 + int(Math.random() * 7));
			
			phase = id * Math.PI / 3;
			x = 110 + 84 * id;
			moveMode = 1;
			planned2Fall = false;
			doWaveMovement(0);
			
			mouseChildren = false;
			mouseEnabled = true;
			buttonMode = true;			
		}
		
		public function showWrong():void {
			shp.showWrong(true);
			mouseEnabled = false;
			moveMode = 3;
		}
		public function showCorrect():void {
			shp.getHit();
			mouseEnabled = false;
			moveMode = 3;
		}
		
		public function getFallTime():Number {
			return fallTime;
		}
		
		public function step(dt:Number):void {

			if (moveMode==2) {
				doFallMovement(dt);
			}
			else {
				if (moveMode==1) {
					doWaveMovement(dt*0.5);
				}
			}
		}
		
		public function fallOrder():void {
			planned2Fall = true;
		}
		
		private function startFalling():void {

			fallTime = 0;
			moveMode = 2;
		}
		
		private function doWaveMovement(dt:Number):void {
			phase += dt;
			y = 120 + 20 * Math.sin(phase);
			if (planned2Fall) {
				if (y >= 139) {
					startFalling();
					SoundPlayer.PlayASoundID(SoundPlayer.SND_FIGURE_FALL);
				}
			}
		}
		
		private function doFallMovement(dt:Number):void {
			fallTime += dt
			y = 140 + 0.5 * g * fallTime * fallTime;
			if (y >= 433) {
				showWrong();
				dispatchEvent(new Event("failed"));
			}
		}
	}

}