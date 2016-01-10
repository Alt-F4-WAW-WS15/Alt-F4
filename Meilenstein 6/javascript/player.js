/*	^ : vom start
 [A-Za-zäöüÄÖÜß]+ : Eine anzhal von deutschen buchstaben
 $ : danach nix mehr zusätzliches
 */
var regNames = /^[A-Za-zäöüÄÖÜß]+$/

var url = 'http://localhost:3000/Player';

var focusIsSet = false;

function myFunction() {
    console.log('works');
    var isCorrect = false;
    focusIsSet = false;
    var arr = ["name", "vorname", "verein", "hcoach", "acoach"];
    var check = [false, false, false, false, false, false, false];
    for (var i = 0; i < arr.length; i++) {
        var val = document.getElementById(arr[i]).value;
        if (!regNames.test(val)) {
            check[i] = false;
            isCorrect = false;
            if (!focusIsSet) {
                document.getElementById(arr[i]).focus();
            }
            focusIsSet = true;
            document.getElementById(arr[i]).setAttribute("style", "border: 2px solid; border-color: red;");
        } else {
            check[i] = true;
            document.getElementById(arr[i]).setAttribute("style", "border: hidden;");
        }

    }

    var val3 = document.getElementById("number").value;
    if ((val3 < 4 || val3 > 15)) {
        check[6] = false;
        isCorrect = false;
        if (!focusIsSet) {
            document.getElementById("number").focus();
        }
        focusIsSet = true;
        document.getElementById("number").setAttribute("style", "border: 2px solid; border-color: red;");
    } else {
        check[6] = true;
        document.getElementById("number").setAttribute("style", "border: hidden;");
    }

    var val2 = document.getElementById("ja").value;
    if ((val2 < 1 || val2 > 2015)) {
        check[5] = false;
        isCorrect = false;
        document.getElementById("ja").setAttribute("style", "border: 2px solid; border-color: red;");
        if (!focusIsSet) {
            document.getElementById("ja").focus();
        }
        focusIsSet = true;
    } else {
        check[5] = true;
        document.getElementById("ja").setAttribute("style", "border: hidden;");
    }


    if ((check[0] == true) && (check[1] == true) && (check[2] == true) && (check[3] == true) &&
        (check[4] == true) && (check[5] == true) && (check[6] == true)) {
        isCorrect = true;
    }

    if (!isCorrect) {
        alert("Einige Eingaben sind fehlerhaft. Bitte überprüfen Sie ihre Eingaben");
    }else{
        var object = getValues();
        console.log(object);
        var xhttp = new XMLHttpRequest();  
        xhttp.onreadystatechange = function requestReadyStateHandeler(){
          if(xhttp.readyState == 4 && xhttp.status == 200){
           console.log(xhttp.responseText);   
          }
        };
        xhttp.open("PUT", 'http://localhost:3000/Player', true);
        xhttp.setRequestHeader("Content-type", "application/json");
        xhttp.send(JSON.stringify(object));
    }
    return isCorrect;
}

function getValues(){
    var jsonObject = { 
        'vorname':  document.getElementById('vorname').value,
        'name':     document.getElementById('name').value,
        'jahr':     document.getElementById('ja').value,
        'hcoach':   document.getElementById('hcoach').value,
        'acoach':   document.getElementById('acoach').value,
        'position': document.getElementById('position').value,
        'number':   document.getElementById('number').value
    };
    return jsonObject;
}