$(document).ready(function() {

      var map;
      var infowindow;

      var kraveId = window.location.pathname.slice(10);
      var kraveName = $('#name').text();
      var kraveCity = $('#city').text();
      var kraveState = $('#state').text();
      var kraveZip = $('#zip').text();
      var address = kraveCity + ", " + kraveState + " " + kraveZip;
            $('#nameField').val(name);


      console.log(address);

      // window.getCoordinates = function(address, callback) {
      //   var coordinates;

      //   geocoder.geocode({ address: address }, function(results, status) {
      //     coords_lat = results[0].geometry.location.lat();
      //     coords_lng = results[0].geometry.location.lng();
      //     coordinates = [coords_lat, coords_lng];
      //     callback(coordinates);
      //   });
      // }

      window.initMap = function() {
        getCoordinates(address, createMap);
      };

      function getCoordinates(address, cb) {
        geocoder = new google.maps.Geocoder();
        geocoder.geocode({ address: address }, function(results, status) {
          coords_lat = results[0].geometry.location.lat();
          coords_lng = results[0].geometry.location.lng();
          cb( {lat: coords_lat, lng: coords_lng} );
        });
      }

      function createMap(latlong) {
        console.log('getCoordinates callback got latlong = ', latlong);
        console.log(kraveName);
        map = new google.maps.Map(document.getElementById('map'), {
          center: latlong,
          zoom: 15
        });
        infowindow = new google.maps.InfoWindow();
        var service = new google.maps.places.PlacesService(map);

        service.nearbySearch({
          location: latlong,
          radius: 2000,
          types: ['restaurant' | 'food' | 'cafe' | 'grocery_or_supermarket'],
          keyword: kraveName
        }, processSearchResults);
      }

      function processSearchResults(results, status) {
        console.log('processSearchResults called.');
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          for (var i = 0; i < results.length; i++) {
            createMarker(results[i]);
          }
          getPlace(results);

        }
        else {
          console.log('status:', status);
        }
      }

      function createMarker(place) {
        console.log('createMarker called with place = ', place);
        //console.log(place.name);
        var placeLoc = place.geometry.location;
        var marker = new google.maps.Marker({
          map: map,
          position: place.geometry.location
        });

        google.maps.event.addListener(marker, 'click', function() {
          infowindow.setContent(place.name, place.opening_hours);
          infowindow.open(map, this);
        });
      }

      function getPlace(results) {
        console.log(results[0].name);
        console.log(kraveId);
        for (var i = 0; i < results.length; i++) {

                    $('#places').append("<br /><a href='/kravings/" + kraveId + "/info' type='submit'>" +  results[i].name + "</a><br /><input type='text' id='placeid" + i + "' value='" + results[i].place_id + "' id='placeidField'><br /><button id='hello'" + i + " type='submit' class='btn btn-success'>Info</button>");
        }
      }

      $("button").click(function() {
       var test = $(this).attr('id');
       var test2 = test.slice(5); // I get the i
       console.log(test);
       console.log(test2);

       var test3 = 'placeid' + test2;

       console.log(test3);

       var test4 = $("#"+test3+"").val();  // with the i get value of placeidi

       console.log(test4);

       var test5 = $('#place').val();

       console.log("Test" + test5);

       $('#place').append("<br/><input type='text' id='place' value='" + test5 + "'>");


      });




});

// <a href='/kravings/" + kraveId + "/info' type='submit'>" +  results[i].name + "</a><br />

// <input type='text' name='placeid0 "' value='" + results[i].place_id + "' id='placeidField'>

// <button id='hello'" + i + " type='submit' class='btn btn-success'>Info</button>
