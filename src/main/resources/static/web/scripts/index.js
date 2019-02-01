function logIn() {
    var ourData = {
        email: document.getElementById("email").value,
        pwd: document.getElementById("password").value,
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
            if (data.status == 200) {
                alert("You are Logged In!")
                redirect();
            } else {
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



function redirect() {
    location.replace("http://localhost:8080/web/games.html")
}



function signUp() {

    fetch('/api/players', {
        credentials: 'include',
        method: 'POST',
        headers: {

            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            userName: document.getElementById("userName").value,
            email: document.getElementById("email").value,
            password: document.getElementById("password").value,
        })
    }).then(function (response) {
        return response.json();
    }).then(function (json) {
        console.log('parsed json', json)
        logIn();
    }).catch(function (ex) {
        console.log('parsing failed', ex)
        alert("Error, please try again")
    });
}


function register() {
    var welcome = document.getElementById("welcome");
    var login = document.getElementById("login");
    var question = document.getElementById("question");
    var titleSignup = document.getElementById("titleSignup");
    var username = document.getElementById("username");
    var buttonSignup = document.getElementById("buttonSignup");

    welcome.style.display = "none";
    login.style.display = "none";
    question.style.display = "none";
    titleSignup.style.display = "block";
    username.style.display = "block";
    buttonSignup.style.display = "block";
}