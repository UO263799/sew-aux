"use strict";
class GeoJSON {

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

        if(ext != "GeoJSON"){
            alert("Formato de archivo incorrecto");
            return;
        } else{
            var lector = new FileReader();
            lector.onload = function (event) {
                var text = lector.result;
                let myData = JSON.parse(text);

                miMapa.data.addGeoJson(myData);
            }

            //Por último, se lee el fichero
            lector.readAsText(archivo);
        }
    }
}
var mapaJson = new GeoJSON();