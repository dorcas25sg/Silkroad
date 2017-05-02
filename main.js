var dataset = "https://raw.githubusercontent.com/dorcas25sg/Silkroad/master/points2517.geojson";
var dataset2 = "https://raw.githubusercontent.com/dorcas25sg/Silkroad/master/silkroadchinese2.geojson";
var featureGroup;
var featureGroup2;

L.mapbox.accessToken = 'pk.eyJ1IjoiZG9yY2FzMjVzZyIsImEiOiJjajA0Ymt0MDYwYnBmMnFvbDhrN3cwcmdxIn0.cO9udcmKN-u47CKHednVgQ';
var map = L.mapbox.map('map').setView([35.8617, 104.19], 4);


  $(document).ready(function() {

    $.ajax(dataset2).done(function(data2) {
      var parsedData2 = JSON.parse(data2);
      featureGroup2 = L.geoJson(parsedData2).addTo(map);
  });


    $.ajax(dataset).done(function(data) {
      var parsedData = JSON.parse(data);
      featureGroup = L.geoJson(parsedData,{
          onEachFeature: function (feature, layer) {
             L.marker([layer._latlng.lat, layer._latlng.lng], {
                icon: L.mapbox.marker.icon({
                    'marker-color': 'ff3399',
                    'marker-size': 'small',
                    'marker-symbol': 'museum'
                })
             }).addTo(map);
      }});
  });

  L.control.layers({
    'Dark': L.mapbox.tileLayer('mapbox.dark').addTo(map),
    'Streets': L.mapbox.tileLayer('mapbox.streets'),
    'Light': L.mapbox.tileLayer('mapbox.light')
  }).addTo(map);

});
