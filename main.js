var dataset = "https://raw.githubusercontent.com/dorcas25sg/Silkroad/master/mapNEW.geojson";
var dataset2 = "https://raw.githubusercontent.com/dorcas25sg/Silkroad/master/silkroadchinese2.geojson";
var featureGroup;
var featureGroup2;
var markers = [];

var eachFeatureFunction = function(layer) {
  layer.on('click', function (event) {
     //Just for reference: to get the centriod of each polygoon: var centriod = layer.getBounds().getCenter();
     var bounds = event.target.getBounds();
     map.fitBounds(bounds, {padding: [50,50]});
    console.log(layer.feature);
  });
};

$( "#reset" ).click(function() {
  map.setView([35.8617, 104.19], 4);
});

var popupContent = function(a, b) {
                      return '<div class="popup">' + '<h2>' + a +'</h2>'+ '<div class="slideshow">' + '<img src="' + b + '" />' + '</div>' +'</div>';
                    };


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
             }).addTo(map).bindTooltip(popupContent(layer.feature.properties.namegeo, layer.feature.properties.urlname));

             //ISSUE HERE
             layer.on('click', function (event) {
               console.log("Hello!");
                //Just for reference: to get the centriod of each polygoon: var centriod = layer.getBounds().getCenter();
                var bounds = event.target.getBounds();
                map.fitBounds(bounds, {padding: [50,50]});
               console.log(layer.feature);
             });


      }});
  });

  L.control.layers({
    'Dark': L.mapbox.tileLayer('mapbox.dark').addTo(map),
    'Streets': L.mapbox.tileLayer('mapbox.streets'),
    'Light': L.mapbox.tileLayer('mapbox.light')
  }).addTo(map);

});
