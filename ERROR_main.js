var dataset = "https://raw.githubusercontent.com/dorcas25sg/Silkroad/master/map3.geojson";
var dataset2 = "https://raw.githubusercontent.com/dorcas25sg/Silkroad/master/silkroadchinese2.geojson";
var featureGroup;
var featureGroup2;
var markers = [];

$( "#reset" ).click(function() {
  map.setView([35.8617, 104.19], 4);
});

// var popupContent = function(a, b) {
//                       return '<div class="popup">' + '<h2>' + a +'</h2>'+ '<div class="slideshow">' + '<img src="' + b + '" />' + '</div>' + '</div>';
//                     };

var popupContent = function(a, b) {
  var slideshowContent;
  var array = b.split(",");

  for(var i = 0; i < array.length; i++) {
     slideshowContent += '<div class="image' + (i === 0 ? ' active' : '') + '">' +
     '<img src="' + array[i] + '" />' +  '</div>';
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
             }).addTo(map).bindPopup(popupContent(layer.feature.properties.namegeo,layer.feature.properties.Concat),{
               closeButton: false,
               minWidth: 320
             }).on('click', '.popup .cycle a', function (event) {
               map.setView(event.target._latlng, 7);

              // THIS IS NOT WORKINGs
               var $slideshow = $('.slideshow'),
                   $newSlide;

               if ($(this).hasClass('prev')) {
                 console.log("Prev yes");
                   $newSlide = $slideshow.find('.active').prev();
                   if ($newSlide.index() < 0) {
                       $newSlide = $('.image').last();
                   }
               } else {
                    console.log("next yes");
                   $newSlide = $slideshow.find('.active').next();
                   if ($newSlide.index() < 0) {
                       $newSlide = $('.image').first();
                   }
               }

               $slideshow.find('.active').removeClass('active').hide();
               $newSlide.addClass('active').show();
                  console.log("yes yes yes");
               return false;

             });

      }});
  });

  L.control.layers({
    'Dark': L.mapbox.tileLayer('mapbox.dark').addTo(map),
    'Streets': L.mapbox.tileLayer('mapbox.streets'),
    'Light': L.mapbox.tileLayer('mapbox.light')
  }).addTo(map);

});
