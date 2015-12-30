var http = require('http');



http.createServer( function ( request, response){
	response.writeHead(200, {'Content-Type' : 'text/plain'});
	response.write('Sie haben sich erfolgreich auf den WebServer mit der URL ' +  request.headers.host +  ' verbunden');
	response.end();
	console.log('<User connectedto Server>');
	var zeichenkette =	getStringMethode(request.url);
	writeToFile(zeichenkette);
	//console.log('Wrote <' + zeichenkette +  '> into File');
}).listen(3000);



// alle unnötigen Zeichen entfernen
function getStringMethode( zeichen ){
	zeichen = zeichen.replace(/=/g,'');
	zeichen = zeichen.replace(/&/g,' ');	
	var numbers = [ '/?name' , 'vorname' , 'verein' , 'hcoach' , 'acoach' , 'number' , 'jahr' , 'position' , 
				   'aktiv', 'absendenAbsenden' ];
	var woerter = zeichen.split(' ');
	for( var i = 0; i < woerter.length; i++){
		woerter[i] = woerter[i].replace([numbers[i]], '') ;	
	}
	var ergebnis = woerter[1] + ' ' + woerter[0] + ' , ' + woerter[6] + ' , ' 
	+ woerter[3] + ' , ' + woerter[4] + ' , ' + woerter[7] + ' , ' +  woerter[5]; 
	return ergebnis;
}

function writeToFile( eintrag){
	var fs = require("fs");
	 eintrag = eintrag + '\r\n';
	fs.appendFile('form.txt', eintrag,  function(err) {
	   if (err) {
	       return console.error(err);
	   }
	   console.log("Data written/append!");
	});
}
/*

Daten: lesen mit request.url 
zeigt an -> /?name=a&vorname=a&verein=a&hcoach=a&acoach=a&number=10&
jahr=10&position=Wing&aktiv=Nein&absenden=Absenden

/zeichen/g ersetzt alle "zeichen", ohne g-Parameter wird nur das erste gefundene Zeichen ersetzt.

Soll angezeigt werden als
-> Vorname Nachname , Geburtsjahr ,  Headcoach , Assistentencoach , Position , Trikotnummer
-> worter[1]+ ' ' + woerter[0] + ' , ' + woerter[6] + ' , ' + woerter[3] + ' , ' woerter[4] + ' , ' + woerter[7] + ' , ' +  worter[8]; 
*/