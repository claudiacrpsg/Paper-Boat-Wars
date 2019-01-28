let tables = new Vue({
    el: "#myVue",
    data: {
      games: {},
      scores: {},
    player1: "",
    player2: "",
    users: "",
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
            this.user = data.currentPlayer.userName;
            console.log(this.user)
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

    },
     created(){
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