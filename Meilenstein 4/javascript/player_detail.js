function myFunction(a){
	if(a == 1){
		document.getElementById("all_players").setAttribute("style", "background-color: rgb(0,28,255); color: #FFFFFF;");
		document.getElementById("my_favorites").setAttribute("style", "background-color: rgb(153,217,234); color: black;");
		sendRequest(true);
	}else{
		document.getElementById("my_favorites").setAttribute("style", "background-color: rgb(0,28,255); color: #FFFFFF;");
		document.getElementById("all_players").setAttribute("style", "background-color: rgb(153,217,234); color: black;");
		sendRequest(false);
	}
}

function sendRequest(fav) {
	var xmlhttp=new XMLHttpRequest();
	xmlhttp.onreadystatechange=function() {
		if (xmlhttp.readyState == 4 && xmlhttp.status== 200) {
			var json = JSON.parse(xmlhttp.responseText);
			load(json, fav);
		}
	}
	
	xmlhttp.open("GET",'./json/data.json');
	xmlhttp.send(null);
}

function load(json, fav) {
	// erstelle den tabellen inhalt html anhand der json object datei
	
	var table = document.getElementById("table");
	// löschen der alten nabs
	while(table.rows.length > 2) {
		table.deleteRow(2);
	}
	// erstellen der neuen nabs
	for(var i = 0; i < json.length; i++) {
		if (json[i].isFavorite || fav) {
			var row = table.insertRow(2);
			var html = "<td>"+json[i].firstname+" "+json[i].surname+"</td>";
			html += "<td>"+json[i].team+"</td>";
			html += "<td>"+json[i].headcoach+"</td>";
			html += "<td>"+json[i].asisstantcoach+"</td>";
			html += "<td>"+json[i].position+"</td>";
			if (json[i].isActive)
				html += "<td>Ja</td>";
			else
				html += "<td>Nein</td>"
			html += "<td>"+json[i].number+"</td>";
			html += "<td>"+json[i].year+"</td>";
			row.innerHTML = html;
		}
	}
}