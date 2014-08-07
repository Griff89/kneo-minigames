/**
 * ...
 * @author General
 */

Rail = function(game, checkCallback, lostCallback) {
	this.game = game;
	this.checkCallback = checkCallback;
	this.lostCallback = lostCallback;
	this.tokens = [];
	this.content = null;
	this.bgd = null;
	this.lCover = null;
	this.rCover = null;
	this.side = 0;
	
	this.mostRightToken = null;
	this.mostRightTokenTravelled = 0;
	
	this.mostProbableItem = 0;
	
	this.maxTokens = 9;
	this.arId = 0;
}

Rail.prototype = {
	fun2: function () {
		////console.log('Rail f2 ');
	},
	reset: function () {
		for (var i=0; i<this.maxTokens; i++){
			this.tokens[i].isOutOfScreen = true;
			this.tokens[i].back2Pool();
		}
		this.mostRightToken = null;
		this.mostRightTokenTravelled = 0;
		
	},
	init: function (id,ay) {
		////console.log('Rail init '+ay);
		this.arId  = id;
		
		this.content = this.game.add.group();
		this.content.y = ay;
		////console.log(this.game.add);
		this.bgd = this.game.add.sprite(32,0,'PIC_HOLDER_BASE',0,this.content);
		
		this.bgd.anchor.setTo(0,0.5);
		
		for (var i=0; i<this.maxTokens; i++){
			var tk = new SearchedToken(this.game);
			tk.init(this.content);
			this.tokens.push(tk);
			tk.bgd.inputEnabled = true;
			tk.bgd.input.start(0, true);
			tk.bgd.events.onInputDown.add(this.onTKClick, this);
			
			tk.arId = 100*this.arId+i;
		}
		
		this.lCover = this.game.add.sprite(0,0,'PIC_HOLDER_SIDE',0,this.content);		
		this.lCover.anchor.setTo(0,0.5);		
		
		this.rCover = this.game.add.sprite(1000,0,'PIC_HOLDER_SIDE',1,this.content);		
		this.rCover.anchor.setTo(1,0.5);
		
		this.side = (id%2==0)?1:-1;
	},
	step: function (dt) {
		////console.log('Rail step '+dt);
		for (var i=0; i<this.maxTokens; i++){
			var tk = this.tokens[i];
			if (!tk.isOutOfScreen){
				var tkOut = tk.step(dt, this.side, 1);
				if (tkOut){
					this.lostCallback(tk);
				}
				
				
				if (tk==this.mostRightToken){
					this.mostRightTokenTravelled+=tk.vx*dt;
				}
			}
		}
		////console.log(this.mostRightTokenTravelled);
		//выходит новый
		var nxtTk = null;
		if ((this.mostRightToken==null)||(this.mostRightTokenTravelled>=120)){
		//	////console.log('adding new');
			for (var i=0; i<this.maxTokens; i++){
				var tk = this.tokens[i];
				if (tk.isOutOfScreen){
					nxtTk = tk;
					break;
				}
			}
			if (nxtTk){
			//	////console.log('FOUND');
				this.mostRightToken = nxtTk;
				this.mostRightTokenTravelled = 0;
				nxtTk.appear(this.side, this.content.y, this.mostProbableItem, this.itemProb);	
				
			}

		}
	},
	removeToken: function (tk) {
		//////console.log('removeToken '+tk.arId);
		//////console.log(tk);
		var b = this.checkCallback(tk);
		var twn = this.game.add.tween(tk.content.scale);
		if (b){
			
			twn.onComplete.add(tk.back2Pool, tk);
			twn.to({x:0, y:0},500);
			
		}
		else{
			twn.to({x:0.9, y:0.9},300,null,false,0,0,true);
		}
		twn.start();
		//////console.log('twn created');
		//////console.log(twn);
		
		//////console.log('twn TO');
		
		//////console.log('twn STARTED');
		
	},
	onTKClick: function (item, pointer) {
		////console.log('onTKClick '+item.owner.arId);
		
		this.removeToken(item.owner);
	},
	hide: function () {
		this.content.visible = false;
	},
	show: function () {
		this.content.visible = true;
	},
	setMostProbableItem: function (itm, prob) {
		this.mostProbableItem = itm;
		this.itemProb = prob;
	},
	backStep: function (dt) {
	//	////console.log('Rail step '+dt);
		for (var i=0; i<this.maxTokens; i++){
			var tk = this.tokens[i];
			if (!tk.isOutOfScreen){
				//tk.backStep(dt, this.side, 1);
				tk.step(-7*dt, this.side, 1);
			}
		}
		this.mostRightToken = null;
	},
	f3: function () {
		////console.log('f3');
	}
}