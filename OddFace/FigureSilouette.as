package
{
	import flash.display.MovieClip;
	import flash.events.TimerEvent;
	import flash.filters.GlowFilter;
	import flash.utils.Timer;
	/**
	 * ...
	 * @author ...
	 */
	public class FigureSilouette extends MovieClip
	{
		public var shapeId:int;
		public var side:int;
		
		public var arId:int;
		
		private var selectedFilter:GlowFilter;
		private var wrongFilter:GlowFilter;
		private var correctFilter:GlowFilter;
		private var wrongTimer:Timer;
		private var wrongTTL:int;
		
		private var alphaTwn:UltimateTweener;
		public function FigureSilouette() 
		{
			eyes.stop();
			mouth.stop();
			brd.stop();
			
			stop();
			mouseChildren = false;
			mouseEnabled = true;
			buttonMode = true;
			
			wrongTimer = new Timer(100, 6);
			wrongTimer.addEventListener(TimerEvent.TIMER, onWrongTimer);
			
			wrongFilter = new GlowFilter(0xFF0000);
			correctFilter = new GlowFilter(0x008800);
			selectedFilter = new GlowFilter(0xFFFFFF);
			
			alphaTwn = new UltimateTweener();
		}
		
		private function onWrongTimer(e:TimerEvent):void 
		{
			wrongTTL++;
			if (wrongTTL % 2 == 1) {
				filters = [wrongFilter];
			}
			else {
				filters = [];
			}
		}
		public function reset(id:int, sd:int):void {
			side = sd;
			shapeId = id;
			
			var fid:int = id % 3;
			id /= 3;
			var mid:int = id % 3;
			var eid:int = id / 3;
			
			eyes.gotoAndStop(eid+1);
			mouth.gotoAndStop(mid+1);
			brd.gotoAndStop(fid+1);
			
			mouseEnabled = true;
			filters = [];
			alpha = 1;
			alphaTwn.cancelTweening();
			wrongTimer.stop();
		}
		
		public function setSelected():void {
			filters = [selectedFilter];
			wrongTimer.stop();
		}
		
		public function showError():void {
			wrongTTL = 0;
			wrongTimer.reset();
			wrongTimer.start();
			filters = [wrongFilter];
		}
		
		public function unSelect():void 
		{
			filters = [];
			wrongTimer.stop();
		}
		
		public function showCorrect():void 
		{
			filters = [correctFilter];
			mouseEnabled = false;
			alphaTwn.tweenItem2State(this, 6, -1000, -1000, -1000, -1000, -1000, 0);
			wrongTimer.stop();
		}
	}

}