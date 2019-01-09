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


function createList(){
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

