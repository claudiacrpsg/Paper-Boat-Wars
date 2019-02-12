let shipGrid = new Vue({
    el: "#shipGrid",
    data: {
        numbers: [" ", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
        letters: [" ", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J"],
        data: "",
        gp: "",
        gamePlayer1: "",
        gamePlayer2: "",
        shipLocation: [{
                type: "battleship",
                location: ["A1", "B1", "C1", "D1"]
            },
            {
                type: "submarine",
                location: ["B4", "B5", "B6"]
            },
            {
                type: "patrol-boat",
                location: ["H5", "I5"]
            },
            {
                type: "carrier",
                location: ["F1", "F2", "F3", "F4", "F5"]
            },
            {
                type: "destroyer",
                location: ["B10", "C10", "D10", "E10"]
            },
        ],
        shipLength: "",
        hover: "false",
        emptyGreen: [],
    },
    methods: {
        getId: function () {
            var url = new URL(window.location.href);
            this.gp = url
                .searchParams
                .get("gp");
            this.getData();
            console.log(this.gp)
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
            for (i = 0; i < data.GamePlayers.length; i++) {
                if (data.GamePlayers[i].id == id) {
                    this.gamePlayer1 = data.GamePlayers[i].player.userName;
                } else {
                    this.gamePlayer2 = data.GamePlayers[i].player.userName;
                }
                if (data.GamePlayers.length == 1) {
                    this.gamePlayer2 = "Waiting for opponent";
                }
            }
        },
        getSalvoes: function (data) {
            for (i = 0; i < data.Salvoes.length; i++) {
                for (j = 0; j < data.Salvoes[i].SalvoLocation.length; j++) {
                    document.getElementById(data.Salvoes[i].SalvoLocation[j] + "s").innerHTML = this.data.Salvoes[i].Turn;
                    if (document.getElementById(data.Salvoes[i].SalvoLocation[j] + "s").classList.contains("ships")) {
                        var img = document.createElement("img");
                        img.className = "fire";
                        img.src = "styles/fire.gif";
                        document.getElementById(data.Salvoes[i].SalvoLocation[j] + "s").append(img);
                    } else {
                        var img = document.createElement("img");
                        img.className = "water";
                        img.src = "styles/water-drop.gif";
                        document.getElementById(data.Salvoes[i].SalvoLocation[j] + "s").append(img);
                    }
                }
            }
        },
        getEnemySalvoes: function (data) {
            for (i = 0; i < data.EnemySalvoes.length; i++) {
                for (j = 0; j < data.EnemySalvoes[i].SalvoLocation.length; j++) {
                    document.getElementById(data.EnemySalvoes[i].SalvoLocation[j]).innerHTML = this.data.EnemySalvoes[i].Turn;
                    if (document.getElementById(data.EnemySalvoes[i].SalvoLocation[j]).classList.contains("ships")) {
                        var img = document.createElement("img");
                        img.className = "fire";
                        img.src = "styles/fire.gif";
                        document.getElementById(data.EnemySalvoes[i].SalvoLocation[j]).append(img);
                    } else {
                        var img = document.createElement("img");
                        img.className = "water";
                        img.src = "styles/water-drop.gif";
                        document.getElementById(data.EnemySalvoes[i].SalvoLocation[j]).append(img);
                    }
                }
            }
        },
        getShips: function () {
            fetch('/api/games/players/' + shipGrid.gp + '/ships', {
                credentials: 'include',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(
                    shipGrid.shipLocation
                )
            }).then(function (response) {
                return response.json();
            }).then(function (json) {
                console.log('parsed json', json)
                location.reload();
            }).catch(function (ex) {
                console.log('parsing failed', ex)
                alert("Error")
            });
        },
        getShipLengthYellow: function () {
            this.shipLength = 1;
            this.hover = true;
            console.log(this.shipLength)
        },
        getShipLengthOrange: function () {
            this.shipLength = 2;
            this.hover = true;
            console.log(this.shipLength)
        },
        getShipLengthRed: function () {
            this.shipLength = 3;
            this.hover = true;
            console.log(this.shipLength)
        },
        getShipLengthBlue: function () {
            this.shipLength = 4;
            this.hover = true;
            console.log(this.shipLength)
        },
        getShipLengthGreen: function () {
            this.shipLength = 5;
            this.hover = true;
            console.log(this.shipLength)
        },
        shipHover: function () {
            if (this.hover) {
                var letter = event.target.id.substr(0, 1);
                var number = event.target.id.substr(1, 2);
                for (var i = 0; i < this.shipLength; i++) {
                    var id = letter + (Number(number) + i);
                    if (this.shipLength == 1) {
                        document.getElementById(id).classList.add("yellow");
                    }
                    if (this.shipLength == 2) {
                        document.getElementById(id).classList.add("orange");
                    }
                    if (this.shipLength == 3) {
                        document.getElementById(id).classList.add("red");
                    }
                    if (this.shipLength == 4) {
                        document.getElementById(id).classList.add("blue");
                    }
                    if (this.shipLength == 5) {
                        document.getElementById(id).classList.add("green"); 
                    }
                } 
            }
        },
        shipClean: function () {
            var letter = event.target.id.substr(0, 1);
            var number = event.target.id.substr(1, 2);
            for (var i = 0; i < this.shipLength; i++) {
                var id = letter + (Number(number) + i);
                if (this.shipLength == 1) {
                    document.getElementById(id).classList.remove("yellow");
                }
                if (this.shipLength == 2) {
                    document.getElementById(id).classList.remove("orange");
                }
                if (this.shipLength == 3) {
                    document.getElementById(id).classList.remove("red");
                }
                if (this.shipLength == 4) {
                    document.getElementById(id).classList.remove("blue");
                }
                if (this.shipLength == 5) {
                    document.getElementById(id).classList.remove("green");
                }
            }
        },
        storeShipLocation: function () {
            if (this.hover) {
                var letter = event.target.id.substr(0, 1);
                var number = event.target.id.substr(1, 2);
                for (var i = 0; i < this.shipLength; i++) {
                    var id = letter + (Number(number) + i);
                    if (this.shipLength == 1) {
                        document.getElementById(id).classList.add("yellow2");
                        var btn = document.getElementById("yellowBtn");
                        btn.style.display = "none";
                    }
                    if (this.shipLength == 2) {
                        document.getElementById(id).classList.add("orange2");
                        var btn = document.getElementById("orangeBtn");
                        btn.style.display = "none";
                    }
                    if (this.shipLength == 3) {
                        document.getElementById(id).classList.add("red2");
                        var btn = document.getElementById("redBtn");
                        btn.style.display = "none";
                    }
                    if (this.shipLength == 4) {
                        document.getElementById(id).classList.add("blue2");
                        var btn = document.getElementById("blueBtn");
                        btn.style.display = "none";
                    }
                    if (this.shipLength == 5) {
                        document.getElementById(id).classList.add("green2");
                        var btn = document.getElementById("greenBtn");
                        btn.style.display = "none";
                }
                this.hover = false;
            }
        }
    },
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