(function(){
    if (parent.window.kw && parent.window.app && parent.window.app.getMediator) {
        this.PLAYER_ID = 1;

        this.setGameProgress = function(player_id, progress, cb) {
            this.doAPICall('onLevelUp', progress);
            cb();
        }
        this.increaseGameTime = function(playerId, timeToAdd, cb) {
        }
        this.increaseGameTimesPlayed = function(playerId, cb) {
        }

        this.doAPICall = function(name, progress) {
            parent.window.app.getMediator().trigger(name, 77, progress);
        }
        return
    }
    /* Set the following value based on your game id given to you by KNeoworld.com */
    this.GAME_ID = getUrlVars()["gameId"];
    /* The following value should be set based on the player's ID passed back from the login page */
    this.PLAYER_ID = getUrlVars()["playerId"];
    this.STATUS_NOT_READY = -1;
    this.STATUS_OK = 0;
    this.STATUS_ERROR = 1;
    this.KW_API_ROOT = "http://www.kneoworld.com/Play/api";
    this.CONFIGS_LOADED = false;

    function getUrlVars() {
        var vars = {};
        var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
            vars[key] = value;
        });
        return vars;
    }

    function loadConfigs(GAME_ID) {
        $.ajax({
            url: "http://www.kneoworld.com/startup.php?jsoncallback=?&gameID=" + GAME_ID,
            beforeSend: function( xhr ) {
                xhr.overrideMimeType( "text/plain; charset=x-user-defined" );
            }
        })
                .done(function( data ) {
                    var response = jQuery.parseJSON( data );
                    if (response && response.api_root) {
                        KW_API_ROOT = response.api_root;
                    }
                })
                .always(function() {
                    this.CONFIGS_LOADED = true;

                    //Uncomment the following line to run a test series of calls.
                    //testAPICalls();
                }.bind(this));
    }
    function testAPICalls() {
        $("#result").empty();
        //PLAYER_ID = $("#playerId").val();
        if (isNaN(this.PLAYER_ID)) {
            alert("player id must be numeric");
            return false;
        }
        this.setGameProgress(this.PLAYER_ID,1, function(responseStatus) {
            $("#result").append("setGameProgress:" + responseStatus + "<br>");
        });
        this.increaseGameTime(this.PLAYER_ID, 1, function(responseStatus) {
            $("#result").append("increaseGameTime:" + responseStatus + "<br>");
        });
        this.increaseGameTimesPlayed(this.PLAYER_ID, function(responseStatus) {
            $("#result").append("increaseGameTimesPlayed:" + responseStatus + "<br>");
        });
        return false;
    }
    this.setGameProgress = function(playerId, progress, cb) {
        var api_url = this.KW_API_ROOT + "/setlevel.php?player=" + playerId + "&gameId=" + this.GAME_ID + "&level=" + progress;
        this.doAPICall(api_url, cb);
    }
    this.increaseGameTime = function(playerId, timeToAdd, cb) {
        var api_url = this.KW_API_ROOT + "/increasetimeplayed.php?player=" + playerId + "&gameId=" + this.GAME_ID + "&timePlayed=" + timeToAdd;
        this.doAPICall(api_url, cb);
    }
    this.increaseGameTimesPlayed = function(playerId, cb) {
        var api_url = this.KW_API_ROOT + "/increasetimesplayed.php?player=" + playerId + "&gameId=" + this.GAME_ID;
        this.doAPICall(api_url, cb);
    }
    this.doAPICall = function(api_url, cb) {
        if (!this.CONFIGS_LOADED) {
            cb(this.STATUS_NOT_READY);
        }
        $.ajax({
            url: api_url,
            beforeSend: function( xhr ) {
                xhr.overrideMimeType( "text/plain; charset=x-user-defined" );
            }
        })
                .done(function( data ) {
                    var response = jQuery.parseJSON( data );
                    if (!response) {
                        //something went very wrong.
                        cb(this.STATUS_ERROR);
                    }
                    switch(response.status) {
                        case 0:
                            //Success!
                            cb(this.STATUS_OK);
                            break;
                        case 1:
                            //Failure!
                            cb(this.STATUS_ERROR);
                            break;
                    }
                }.bind(this))
                .always(function() {
                });
    }
    $(function(){
        loadConfigs(this.GAME_ID);
    });
})()