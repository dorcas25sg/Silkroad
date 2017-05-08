var dataset = "https://raw.githubusercontent.com/dorcas25sg/Silkroad/master/map3.geojson";
var dataset2 = "https://raw.githubusercontent.com/dorcas25sg/Silkroad/master/silkroadchinese2.geojson";
var featureGroup;
var featureGroup2;
var markers = [];

var sk2 ="https://gist.githubusercontent.com/Ziqinwang/c682220d2bb52f12740a2dbe2edf0333/raw/05cee6a62c746d993383020972b5add87006485f/test1.geojson";
var sk3 ="https://gist.githubusercontent.com/Ziqinwang/0822e76c94030905e18ec4c4a1486b2c/raw/72ce5f12ad736df145cc9c7a6b8a357981b9ab29/test2.geojson";
var route11 = [];
var route22 = [];
var route1 = [];
var route2 = [];
var geojson = { type: 'LineString', coordinates: [] };
var geojson2 = { type: 'LineString', coordinates: [] };

L.mapbox.accessToken = 'pk.eyJ1IjoiZG9yY2FzMjVzZyIsImEiOiJjajA0Ymt0MDYwYnBmMnFvbDhrN3cwcmdxIn0.cO9udcmKN-u47CKHednVgQ';
var map = L.mapbox.map('map').setView([35.8617, 104.19], 4);
var myLayer = L.mapbox.featureLayer().addTo(map);

$( "#reset" ).click(function() {
  map.setView([35.8617, 104.19], 4);
});

$(document).ready(function() {

  var popupContent = function(a, b) {
    var slideshowContent = "Click 'Next' if can't load a picture";
    var array = b.split(",");


    for(var i = 0; i < array.length; i++) {
    //for(var i = 0; i < 3; i++) {
      if (i === 0){
        slideshowContent += '<div class="image active" ' + 'id="P0"' + '>' +
        '<img src="' + array[i] + '" />' +  '</div>';
      }
      else {
       slideshowContent += '<div class="image active">' +
       '<img src="' + array[i] + '" />' +  '</div>';
     }

   }


    return '<div class="popup">' + '<h2>' + a + '</h2>' +
                             '<div class="slideshow">' +
                             slideshowContent +
                            '</div>' +
                             '<div class="cycle">' +
                               '<a href="#" class="prev">&laquo; Previous</a>' +
                                '<a href="#" class="next">Next &raquo;</a>' +
                           '</div>' +
                         '</div>';

  };

  $('#map').on('click', '.popup .cycle a', function (event) {

    var $slideshow = $('.slideshow'),
        $newSlide;

    if ($(this).hasClass('prev')) {
      //console.log("Prev yes");
        $newSlide = $slideshow.find('.active').prev();
        if ($newSlide.index() < 0) {
          $newSlide = $('.image').last();
        }
      }
      else
      {
         //console.log("next yes");
        $newSlide = $slideshow.find('.active').next();
        if ($newSlide.index() < 0) {
            $newSlide = $('.image').first();
        }
    }

    $slideshow.find('.active').removeClass('active').hide();
    $newSlide.addClass('active').show();
       //console.log("yes yes yes");
    return false;
  });



  $.ajax(sk2).done(function(data2) {
    var parsedData2 = JSON.parse(data2);
    //featureGroup2 = L.geoJson(parsedData2).addTo(map);
    route11.push(parsedData2);

    route1 = route11[0].features[0].geometry.coordinates;
    route1 = _.flatten(route11[0].features[0].geometry.coordinates, true);
    _.each(route1, function(num){ geojson.coordinates.push(num);});

    L.geoJson(geojson).addTo(map);
    var marker = L.marker([0, 0], {
          icon: L.mapbox.marker.icon({
            'marker-color': '#f86767'
          })
    }).addTo(map);

    var j = 0;
    var Timeout1;
    tick();
    function tick() {
        marker.setLatLng(L.latLng(
            geojson.coordinates[j][1],
            geojson.coordinates[j][0]));

        if (++j < geojson.coordinates.length) Timeout1 = setTimeout(tick, 300);
    }
    $('#stop').click(function(){
      clearTimeout(Timeout1);
      console.log("Stop");
      j = 0;
      tick();
    });
});

      $.ajax(sk3).done(function(data3) {
        var parsedData3 = JSON.parse(data3);
        route22.push(parsedData3);

        route2 = _.flatten(route22[0].features[0].geometry.coordinates, true);
        _.each(route2, function(num){ geojson2.coordinates.push(num);});

        L.geoJson(geojson2).addTo(map);
        var marker = L.marker([0, 0], {
              icon: L.mapbox.marker.icon({
                'marker-color': '#f86767'
              })
        }).addTo(map);

        var j = 0;
        tick();
        var Timeout2;
        function tick() {
            marker.setLatLng(L.latLng(
                geojson2.coordinates[j][1],
                geojson2.coordinates[j][0]));

            if (++j < geojson2.coordinates.length) {Timeout2 = setTimeout(tick, 300);}

            $('#stop').click(function(){
              clearTimeout(Timeout2);
              console.log("Stop");
              j = 0;
              tick();
            });
        }

        //featureGroup2 = L.geoJson(parsedData2).addTo(map);
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
        })
        .addTo(map)
        .bindPopup(popupContent(layer.feature.properties.namegeo,layer.feature.properties.Concat),
           {
             closeButton: false,
             minWidth: 320
           }).on('click', function (event) {
             $('.slideshow').find('.active').removeClass('active').hide();
             $('#P0').addClass('active').show();
             map.setView(event.target._latlng, 7);

           });
         }
       });
     });


});

L.control.layers({
  'Dark': L.mapbox.tileLayer('mapbox.dark').addTo(map),
  'Streets': L.mapbox.tileLayer('mapbox.streets'),
  'Light': L.mapbox.tileLayer('mapbox.light')
}).addTo(map);
