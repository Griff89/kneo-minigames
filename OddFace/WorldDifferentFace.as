package  
{
	import flash.events.Event;
	import flash.events.MouseEvent;
	import FigureSilouette;
	import flash.utils.getTimer;
	import world_different_face.OddFaceBGD;
	/**
	 * ...
	 * @author General
	 */
	public class WorldDifferentFace extends World
	{
		private var figures:Array;
		private var prevTime:int;
		
		private var foundNum:int;
		private var errorsNum:int;
		
		private var isCountingTime:Boolean;
		public function WorldDifferentFace() 
		{
			informersData = [
			//текст, иконка, цвет, конечно ли, максимум, макс высота, у
			['found:', 8, 1, true, 5, 100, 115],
			['errors:', 6, 2, false, 4, 100, 235],
			['time:', 5, 3, false, 10000, 100, 355]
			];				
			
		//	addChild(new OddFaceBGD());
			
			figures = new Array();
			for (var i:int = 0; i < 15; i++) {
				var fs:FigureSilouette;
				fs = new FigureSilouette();
				fs.arId = i;
				figures.push(fs);
				
				fs.x = 127 + int(i / 3) * 97;
				fs.y = 164 + (i % 3) * 97;
				addChild(fs);
			}
		}
		
		override public function onTimeStarted():void {
			prevTime = getTimer();
			isCountingTime = true;
		}
		
		override public function Init():void {
			var idsAr:Array = new Array();
			for (var i:int = 0; i < 15; i++) {
				idsAr.push(0);
			}
			
			for (var j:int = 0; j < 5; j++) {
				var rar:Array=[int(Math.random()*3),int(Math.random()*3),int(Math.random() * 3)];
				var id1:int = 0;
				for (var k:int = 0; k < 3; k++) {
					id1 *= 3;
					id1 += rar[k];
				}
				var r:int = int(Math.random() * 3);
				rar[r] += int(1 + 2 * Math.random());
				rar[r] %= 3;
				
				var id2:int = 0;
				for (k = 0; k < 3; k++) {
					id2 *= 3;
					id2 += rar[k];
				}
				r = int(Math.random() * 3);
				
				for (i = 0; i < 3; i++) {
					idsAr[3 * j + i] = id1;
					if (i == r) {
						idsAr[3 * j + i] = id2;
					}
				}
			}
			
			var fg:FigureSilouette;
			for (i = 0; i < 15; i++) {
				var fg:FigureSilouette = figures[i] as FigureSilouette;
				fg.reset(idsAr[i], 1);
			}
			errorsNum = 0;
			foundNum = 0;
			isCountingTime = false;
		
		}
		
		override public function registerListeners():void {
			if (!hasEventListener(MouseEvent.MOUSE_DOWN)) {
				addEventListener(MouseEvent.MOUSE_DOWN, onMouseDown);
			}
			if (!hasEventListener(Event.ENTER_FRAME)) {
				addEventListener(Event.ENTER_FRAME, onFrame);
			}				
		}
		
		private function onFrame(e:Event):void 
		{
			if (isCountingTime) {
				tmPassed = getTimer() - prevTime;
				dispatchEvent(new ScoreEvent(ScoreEvent.OTHER_INF, tmPassed, 2));
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
		//SCORE:
		/*beginLevel called 13
time: 926
time: 691
time: 1045
time: 783
time: 607
beginLevel called 13
time: 848
time: 710
time: 561
time: 685
time: 1421
beginLevel called 13
time: 955
time: 538
time: 593
time: 697
time: 753*/
		private function onMouseDown(e:MouseEvent):void 
		{
			if (e.target is FigureSilouette) {
				var fs:FigureSilouette = e.target as FigureSilouette;
				var id:int = fs.arId;
				var id0:int = id - id % 3;
				var equalsNum:int = 0;
				for (var i:int = id0; i < id0 + 3; i++) {
					if (fs.shapeId == (figures[i] as FigureSilouette).shapeId) {
						equalsNum++;
					}
				}
				if (equalsNum == 1) {
					fs.showCorrect();
					foundNum++;
					var tm:int = getTimer();
					var resTm:int = tm - prevTime;
					trace('time:', resTm);
					SoundPlayer.PlayASoundID(SoundPlayer.SND_SUCCESS);
					var scr:int = Routines.calcOddFaceScore(resTm); //SCORE:
					/*
					beginLevel called 15
TransitPages [object LevelSelectPage] [object GamePage]
time: 1139
time: 503
time: 568
time: 647
time: 641
level end! 126227
beginLevel called 15
time: 1043
time: 832
time: 1144
time: 1144
time: 1040
level end! 6251
beginLevel called 15
time: 554
time: 976
time: 1480
time: 600
time: 497
level end! 5995
beginLevel called 15
time: 731
time: 792
time: 3008
time: 1144
time: 768
level end! 12204
					 * */
					
					dispatchEvent(new ScoreEvent(ScoreEvent.SCORE_ADD, scr, ScoreEvent.SCORE_ATT));
					
					dispatchEvent(new ScoreEvent(ScoreEvent.OTHER_INF, foundNum, 0));
					prevTime = tm;
					if (foundNum == 5) {
						dispatchEvent(new ScoreEvent(ScoreEvent.GAME_END));
						isCountingTime = false;
					}
				}
				else {
					errorsNum++;
					fs.showError();
					SoundPlayer.PlayASoundID(SoundPlayer.SND_ERROR);
					dispatchEvent(new ScoreEvent(ScoreEvent.OTHER_INF, errorsNum, 1));
				}
			}
		}
		
		
		
	}

}