function logIn(){                                                   

var ourData = {
    email: document.getElementById("email").value,
    pwd: document.getElementById("pwd").value,
}



fetch("/api/login", {
                credentials: 'include',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        method: 'POST',
        body: getBody(ourData)
    })
    .then(function (data) {
        console.log('Request success: ', data);
        if(data.status == 200){
            alert("You are Logged In!")
whatever();
        }else{
            alert("Error! Try again!")
        }
    })
    .catch(function (error) {
        console.log('Request failure: ', error);
    });

function getBody(json) {
    var body = [];
    for (var key in json) {
        var encKey = encodeURIComponent(key);
        var encVal = encodeURIComponent(json[key]);
        body.push(encKey + "=" + encVal);
    }
    return body.join("&");
}
}


function whatever(){
    location.replace("http://localhost:8080/web/games.html")
}