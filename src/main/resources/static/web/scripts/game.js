let shipGrid = new Vue({
    el: "#shipGrid",
    data: {
        numbers: [" ","1","2","3","4","5","6","7","8","9","10"],
        letters: [" ","A","B","C","D","E","F","G","H","I","J"],
     
        data: "",
        gp: "",
        gamePlayer1: "",
        gamePlayer2: ""
    },
    methods: {
        getId: function () {
            var url = new URL(window.location.href);
            this.gp = url
                .searchParams
                .get("gp");
            this.getData();
        },
        getData: function () {
            fetch('/api/game_view/' + this.gp)
                .then((res) => res.json())
                .then((json) => {
                    this.data = json;
                    console.log(this.data);
                    this.colorThisSquare(this.data);
                    this.getGPlayers(this.data);
                    this.getSalvoes(this.data);
                    this.getEnemySalvoes(this.data);
                    this.hitOrMiss(this.data);
                })
                .catch((err) => {
                    console.log(err);
                })
            },
        colorThisSquare: function (data) {
            var ships = data.Ships;
            for (j = 0; j < ships.length; j++) {
                for (i = 0; i < data.Ships[j].Location.length; i++) {
                document.getElementById(data.Ships[j].Location[i]).className += "ships";
                }
            }
        },
        getGPlayers: function (data) {
            var id = this.gp;
            // console.log(id);
            for (i = 0; i < data.GamePlayers.length; i++) {
              if(data.GamePlayers[i].id == id){
                this.gamePlayer1 = data.GamePlayers[i].player.userName;
                }else{
                    this.gamePlayer2 = data.GamePlayers[i].player.userName;
                  
                }
                if(data.GamePlayers.length == 1){
                    this.gamePlayer2 = "Waiting for opponent";
                }
            }
        },
      getSalvoes: function (data){
          for(i=0; i<data.Salvoes.length; i++){
              for(j=0; j<data.Salvoes[i].SalvoLocation.length; j++){ 
              document.getElementById(data.Salvoes[i].SalvoLocation[j] + "s").className += "salvoes";
          }
        }
      },
      getEnemySalvoes: function (data){
        for(i=0; i<data.EnemySalvoes.length; i++){
            for(j=0; j<data.EnemySalvoes[i].SalvoLocation.length; j++){ 
            document.getElementById(data.EnemySalvoes[i].SalvoLocation[j]).className += "enemySalvoes";
            // console.log(data.EnemySalvoes[i].SalvoLocation[j])
        }
      }
    },
    hitOrMiss: function(data){
        for(d=0; d< data.Ships.length; d++){
            console.log(data.Ships);
            for(v=0; v< data.EnemySalvoes.length; v++){
                console.log(data.EnemySalvoes)
                if(data.Ships[d].Location[d] == data.EnemySalvoes[v].SalvoLocation[v]){
                    document.getElementById(data.EnemySalvoes[v].SalvoLocation[v]).className += "hit";
                    console.log(data.Ships[d].Location[d])
                }
            }
        }
    }
    },
    created: function () {
        this.getId();
    }
});



//Table in Javascript
// function grid() {    var body = document.getElementById("tbody");    var
// numbers = [" ","1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];    var
// letters = [" ", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
//
// for (var i = 0; i < numbers.length; i++) {       var row =
// document.createElement("tr");       for (var j = 0; j < letters.length; j++){
// var cell = document.createElement("td");          if(i == 0){
// cell.append(numbers[j]);          }          if(j == 0){
// cell.append(letters[i]);          }       row.append(cell);
// cell.setAttribute("id", letters[i] + numbers[j]);
// row.setAttribute("class", "row");       }       body.append(row);    } }
