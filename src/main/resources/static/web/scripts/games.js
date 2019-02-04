let tables = new Vue({
   el: "#myVue",
   data: {
      games: {},
      scores: {},
      player1: "",
      player2: "",
      users: "",
      gpID: "",
      gp0: "",
   },
   methods: {
      getGames: function () {
         fetch('/api/games')
            .then((response) => {
               return response.json();
            })
            .then((data) => {
               tables.games = data;
               console.log(this.games);
               this.users = data.currentPlayer.userName;
               console.log(this.users);
            });
      },

      getScores: function () {
         fetch('/api/leaderboard')
            .then((response) => {
               return response.json();
            })
            .then((data) => {
               tables.scores = data;
               console.log(this.scores);

            });
      },

      getDates: function formatDate(date) {
         date = new Date(date);
         var monthNames = [
            "Jan", "Feb", "Mar",
            "Apr", "May", "Jun", "Jul",
            "Aug", "Sep", "Oct",
            "Nov", "Dec"
         ];
         var day = date.getDate();
         var monthIndex = date.getMonth();
         var year = date.getFullYear();
         return day + ' ' + monthNames[monthIndex] + ' ' + year;
      },

      logOut: function () {
         fetch('/api/logout', {
            method: 'POST',
         }).then(function (response) {
            location.replace("http://localhost:8080/web/index.html")
            return response.json();
         });
      },
      getGameView: function (gamePlayers) {
         if (gamePlayers[0].player.userName == this.users) {
            return gamePlayers[0].id;
         } else {
            return gamePlayers[1].id;
         }
      },

      createNewGame: function () {
            fetch('/api/games', {
               method: 'POST',
            }).then(function (response) {
               console.log(response)
               return response.json();
            }).then(function (data) {
               console.log(data)
               this.gp0 = data.gpId;
               window.location = "game.html?gp=" + this.gp0;
               console.log(this.gp0)
               return data.gpId;
            });
      },

      joinGame: function(gameId){
         fetch('/api/game/'+gameId+'/players', {
            method: 'POST',
         }).then(function (response) {
            console.log(response)
            return response.json();
         }).then(function (data) {
          window.location = "game.html?gp=" + data.gamePlayerID;
         });
      }
   },
   created() {
      this.getGames();
      this.getScores();
      },


});




// getGameList: function (data){
//     var firstBody = document.getElementById("firstBody");
//     for(var i = 0; i < data.length; i++ ){
//     var row = document.createElement("tr");
//     var date = new Date(data[i].created);
//     row.append(date.toLocaleDateString());
//    for(j = 0; j < data[i].gamePlayers.length; j++){
//    var player = data[i].gamePlayers[j].player;
//    row.append(". Player: " + player.userName + " (" + player.email + ")");
//    }
//     firstBody.append(row);
//     }
// }