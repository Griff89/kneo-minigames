package  
{
	import flash.display.Bitmap;
	import flash.display.BitmapData;
	import flash.events.Event;
	import flash.events.MouseEvent;
	import flash.events.TimerEvent;
	import flash.geom.Matrix;
	import flash.utils.getTimer;
	import flash.utils.Timer;
	import world_count_shapes.CountShapeButton;
	import GeomShape;
	import world_memorize_action_order.PhaseCommand;
	/**
	 * ...
	 * @author General
	 */
	public class WorldCountShapes extends World 
	{
		private var buttons:Array;
		private var bmp:Bitmap;
		private var bmd:BitmapData;
		
		private var gamePhase:int; // 0 - pre start, 1 - drawing shapes, 2 - waiting 4 answer
		private var tm0:int;
		
		private var drawShapeTimer:Timer;
		private var twn:UltimateTweener;
		private var drawnShape:GeomShape;
		
		private var shapesDistribution:Array;
		private var shapes2Draw:Array;
		
		private var roundNum:int;
		private var errorNum:int;
		private var roundErrors:int;
		
		private var mtrx:Matrix;
		private var takenPositions:Array;
		
		private var commandText:PhaseCommand;
		public function WorldCountShapes() 
		{
			informersData = [
			//текст, иконка, цвет, конечно ли, максимум, макс высота, у
			['round:', 8, 1, true, 10, 100, 115],
			['errors:', 6, 2, false, 5, 100, 235],
			['thinktime:', 5, 3, false, 10000, 100, 355]
			
			];			
			buttons = new Array();
			for (var i:int = 0; i < 5; i++) {
				var btn:CountShapeButton = new CountShapeButton();
				btn.setBorder(i);
				btn.sleep();
				btn.x = 138 + 94 * i;
				btn.y = 417;
				addChild(btn);
				buttons.push(btn);
			}
			commandText = new PhaseCommand();
			commandText.x = 320;
			commandText.y = 356;
			addChild(commandText);
			
			takenPositions = new Array();
			for (i = 0; i < 15; i++) {
				takenPositions.push(false);
			}
			
			bmd = new BitmapData(485, 300, true, 0);
			bmp = new Bitmap(bmd);
			bmp.x = 79;
			bmp.y = 62;
			addChild(bmp);
			
			drawnShape = new GeomShape();
			drawShapeTimer = new Timer(150, 1);
			drawShapeTimer.addEventListener(TimerEvent.TIMER, onDrawTimer);
			drawShapeTimer.addEventListener(TimerEvent.TIMER_COMPLETE, onDrawTimerComplete);
			
			shapesDistribution = [0, 0, 0, 0, 0];
			shapes2Draw = [0, 0, 0, 0, 0];
			
			twn = new UltimateTweener();
			twn.addEventListener(Event.COMPLETE, onTweenComplete);
			
			mtrx = new Matrix();			
		}
		
		private function onTweenComplete(e:Event):void 
		{
			roundNum++;
			
			if (roundNum == 10) {
				dispatchEvent(new ScoreEvent(ScoreEvent.GAME_END));
			}
			else {
				dispatchEvent(new ScoreEvent(ScoreEvent.OTHER_INF, roundNum+1, 0));
				setGamePhase(1);
			}
		}
		
		private function onDrawTimer(e:TimerEvent):void 
		{
			var r:int = int(Math.random() * 5);
			while (shapes2Draw[r] == 0) {
				r++;
				r %= 5;
			}
			shapes2Draw[r]--;
			drawnShape.resetShapeAndColor(r + 1);
			mtrx.identity();
			mtrx.scale(0.66, 0.66);
			mtrx.rotate(Math.random() * 2 * Math.PI);
			
			var pid:int = Math.random() * 15;
			while (takenPositions[pid]) {
				pid++;
				pid %= 15;
			}
			takenPositions[pid] = true;
			var cx:int = (pid % 5);
			var cy:int = int(pid / 5);
			
			cx = (cx + 0.5) * 97;
			cy = (cy + 0.5) * 100;
			
			mtrx.translate(cx + Routines.RandomNumberFromTo( -20, 20), cy + Routines.RandomNumberFromTo( -20, 20));
			
			bmd.draw(drawnShape, mtrx, null, null, null, true);
			SoundPlayer.PlayASoundID(SoundPlayer.SND_FIGURE_APPEAR);
		}
		
		private function onDrawTimerComplete(e:TimerEvent):void 
		{
			setGamePhase(2);
		}
		
		override public function Init():void {
			setGamePhase(0);
			errorNum = 0;
			roundNum = 0;
			dispatchEvent(new ScoreEvent(ScoreEvent.OTHER_INF, roundNum+1, 0));
		
		}		

		override public function onTimeStarted():void {
			setGamePhase(1);
		}
		
		private function setGamePhase(ph:int):void 
		{
			
			switch (ph) {
				case 0: {
					commandText.showPhrase(0);
					for each (var btn:CountShapeButton in buttons) {
						btn.sleep();
					}
					break;
				}
				case 1: {
					SoundPlayer.PlayASoundID(SoundPlayer.SND_LVL_SCENE_CHANGE);
					commandText.showPhrase(11);
					resetShapesDistribution();
					drawShapeTimer.reset();
					drawShapeTimer.start();
					break;
				}
				case 2: {
					SoundPlayer.PlayASoundID(SoundPlayer.SND_QUESTION);
					commandText.showPhrase(12);
					roundErrors = 0;
					tm0 = getTimer();
					setButtonsNumbers();
					break;
				}
				case 3: {
					showWhiteSplash();
					break;
				}
			}
			gamePhase = ph;
		}
		
		private function showWhiteSplash():void 
		{
			//bmd.fillRect(bmd.rect, 0xFFFFFFFF);
			twn.tweenItem2State(bmp, 12, -1000, -1000, -1000, -1000, -1000, 0);
		}
		
		private function setButtonsNumbers():void 
		{
			var r:int = int(Math.random() * 5);
			for (var i:int = 0; i < 5; i++) {
				var btn:CountShapeButton = buttons[i] as CountShapeButton;
				if (r == i) {
					btn.awake(shapesDistribution[i], true);
				}
				else {
					var n:int = Routines.RandomNumberFromTo(shapesDistribution[i] / 2 - 1, shapesDistribution[i] * 2 + 1);
					if (n < 0) {
						n = Math.abs(n);
					}
					if (n == shapesDistribution[i]) {
						n++;
					}
					btn.awake(n, false);
				}
				SoundPlayer.PlayASoundID(SoundPlayer.SND_POP);
			}
		}
		
		private function resetShapesDistribution():void 
		{
			if (roundNum < 5) {
				var totSh:int = (roundNum + 1) * 3;
			}
			else {
				totSh = (10-roundNum) * 3;
			}
			
			for (var i:int = 0; i < 5; i++) {
				shapesDistribution[i] = 0;
			}
			
			for (i = 0; i < totSh; i++) {
				var r:int = int(Math.random() * 5);
				shapesDistribution[r]++;
			}
			
			for (i = 0; i < 5; i++) {
				shapes2Draw[i] = shapesDistribution[i];
			}	
			
			bmd.fillRect(bmd.rect, 0);
			bmp.alpha = 1;
			
			drawShapeTimer.repeatCount = totSh;
			
			for (i = 0; i < 15; i++) {
				takenPositions[i] = false;
			}
			
			for each (var btn:CountShapeButton in buttons) {
				btn.sleep();
			}
		}
		
		override public function registerListeners():void {
			if (!hasEventListener(MouseEvent.MOUSE_DOWN)) {
				addEventListener(MouseEvent.MOUSE_DOWN, onMouseDown);
			}
			//TODO: calc time
			
			if (!hasEventListener(Event.ENTER_FRAME)) {
				addEventListener(Event.ENTER_FRAME, onFrame);
			}
			
			
		}		
		
		private function onFrame(e:Event):void 
		{
			if (gamePhase == 2) {
				var t:int = getTimer() - tm0;
				dispatchEvent(new ScoreEvent(ScoreEvent.OTHER_INF, t, 2));
			}
		}
		
		private function onMouseDown(e:MouseEvent):void 
		{
			if (gamePhase == 2) {
				if (e.target is CountShapeButton) {
					var btn:CountShapeButton = e.target as CountShapeButton;
					if (btn.willBCorrect) {
						btn.showCorrect();
						var tm:int = getTimer() - tm0;
						trace('time:', tm);
						var scr:int = Routines.calcCountShapesScore(tm) / (errorNum + 1);
						SoundPlayer.PlayASoundID(SoundPlayer.SND_SUCCESS);
						
						dispatchEvent(new ScoreEvent(ScoreEvent.SCORE_ADD, scr, ScoreEvent.SCORE_ATT));
						setGamePhase(3);
						
					}
					else {
						btn.showWrong();
						SoundPlayer.PlayASoundID(SoundPlayer.SND_ERROR);
						errorNum++;
						roundErrors++;
						dispatchEvent(new ScoreEvent(ScoreEvent.OTHER_INF, errorNum, 1));
					}
				}
			}
		}
		

		
		override public function unRegisterListeners():void {
			if (hasEventListener(MouseEvent.MOUSE_DOWN)) {
				removeEventListener(MouseEvent.MOUSE_DOWN, onMouseDown);
			}
			if (hasEventListener(Event.ENTER_FRAME)) {
				removeEventListener(Event.ENTER_FRAME, onFrame);
			}
		}
		
		
	}
}

/*
						beginLevel called 16
TransitPages [object LevelSelectPage] [object GamePage]
time: 2117
time: 4617
time: 6867
time: 13644
time: 5149
level end! 44581
beginLevel called 16
time: 3211
time: 3204
time: 3886
time: 39013
time: 2498
level end! 62776
beginLevel called 16
time: 1639
time: 12566
time: 2028
time: 1203
time: 430
level end! 28373
beginLevel called 16
time: 1981
time: 419
time: 335
time: 1321
time: 1602
level end! 16283
beginLevel called 16
time: 1756
time: 4832
time: 3280
time: 2129
time: 6999
level end! 29485
						*/

						//SCORE:
	/*beginLevel called 14
time: 3908
time: 3404
time: 5760
time: 11436
time: 10080
beginLevel called 14
time: 3326
time: 7939
time: 3126
time: 7376
time: 10927
beginLevel called 14
time: 1656
time: 4050
time: 8843
time: 2865
time: 10251*/