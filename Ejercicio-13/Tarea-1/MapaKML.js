"use strict";
class MapaKML {

    initMap() {
        var centro = {lat: 43.3672702, lng: -5.8502461};
        this.map = new google.maps.Map(document.getElementById('mapa'),{
        zoom: 8,
        center:centro,
        mapTypeId: google.maps.MapTypeId.SATELLITE
        });
    }
    load(files) {
        var miMapa = this.map;
        var archivo = files[0];
        var ext = archivo.name.substr(archivo.name.lastIndexOf('.') + 1);

        //Si el formato no es kml no se procesa
        if(ext != "kml"){
            alert("Formato de archivo incorrecto");
            return;
        } else{
            var lector = new FileReader();
            lector.onload = function (event) {
                var text = lector.result;
                var content = $.parseXML(text);

                $("Document",content).find("Placemark").each(function(){
                    var nombre = $("name", this).text();
                    var descripcion = $("description",this).text();
                    var coordenadasHitos = $("LineString", this).find("coordinates").text();
                    
                    var arrayPolyline = [];

                    //Tenemos que hacer split 2 veces, una para las \t y otra para las ,
                    var coordenadasHitos = coordenadasHitos.split("\t");
                    
                    for (let index = 0; index < coordenadasHitos.length; index++) {
                        if(coordenadasHitos[index].length != 0){
                            var coordenadas = coordenadasHitos[index].split(",");
                            var longitud = parseFloat(coordenadas[0]);
                            var latitud = parseFloat(coordenadas[1]);
                            var posicion = {lat:latitud, lng:longitud};
                            
                            //Metemos la posicion
                            arrayPolyline.push(posicion);

                            //Creamos el marcador
                            var marcador = new google.maps.Marker({
                                position: posicion,
                                title: nombre,
                                map: miMapa
                            });
                        }
                    }

                    //Creamos la polilinea
                    var linea = new google.maps.Polyline({
                        path:arrayPolyline,
                        geodesic:true,
                        strokeColor: "#FFFF00",
                        strokeOpacity: 1.0,
                        strokeWeight: 2
                    });

                    linea.setMap(miMapa);
                });
            }
            lector.readAsText(archivo);
        }
    }
}
var mapaKml = new MapaKML();