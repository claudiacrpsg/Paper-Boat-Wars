// getData();

// function getData() {
//     fetch("http://localhost:8080/api/games", {
//     }).then(function (result) {
//         return result.json()
//     }).then(function (datta) {
//  data = datta;
// console.log(data);
// createList();
//     })
//     }

// function createList(){
//     var ol = document.getElementById("list");
//     for(var i = 0; i < data.length; i++ ){
//     var li = document.createElement("li");
//     var date = new Date(data[i].created);
//     li.append("Game created on " + date.toLocaleDateString());
//    for(j = 0; j < data[i].gamePlayers.length; j++){
//    var player = data[i].gamePlayers[j].player;
//    li.append(". Player: " + player.userName + " (" + player.email + ")");
//    }
//     ol.append(li);
//     }
// }





let leaderboard = new Vue({
    el: "#leaderboard",
    data: {
      data: {},
      scores: {},
    },
    methods: {
        getData: function () {
            fetch('/api/games')
                .then((res) => res.json())
                .then((json) => {
                    this.data = json;
                    console.log(this.data);
                    // this.getData(this.data)
                this.getGameList(this.data);
                })
                .catch((err) => {
                    console.log(err);
                })
            },
        getGameList: function (data){
            var ol = document.getElementById("list");
            for(var i = 0; i < data.length; i++ ){
            var li = document.createElement("li");
            var date = new Date(data[i].created);
            li.append("Game created on " + date.toLocaleDateString());
           for(j = 0; j < data[i].gamePlayers.length; j++){
           var player = data[i].gamePlayers[j].player;
           li.append(". Player: " + player.userName + " (" + player.email + ")");
           }
            ol.append(li);
            }
        }
    },

    getScores: function () {
        fetch('/api/leaderboard')
            .then((res) => res.json())
            .then((json) => {
                this.data = json;
                leaderboard.scores = data;
                console.log(this.scores);
            })
            .catch((err) => {
                console.log(err);
            })
        },


     created(){
this.getData();
this.getGameList();
this.getScores();
     }

        
});











// var body = document.getElementById(id)
// var members = member;
// for (var i = 0; i < members.length; i++) {
//     const row = document.createElement("tr");
//     var fullName = members[i].first_name + " " + members[i].last_name;
//     var a = document.createElement("a");
//     var link = members[i].url;
//     a.setAttribute("href", link);
//     a.setAttribute("target", "_blank");
//     a.innerHTML = fullName;
//     row.insertCell().append(a);
//     row.insertCell().innerHTML = members[i][prop1];
//     row.insertCell().innerHTML = members[i][prop2];
//     body.append(row);
// }