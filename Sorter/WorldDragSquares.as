package  
{
	import flash.events.MouseEvent;
	import flash.events.Event;
	import flash.geom.Point;
	import flash.geom.Rectangle;
	import world_drag_squares.DraggedSquare;
	import world_drag_squares.FutureSquareMarker;
	import world_drag_squares.ScoreInformer;
	import world_drag_squares.SquaresContainer;
	/**
	 * ...
	 * @author General
	 */
	public class WorldDragSquares extends World
	{
		private var boardFrom:SquaresContainer;
		private var boardTo:SquaresContainer;
		private var squares:Array;
		private var marker:FutureSquareMarker;
		private var scrInf:ScoreInformer;
		
		private var rectFrom:Rectangle;
		private var rectTo:Rectangle;
		
		private var tmpPt:Point;
		
		private var currentSquare:DraggedSquare;
		public function WorldDragSquares() 
		{
			scrInf = new ScoreInformer();
			addChild(scrInf);
			
			boardFrom = new SquaresContainer();
			boardFrom.x = 23;
			boardFrom.y = 195;
			boardFrom.tag = 1;
			addChild(boardFrom);
			rectFrom = boardFrom.getBounds(this);
			rectFrom.left -= 45; rectFrom.top -= 45; rectFrom.right += 45; rectFrom.bottom += 45;
			
			boardTo = new SquaresContainer();
			boardTo.x = 345;
			boardTo.y = 195;
			boardTo.tag = 2;
			addChild(boardTo);
			rectTo = boardTo.getBounds(this);
			rectTo.left -= 45; rectTo.top -= 45; rectTo.right += 45; rectTo.bottom += 45;
			
			tmpPt = new Point();
			
			squares = new Array();
			for (var i:int = 0; i < 36; i++ ) {
				var sq:DraggedSquare = new DraggedSquare();
				squares.push(sq);
				addChild(sq);
			}
			
			marker = new FutureSquareMarker();
		}
		override public function Init():void {

			marker.hide();

			scrInf.showScore(0);
			
			boardFrom.clearArray();
			boardTo.clearArray();
			
			var sq:DraggedSquare;
			var cx:int = 0;
			var cy:int = 0;
			for each (sq in squares) {
				sq.reset(cx, cy);
				boardFrom.fixSquarePlacement(cx, cy);
				cx+=2;
				if (cx >= 12) {
					cx = 0; cy+=2;
				}
			}
			currentSquare = null;
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
			
		}
		
		private function onMouseMove(e:MouseEvent):void 
		{
			if (currentSquare) {
				//check available place 2 drop
				tmpPt.x = currentSquare.x;
				tmpPt.y = currentSquare.y;
				var checkedContainer:SquaresContainer = null;
				if (rectFrom.containsPoint(tmpPt)) {
					checkedContainer = boardFrom;
				}
				else {
					if (rectTo.containsPoint(tmpPt)) {
						checkedContainer = boardTo;
					}
				}
				if (checkedContainer) {
					var fcx:int = int(((currentSquare.x - checkedContainer.x) / 22.5) + 0.5);
					var fcy:int = int(((currentSquare.y - checkedContainer.y) / 22.5) + 0.5);
					var canAccept:Boolean = checkedContainer.canPlaceSquare2Cell(fcx, fcy);
					marker.showAbility(canAccept);
					checkedContainer.placeSpriteOnBase(marker, fcx, fcy);
				}
			}
		}
		
		private function onMouseDown(e:MouseEvent):void 
		{
			if (e.target is DraggedSquare) {
				var ds:DraggedSquare = e.target as DraggedSquare;
				if (currentSquare) {
					//TODO: на всякий слуй, сбросить текущий
				}
				currentSquare = ds;
				addChild(currentSquare);
				currentSquare.startDrag();
				if (currentSquare.wasFromLeft) {
					boardFrom.clearSquarePosition(currentSquare.cell_x, currentSquare.cell_y);
				}
				else {//может, передумать и разрешить перетаскивать и влево, поэтому путь будет
					boardTo.clearSquarePosition(currentSquare.cell_x, currentSquare.cell_y);
				}
				SoundPlayer.PlayASoundID(SoundPlayer.SND_GAME_TAKE_TILE);
			}
		}
		
		private function onMouseUp(e:MouseEvent):void 
		{
			if (currentSquare) {
				currentSquare.stopDrag();
				dropCurrentSquare();				
				
				currentSquare = null;
			}
		}
		
		private function dropCurrentSquare():void 
		{
			if (marker.parent) {//заранее при двуижении вы вычислили положение, куда упадёт квадрат
				if (marker.isAllowed) {
					var destBoard:SquaresContainer = (marker.tag == 1)?boardFrom:boardTo;
					destBoard.fixSquarePlacement(marker.cell_x, marker.cell_y);
					currentSquare.placeOnMarker(marker);
					if (marker.tag != 1) {
						dispatchEvent(new Event('correctAction'));
					}					
					SoundPlayer.PlayASoundID(SoundPlayer.SND_GAME_DROP_TILE);
				}
				else {//домой
					currentSquare.tweenHome();
					destBoard = (currentSquare.wasFromLeft)?boardFrom:boardTo;
					destBoard.fixSquarePlacement(currentSquare.cell_x, currentSquare.cell_y);
					SoundPlayer.PlayASoundID(SoundPlayer.SND_GAME_WRONG);
				}
			}
			else {//домой
				currentSquare.tweenHome();
				destBoard = (currentSquare.wasFromLeft)?boardFrom:boardTo;
				destBoard.fixSquarePlacement(currentSquare.cell_x, currentSquare.cell_y);
				SoundPlayer.PlayASoundID(SoundPlayer.SND_GAME_WRONG);
			}
			marker.hide();
		}

		override public function onTimeOver():void {
			if (currentSquare) {
				currentSquare.stopDrag();
				currentSquare = null;
			}			
		}		
		
		override public function showScore(scr:int):void {
			scrInf.showScore(scr);
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
		}
		
	}

}