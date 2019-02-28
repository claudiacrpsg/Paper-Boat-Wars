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
                location: []
            },
            {
                type: "submarine",
                location: []
            },
            {
                type: "patrol-boat",
                location: []
            },
            {
                type: "carrier",
                location: []
            },
            {
                type: "destroyer",
                location: []
            },
        ],
        salvoLocations: [],
        shipLength: "",
        hover: false,
        overlap: false,
        vertical: false,
        showButtons: false,
        salvoHover: false,
        fire: "",
    },
    computed: {
        allTheShips: function () {
            let placedShips = this.shipLocation.filter(ship => ship.location.length > 0);
            return placedShips.length == 5;
        },


        allTheSalvos: function () {
            let placedSalvos = this.salvoLocation.filter(salvo => salvo.location.length > 0);
            return placedSalvos.length == 3;
        },

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

                    this.positionShips(this.data);
                    this.getGPlayers(this.data);
                    this.getSalvoes(this.data);
                    this.getEnemySalvoes(this.data);
                })
                .catch((err) => {
                    console.log(err);
                })
        },
        positionShips: function (data) {
            var ships = data.Ships;
            if (data.Ships.length == 0) {
                this.showButtons = true;
            } else {
                this.showButtons = false;
            }
            console.log(ships)
            for (j = 0; j < ships.length; j++) {
                for (i = 0; i < data.Ships[j].Location.length; i++) {
                    if (data.Ships[j].Location.length == 1) {
                        document.getElementById(data.Ships[j].Location[i]).classList.add("yellow");
                    }
                    if (data.Ships[j].Location.length == 2) {
                        document.getElementById(data.Ships[j].Location[i]).classList.add("orange");
                    }
                    if (data.Ships[j].Location.length == 3) {
                        document.getElementById(data.Ships[j].Location[i]).classList.add("red");
                    }
                    if (data.Ships[j].Location.length == 4) {
                        document.getElementById(data.Ships[j].Location[i]).classList.add("blue");
                    }
                    if (data.Ships[j].Location.length == 5) {
                        document.getElementById(data.Ships[j].Location[i]).classList.add("green");
                    }
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
                    // document.getElementById(data.Salvoes[i].SalvoLocation[j] + "s").innerHTML = this.data.Salvoes[i].Turn;
                    // if (document.getElementById(data.EnemySalvoes[i].SalvoLocation[j] + "s").classList.contains("yellow")
                    // || document.getElementById(data.EnemySalvoes[i].SalvoLocation[j] + "s").classList.contains("orange")
                    // || document.getElementById(data.EnemySalvoes[i].SalvoLocation[j] + "s").classList.contains("red")
                    // || document.getElementById(data.EnemySalvoes[i].SalvoLocation[j] + "s").classList.contains("blue")
                    // || document.getElementById(data.EnemySalvoes[i].SalvoLocation[j] + "s").classList.contains("green")) {
                    //     var img = document.createElement("img");
                    //     img.className = "fire";
                    //     img.src = "styles/flame.png";
                    //     document.getElementById(data.Salvoes[i].SalvoLocation[j] + "s").append(img);
                    // } else {
                    //     var img = document.createElement("img");
                    //     img.className = "water";
                    //     img.src = "styles/sea.png";
                    //     document.getElementById(data.Salvoes[i].SalvoLocation[j] + "s").append(img);
                    // }
                }
            }
        },
        getEnemySalvoes: function (data) {
            for (i = 0; i < data.EnemySalvoes.length; i++) {
                for (j = 0; j < data.EnemySalvoes[i].SalvoLocation.length; j++) {
                    // document.getElementById(data.EnemySalvoes[i].SalvoLocation[j]).innerHTML = this.data.EnemySalvoes[i].Turn;
                    if (document.getElementById(data.EnemySalvoes[i].SalvoLocation[j]).classList.contains("yellow")
                    || document.getElementById(data.EnemySalvoes[i].SalvoLocation[j]).classList.contains("orange")
                    || document.getElementById(data.EnemySalvoes[i].SalvoLocation[j]).classList.contains("red")
                    || document.getElementById(data.EnemySalvoes[i].SalvoLocation[j]).classList.contains("blue")
                    || document.getElementById(data.EnemySalvoes[i].SalvoLocation[j]).classList.contains("green")) {
                        var img = document.createElement("img");
                        img.className = "fire";
                        img.src = "styles/flame.png";
                        document.getElementById(data.EnemySalvoes[i].SalvoLocation[j]).append(img);
                    } else {
                        var img = document.createElement("img");
                        img.className = "water";
                        img.src = "styles/sea.png";
                        document.getElementById(data.EnemySalvoes[i].SalvoLocation[j]).append(img);
                    }
                }
            }
        },
        // hits: function(){
        //     if
        // },
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
                console.log(json)
                location.reload();
            }).catch(function (ex) {
                console.log('parsing failed', ex)
                alert("Error")
            });
        },
        getShipLengthYellow: function () {
            this.shipLength = 1;
            this.hover = true;
        },
        getShipLengthOrange: function () {
            this.shipLength = 2;
            this.hover = true;
        },
        getShipLengthRed: function () {
            this.shipLength = 3;
            this.hover = true;
        },
        getShipLengthBlue: function () {
            this.shipLength = 4;
            this.hover = true;
        },
        getShipLengthGreen: function () {
            this.shipLength = 5;
            this.hover = true;
        },
        itsVertical: function () {
            this.vertical = true;
        },
        itsHorizontal: function () {
            this.vertical = false;
        },
        shipHover: function () {
            this.overlap = false;
            if (this.hover == true) {
                var letter = event.target.id.substr(0, 1);
                var number = event.target.id.substr(1, 2);
                if (this.vertical == false) {
                    for (var i = 0; i < this.shipLength; i++) {
                        var id = letter + (Number(number) + i);
                        if (!document.getElementById(id)) {
                            this.overlap = true;
                        }
                        if (document.getElementById(id).classList.contains("yellow2")) {
                            this.overlap = true;
                        }
                        if (document.getElementById(id).classList.contains("orange2")) {
                            this.overlap = true;
                        }
                        if (document.getElementById(id).classList.contains("red2")) {
                            this.overlap = true;
                        }
                        if (document.getElementById(id).classList.contains("blue2")) {
                            this.overlap = true;
                        }
                        if (document.getElementById(id).classList.contains("green2")) {
                            this.overlap = true;
                        }
                    }
                    if (!this.overlap) {
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
                }
                if (this.vertical == true) {
                    for (var i = 0; i < this.shipLength; i++) {
                        var id = this.letters[this.letters.indexOf(letter) + i] + number;
                        if (!document.getElementById(id)) {
                            this.overlap = true;
                        }
                        if (document.getElementById(id).classList.contains("yellow2")) {
                            this.overlap = true;
                        }
                        if (document.getElementById(id).classList.contains("orange2")) {
                            this.overlap = true;
                        }
                        if (document.getElementById(id).classList.contains("red2")) {
                            this.overlap = true;
                        }
                        if (document.getElementById(id).classList.contains("blue2")) {
                            this.overlap = true;
                        }
                        if (document.getElementById(id).classList.contains("green2")) {
                            this.overlap = true;
                        }
                    }
                    if (!this.overlap) {
                        for (var i = 0; i < this.shipLength; i++) {
                            var id = this.letters[this.letters.indexOf(letter) + i] + number;
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
                }
            }
        },
        shipClean: function () {
            var letter = event.target.id.substr(0, 1);
            var number = event.target.id.substr(1, 2);
            if (this.vertical == false) {
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
            }
            if (this.vertical == true) {
                for (var i = 0; i < this.shipLength; i++) {
                    var id = this.letters[this.letters.indexOf(letter) + i] + number;
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
            }
        },
        storeShipLocation: function () {
            if (this.hover) {
                var letter = event.target.id.substr(0, 1);
                var number = event.target.id.substr(1, 2);
                if (this.vertical == false) {
                    for (var i = 0; i < this.shipLength; i++) {
                        var id = letter + (Number(number) + i);
                        if (!this.overlap) {
                            if (this.shipLength == 1) {
                                document.getElementById(id).classList.add("yellow2");
                                var btn = document.getElementById("yellowBtn");
                                btn.style.display = "none";
                                this.shipLocation[0].location.push(id);
                            }
                            if (this.shipLength == 2) {
                                document.getElementById(id).classList.add("orange2");
                                var btn = document.getElementById("orangeBtn");
                                btn.style.display = "none";
                                this.shipLocation[1].location.push(id);
                            }
                            if (this.shipLength == 3) {
                                document.getElementById(id).classList.add("red2");
                                var btn = document.getElementById("redBtn");
                                btn.style.display = "none";
                                this.shipLocation[2].location.push(id);
                            }
                            if (this.shipLength == 4) {
                                document.getElementById(id).classList.add("blue2");
                                var btn = document.getElementById("blueBtn");
                                btn.style.display = "none";
                                this.shipLocation[3].location.push(id);
                            }
                            if (this.shipLength == 5) {
                                document.getElementById(id).classList.add("green2");
                                var btn = document.getElementById("greenBtn");
                                btn.style.display = "none";
                                this.shipLocation[4].location.push(id);
                            }
                        }
                    }
                    this.hover = false;
                }

                if (this.vertical == true) {
                    for (var i = 0; i < this.shipLength; i++) {
                        var id = this.letters[this.letters.indexOf(letter) + i] + number;
                        if (!this.overlap) {
                            if (this.shipLength == 1) {
                                document.getElementById(id).classList.add("yellow2");
                                var btn = document.getElementById("yellowBtn");
                                btn.style.display = "none";
                                this.shipLocation[0].location.push(id);
                            }
                            if (this.shipLength == 2) {
                                document.getElementById(id).classList.add("orange2");
                                var btn = document.getElementById("orangeBtn");
                                btn.style.display = "none";
                                this.shipLocation[1].location.push(id);
                            }
                            if (this.shipLength == 3) {
                                document.getElementById(id).classList.add("red2");
                                var btn = document.getElementById("redBtn");
                                btn.style.display = "none";
                                this.shipLocation[2].location.push(id);
                            }
                            if (this.shipLength == 4) {
                                document.getElementById(id).classList.add("blue2");
                                var btn = document.getElementById("blueBtn");
                                btn.style.display = "none";
                                this.shipLocation[3].location.push(id);
                            }
                            if (this.shipLength == 5) {
                                document.getElementById(id).classList.add("green2");
                                var btn = document.getElementById("greenBtn");
                                btn.style.display = "none";
                                this.shipLocation[4].location.push(id);
                            }
                        }
                    }
                    this.hover = false;
                }
            }
        },

        postSalvos: function () {
            fetch('/api/games/players/' + this.gp + '/salvos', {
                credentials: 'include',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "salvoLocation": this.salvoLocations
                })
            }).then(function (response) {
                return response.json();
            }).then(function (json) {
                console.log(json)
                location.reload();
            }).catch(function (ex) {
                console.log('parsing failed', ex)
                alert("Error")
            });
        },



        callSalvos1: function () {
            this.salvoHover = true;
            this.fire = "one";
        },
        // callSalvos2: function () {
        //     this.salvoHover = true;
        //     this.fire = "two";
        // },
        // callSalvos3: function () {
        //     this.salvoHover = true;
        //     this.fire = "three";
        // },

        makeSalvosHover: function () {
            this.overlap = false;
            if (this.salvoHover == true) {
                var id = event.target.id;
                if (document.getElementById(id).classList.contains("salvoMatch2")) {
                    this.overlap = true;
                }
                if (!this.overlap) {
                    document.getElementById(id).classList.add("salvoMatch");
                }
            }
        },

        salvoClean: function () {
            var id = event.target.id;
            if (this.salvoHover == true) {
                document.getElementById(id).classList.remove("salvoMatch")
            }
        },

        salvoStay: function () {
            var id = event.target.id;
            if (this.salvoHover == true) {
                document.getElementById(id).classList.add("salvoMatch2");
                if (!this.overlap) {
                    if (this.fire == "one") {
                        var fire1 = document.getElementById("match1");
                        // fire1.style.display = "none";
                        if (id.length == 3) {
                            this.salvoLocations.push(id.substr(0, 2));
                        } else {
                            this.salvoLocations.push(id.substr(0, 3));
                        }
                        console.log(this.salvoLocations)
                    }
                    // if (this.fire == "two") {
                    //     var fire2 = document.getElementById("match2");
                    //     fire2.style.display = "none";
                    //     if (id.length == 3) {
                    //         this.salvoLocations.push(id.substr(0, 2));
                    //     } else {
                    //         this.salvoLocations.push(id.substr(0, 3));
                    //     }
                    //     console.log(this.salvoLocations)
                    // }
                    // if (this.fire == "three") {
                    //     var fire3 = document.getElementById("match3");
                    //     fire3.style.display = "none";
                    //     if (id.length == 3) {
                    //         this.salvoLocations.push(id.substr(0, 2));
                    //     } else {
                    //         this.salvoLocations.push(id.substr(0, 3));
                    //     }
                    //     console.log(this.salvoLocations)
                    // }
                }
            }
            this.salvoHover = false;

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