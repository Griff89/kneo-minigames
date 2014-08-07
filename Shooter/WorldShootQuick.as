package  
{
	import flash.events.Event;
	import flash.events.MouseEvent;
	import flash.events.TimerEvent;
	import flash.utils.Timer;
	import world_shoot_quick.CrossHair;
	import world_shoot_quick.FallingShape;
	/**
	 * ...
	 * @author General
	 */
	public class WorldShootQuick extends World
	{
		private var balls:Array;
		private var plannedFalls:Array;
		private var receivedReplies:Array;
		
		private var fallShapeTimer:Timer;
		
		private var numHits:int;
		private var numMiss:int;
		private var crossHair:CrossHair;
		public function WorldShootQuick() 
		{
			informersData = [
			//текст, иконка, цвет, конечно ли, максимум, макс высота, у
			['hit:', 4, 1, true, 6, 130, 115],
			['miss:', 6, 2, true, 6, 130, 305]
			];
			
			balls = new Array();
			plannedFalls = new Array();
			receivedReplies = new Array();
			for (var i:int = 0; i < 6; i++) {
				var fs:FallingShape = new FallingShape();
				addChild(fs);
				balls.push(fs);
				fs.addEventListener("failed", onBallFailed);
				plannedFalls.push(false);
				receivedReplies.push(false);
			}
			crossHair = new CrossHair();
			
			fallShapeTimer = new Timer(4000, 1);
			fallShapeTimer.addEventListener(TimerEvent.TIMER_COMPLETE, onFallShapeTimer);
		}
		
		private function onFallShapeTimer(e:TimerEvent):void 
		{
			trace('onFallShapeTimer');
			var s:int = 0;
			for (var i:int = 0; i < 6; i++) {
				if (plannedFalls[i]) {
					s++;
				}
			}
			
			if (s < 6) {
				var r:int = int(Math.random() * 6);
				while (plannedFalls[r]) {
					r++;
					r %= 6;
				}
				trace('onFallShapeTimer', r);
				plannedFalls[r] = true;
				var fs:FallingShape = balls[r] as FallingShape;
				fs.fallOrder();
			}
			
			switch (s) {
				case 0:
				case 1: {
					fallShapeTimer.delay = 3000;
				}
				case 2:
				case 3: {
					fallShapeTimer.delay = 3000;
				}
				
				case 4:
				case 5: {
					fallShapeTimer.delay = 2000;
				}
			}
			if (s < 5) {
				fallShapeTimer.reset();
				fallShapeTimer.start();
			}
		}
		
		private function onFallShapeTimerComplete(e:TimerEvent):void 
		{
			
		}
		
		override public function Init():void {
		
			for (var i:int = 0; i < 6; i++) {
				(balls[i] as FallingShape).reset(i);
				plannedFalls[i] = false;
				receivedReplies[i] = false;
			}
			numHits = 0;
			numMiss = 0;
			addChild(crossHair);
			
			fallShapeTimer.delay = 4000;
			fallShapeTimer.stop();
		}
		
		override public function onTimeStarted():void {
			fallShapeTimer.reset();
			fallShapeTimer.start();
		}
		
		override public function registerListeners():void {
			if (!hasEventListener(MouseEvent.MOUSE_DOWN)) {
				addEventListener(MouseEvent.MOUSE_DOWN, onCircleMouseDown);
			}
			if (!hasEventListener(Event.ENTER_FRAME)) {
				addEventListener(Event.ENTER_FRAME, onFrameStep);
			}			
		}		
		
		private function onFrameStep(e:Event):void 
		{
			for each (var fs:FallingShape in balls) {
				fs.step(0.15);
			}
			if (stage) {
				crossHair.x = stage.mouseX;
				crossHair.y = stage.mouseY;
			}
			
		}
		
		private function onCircleMouseDown(e:MouseEvent):void 
		{
			if (e.target is FallingShape) {
				var fs:FallingShape = e.target as FallingShape;
				if (fs.moveMode == 2) {
					fs.showCorrect();
					SoundPlayer.PlayASoundID(SoundPlayer.SND_SUCCESS);
					SoundPlayer.PlayASoundID(SoundPlayer.SND_SHOT_SNIPER);
					var ft:Number = fs.getFallTime();
					if (ft < 1.4) {
						var scr:int = 35;
					}
					else {
						var scr:int = 35 * 1.4 / ft;
					}
					
					
					
					dispatchEvent(new ScoreEvent(ScoreEvent.SCORE_ADD, scr, ScoreEvent.SCORE_REAC));
					numHits++;
					dispatchEvent(new ScoreEvent(ScoreEvent.OTHER_INF, numHits, 0));
					if (numHits + numMiss == 6) {
						dispatchEvent(new ScoreEvent(ScoreEvent.GAME_END));
					}
				}
				else {
					fs.showWrong();
					SoundPlayer.PlayASoundID(SoundPlayer.SND_ERROR);
					plannedFalls[fs.arId] = true;
					receivedReplies[fs.arId] = true;
					numMiss++;
					dispatchEvent(new ScoreEvent(ScoreEvent.OTHER_INF, numMiss, 0));
					if (numHits + numMiss == 6) {
						dispatchEvent(new ScoreEvent(ScoreEvent.GAME_END));
					}
				}
			}
		}
		
		private function onBallFailed(e:Event):void 
		{
			numMiss++;
			dispatchEvent(new ScoreEvent(ScoreEvent.OTHER_INF, numMiss, 0));
			SoundPlayer.PlayASoundID(SoundPlayer.SND_FIGURE_BREAK);
			if (numHits + numMiss == 6) {
				dispatchEvent(new ScoreEvent(ScoreEvent.GAME_END));
			}
		}
		
		override public function unRegisterListeners():void {
			if (hasEventListener(MouseEvent.MOUSE_DOWN)) {
				removeEventListener(MouseEvent.MOUSE_DOWN, onCircleMouseDown);
			}
			if (hasEventListener(Event.ENTER_FRAME)) {
				removeEventListener(Event.ENTER_FRAME, onFrameStep);
			}			
		}		
		
	}

}