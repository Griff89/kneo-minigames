package  
{
	import flash.events.MouseEvent;
	import flash.events.Event;
	import world_chess_knight.ChessBoard;
	import world_chess_knight.Coin;
	import world_chess_knight.KinghtTrack;
	import world_chess_knight.KnightFigure;
	import world_chess_knight.KnightMoveMarker;
	/**
	 * ...
	 * @author General
	 */
	public class WorldChessKnight extends World
	{
		private var board:ChessBoard;
		private var coins:Array;
		private var knight:KnightFigure;
	//	private var track: KinghtTrack;
		public function WorldChessKnight() 
		{
			board = new ChessBoard();
			addChild(board);
			coins = new Array();
			knight = new KnightFigure();
	//		track = new KinghtTrack();
			//сначала будем динамически создавать, а потом загоним в пул
			for (var i:int = 0; i < 8; i++ ) {
				for (var j:int = 0; j < 8; j++ ) {
					var cn:Coin = new Coin();
					cn.x = 250 + 50 * i;
					cn.y = 90 + 50 * j;
					coins.push(cn);
					addChild(cn);
				}
			}
			addChild(knight);
		}
		
		override public function Init():void {
			for (var i:int = 0; i < 8; i++ ) {
				for (var j:int = 0; j < 8; j++ ) {
					var cn:Coin = coins[8 * i + j];
					cn.show(this);
				}
			}
			knight.placeAtCell(0, 7);
			(coins[8 * 0 + 7] as Coin).hide();
			
			board.showScore(0);
			board.showKnigtsAllowedMoves(knight.cell_x, knight.cell_y);
		}
		
		override public function showScore(scr:int):void {
			board.showScore(scr);
		}		
		
		override public function registerListeners():void {
			if (!board.hasEventListener(MouseEvent.MOUSE_DOWN)) {
				board.addEventListener(MouseEvent.MOUSE_DOWN, onBoardDown);
			}			
		}
		
		override public function unRegisterListeners():void {
			if (board.hasEventListener(MouseEvent.MOUSE_DOWN)) {
				board.removeEventListener(MouseEvent.MOUSE_DOWN, onBoardDown);
			}
		}		
		
		private function onBoardDown(e:MouseEvent):void 
		{
			if (e.target is KnightMoveMarker) {
				var km:KnightMoveMarker = e.target as KnightMoveMarker;
				var tr:KinghtTrack = new KinghtTrack();
				tr.showMovement(knight.cell_x, knight.cell_y, km.cell_x, km.cell_y);
				addChild(tr);
				knight.placeAtCell(km.cell_x, km.cell_y);
				addChild(knight);
				
				SoundPlayer.PlayASoundID(SoundPlayer.SND_GAME_MOVE_KNIGHT);
				
				var cn:Coin = coins[8 * km.cell_x + km.cell_y];
				if (cn.isOnBoard) {
					cn.hide();
					dispatchEvent(new Event('correctAction'));
					SoundPlayer.PlayASoundID(SoundPlayer.SND_GAME_COIN);
				}
				board.showKnigtsAllowedMoves(knight.cell_x,knight.cell_y);
			}

		}
		
	}

}