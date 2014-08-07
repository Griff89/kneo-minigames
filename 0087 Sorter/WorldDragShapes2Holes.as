package  
{
	import flash.events.Event;
	import flash.events.MouseEvent;
	import flash.geom.Point;
	import world_drag_shapes_2holes.GeomHole;
	import GeomShape;
	import flash.utils.getTimer;
	/**
	 * ...
	 * @author General
	 */
	public class WorldDragShapes2Holes extends World
	{
		private var holes:Array;
		private var shp:GeomShape;
		
		private var tm0:int;
		private var errors:int;
		private var shownShapes:int;
		
		private var phaseId:int;
		
		private var isDragging:Boolean;
		private var deltaCoords:Point;
		private var isCountingTime:Boolean;
		private var hasMovedThisFrame:Boolean;
		public function WorldDragShapes2Holes()
		{
			informersData = [
			//текст, иконка, цвет, конечно ли, максимум, макс высота, у
			['round:', 8, 1, true, 10, 100, 115],
			['errors:', 6, 2, false, 4, 100, 235], 
			['time:', 5, 3, false, 10000, 100, 355]
			];
			
			shp = new GeomShape();
			shp.x = 320;
			shp.y = 230;
			addChild(shp);
			shp.addEventListener("twnComplete", onAlphaTweenComplete);
			
			deltaCoords = new Point();
			
			holes = new Array();
			for (var i:int = 0; i < 5; i++) {
				var hl:GeomHole = new GeomHole(i + 1);
				hl.x = 320 + 150 * Math.sin(i * 2 * Math.PI / 5);
				hl.y = 230 + 150 * Math.cos(i * 2 * Math.PI / 5);
				addChild(hl);
				holes.push(hl);
			}			
		}
		
		private function onAlphaTweenComplete(e:Event):void 
		{
			if (phaseId == 2) {
				if (shownShapes < 10) {
					showShape();
				}
				else {
					dispatchEvent(new ScoreEvent(ScoreEvent.GAME_END));
					isCountingTime = false;
				}
			}
		}
		
		override public function Init():void {
			shownShapes = 0;
			errors = 0;
			phaseId = 1;
			
			shp.visible = false;
			shp.x = 320;
			shp.y = 230;
			
			isDragging = false;
			isCountingTime = false;
			
			hasMovedThisFrame = false;
		
		}
		
		override public function onTimeStarted():void {
			showShape();
			isCountingTime = true;
		}
		
		private function showShape():void 
		{
			shp.x = 320;
			shp.y = 230;
			
			shp.resetShapeAndColor(shp.shapesNum * Math.random() + 1, 5 * Math.random() + 1);
			shp.rotation = 0;
			shp.alphaShow();
			shp.visible = true;
			
			shownShapes++;
			dispatchEvent(new ScoreEvent(ScoreEvent.OTHER_INF, shownShapes, 0));
			phaseId = 1;
			tm0 = getTimer();
			SoundPlayer.PlayASoundID(SoundPlayer.SND_QUESTION);
		}
		
		override public function registerListeners():void {
			if (!hasEventListener(MouseEvent.MOUSE_MOVE)) {
				addEventListener(MouseEvent.MOUSE_MOVE, onMouseMove);
			}
			
			if (!hasEventListener(MouseEvent.MOUSE_DOWN)) {
				addEventListener(MouseEvent.MOUSE_DOWN, onMouseDown);
			}
			
			if (!hasEventListener(MouseEvent.MOUSE_UP)) {
				addEventListener(MouseEvent.MOUSE_UP, onMouseUp);
			}
			if (!hasEventListener(Event.ENTER_FRAME)) {
				addEventListener(Event.ENTER_FRAME, onFrame);
			}			
		}
		
		private function onMouseMove(e:MouseEvent):void 
		{
			if (isDragging) {
				shp.x = e.stageX - deltaCoords.x;
				shp.y = e.stageY - deltaCoords.y;
				hasMovedThisFrame = true;
			}
		}
		
		private function onMouseDown(e:MouseEvent):void 
		{
			if (phaseId == 1) {
				if (e.target == shp) {
					isDragging = true;
					deltaCoords.x = e.stageX - shp.x;
					deltaCoords.y = e.stageY - shp.y;
				}
			}
		}
		
		
		private function onFrame(e:Event):void 
		{
			if (isCountingTime) {
				var tmPassed:int = getTimer() - tm0;
				dispatchEvent(new ScoreEvent(ScoreEvent.OTHER_INF, tmPassed, 2));
			}
			
			if (hasMovedThisFrame) {
				SoundPlayer.PlayASoundID(SoundPlayer.SND_CHESS_MOVE_LONG);
			}
			else {
				SoundPlayer.StopASoundD(SoundPlayer.SND_CHESS_MOVE_LONG);
			}
			hasMovedThisFrame = false;			
		}		
		
		private function onMouseUp(e:MouseEvent):void 
		{
			
			if (isDragging) {
				var hl:GeomHole = findClosestHole();
			
				if (hl.shapeId == shp.shapeId) {
					var d:Number = Routines.GetDistanceBetween(shp.x, shp.y, hl.x, hl.y);
					var dt:int = getTimer() - tm0;
					shp.alphaHide();
					var dScr:int = Routines.calcAccDragScore(d);
					var tScr:int = Routines.calcPrecDragScore(dt);
					trace('dist:', d);
					trace('time:',dt);
					dispatchEvent(new ScoreEvent(ScoreEvent.SCORE_ADD, dScr, ScoreEvent.SCORE_PREC));
					dispatchEvent(new ScoreEvent(ScoreEvent.SCORE_ADD, tScr, ScoreEvent.SCORE_REAC));
					SoundPlayer.PlayASoundID(SoundPlayer.SND_SUCCESS);
					
				}
				else {
					shp.showWrong();
					errors++;
					SoundPlayer.PlayASoundID(SoundPlayer.SND_ERROR);
					dispatchEvent(new ScoreEvent(ScoreEvent.OTHER_INF, errors, 1));
				}
				isDragging = false;
				phaseId = 2;
			}
		}
		
		private function findClosestHole():GeomHole 
		{
			var res:GeomHole = null;
			var d:int;
			for each (var hl:GeomHole in holes) {
				if (!res) {
					res = hl;
					d = Routines.GetDistanceBetween(shp.x, shp.y, hl.x, hl.y);
				}
				else {
					var d1:int = Routines.GetDistanceBetween(shp.x, shp.y, hl.x, hl.y);
					if (d1 < d) {
						d = d1;
						res = hl;
					}
				}
			}
			return res;
		}
		
		override public function unRegisterListeners():void {
			if (hasEventListener(MouseEvent.MOUSE_MOVE)) {
				removeEventListener(MouseEvent.MOUSE_MOVE, onMouseMove);
			}
			
			if (hasEventListener(MouseEvent.MOUSE_DOWN)) {
				removeEventListener(MouseEvent.MOUSE_DOWN, onMouseDown);
			}
			
			if (hasEventListener(MouseEvent.MOUSE_UP)) {
				removeEventListener(MouseEvent.MOUSE_UP, onMouseUp);
			}
			if (hasEventListener(Event.ENTER_FRAME)) {
				removeEventListener(Event.ENTER_FRAME, onFrame);
			}			
		}		
		
	}

}
//SCORE:
					/*dist: 1.0000000000000056
time: 1241
dist: 10.619910545762616
time: 1084
dist: 4.005621050473916
time: 907
dist: 6.876227163205147
time: 1263
dist: 16.28135436626816
time: 949
dist: 35.29589211225577
time: 901
dist: 8.354639429682155
time: 936
dist: 6.708203932499369
time: 1121
dist: 4.753945729601877
time: 1362
dist: 8.209750300709505
time: 858
beginLevel called
dist: 2.23606797749979
time: 1512
dist: 5.385164807134504
time: 961
dist: 4.049691346263316
time: 964
dist: 3.8209946349085717
time: 833
dist: 5.882176467941095
time: 915
dist: 14.103634283403688
time: 1077
dist: 17.776740421123314
time: 758
dist: 10
time: 1081
dist: 9.510257620064737
time: 899
dist: 1.4983324063771803
time: 876
beginLevel called
dist: 2.131900560532781
time: 1539
dist: 11.40175425099138
time: 768
dist: 9.055385138137417
time: 833
dist: 15.36050129390317
time: 917
dist: 7.4888250079702114
time: 1003
dist: 7.615773105863909
time: 1204
dist: 6.611542936410507
time: 1204
dist: 16.97888394447644
time: 943
dist: 4.123105625617661
time: 1019
dist: 8.06225774829855
time: 814*/