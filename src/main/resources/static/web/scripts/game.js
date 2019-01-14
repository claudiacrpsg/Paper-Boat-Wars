let shipGrid = new Vue({
    el: "#shipGrid",
    data: {
    numbers: [" ","1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
    letters: [" ", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J"]
    },
    methods: {

    },
    created(){
    fetch("http://localhost:8080/api/game_view/1", {
        }).then(function (result) {
            return result.json()
        }).then(function (dataData) {
            data = dataData;
            console.log(data);
        })
    }
});







//function grid() {
//    var body = document.getElementById("tbody");
//    var numbers = [" ","1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
//    var letters = [" ", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
//
//    for (var i = 0; i < numbers.length; i++) {
//       var row = document.createElement("tr");
//       for (var j = 0; j < letters.length; j++){
//          var cell = document.createElement("td");
//          if(i == 0){
//             cell.append(numbers[j]);
//          }
//          if(j == 0){
//           cell.append(letters[i]);
//          }
//       row.append(cell);
//       cell.setAttribute("id", letters[i] + numbers[j]);
//       row.setAttribute("class", "row");
//       }
//       body.append(row);
//    }
//}

