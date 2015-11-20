function myFunction(a){
	if(a == 1){
		document.getElementById("all_players").setAttribute("style", "background-color: rgb(0,28,255); color: #FFFFFF;");
		document.getElementById("my_favorites").setAttribute("style", "background-color: rgb(153,217,234); color: black;");
	}else{
		document.getElementById("my_favorites").setAttribute("style", "background-color: rgb(0,28,255); color: #FFFFFF;");
		document.getElementById("all_players").setAttribute("style", "background-color: rgb(153,217,234); color: black;");
	}
}