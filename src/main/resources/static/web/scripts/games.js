getData();

function getData() {
    fetch("http://localhost:8080/api/games", {
    }).then(function (result) {
        return result.json()
    }).then(function (datta) {
 data = datta;
console.log(data);
createList();
    })
    }

    // function createList(data) {
    //     let games = document.getElementById("games");
    //     for (let i = 0; i < data.length; i++){
    //         var p1 = data[i].gamePlayer[0].player.userName;
    //         if(data[i].gamePlayer.length == 1){
    //             var p2 = "Waiting For An Opponent"
    //         }else {
    //             var p2 = data[i].gamePlayer[1].player.userName;
    //         }
    //         var date = new Date(data[i].create).toLocaleString();
    //         let li = document.createElement("li");
    //         li.innerHTML = `${date} ${p1} vs. ${p2}`;
    //         games.append(li);
    //     }
    // }

// function createList(){
//     var ol = document.getElementById("list");
//     for(var i = 0; i < data.length; i++ ){
//     var li = document.createElement("li");
//     var date = new Date(data[i].create).toLocaleDateString();
//     // li.append("Game created on " + date.toLocaleDateString());
//    var player = data[i].gamePlayers[0].player;
//    if(data[i].gamePlayers.length == 1){
//     var player2 = "Waiting for oponent";
//    }else{
//    var player2 = data[i].gamePlayers[1].player;
//    }
//    li.innerHTML = `${date} ${player} vs. ${player2}`;
// //    li.append(". Player: " + player.userName + " (" + player.email + ")");
//    }
//     ol.append(li);
//     }



function createList(){
    var ol = document.getElementById("list");
    for(var i = 0; i < data.length; i++ ){
    var li = document.createElement("li");
    var date = new Date(data[i].created);
    li.append("Game created on " + date.toLocaleDateString());
   for(j = 0; j < data[i].gamePlayers.length; j++){
   var player = data[i].gamePlayers[j].player;
//    if(gamePlayers.length == 1){
//     var player2 = "Waiting for oponent";
//    }else{
//    var player2 = data[i].gamePlayers[j].player;
//    }
//    li.innerHTML = `${date} ${p1} vs. ${p2}`;
   li.append(". Player: " + player.userName + " (" + player.email + ")");
   }
    ol.append(li);
    }
}

