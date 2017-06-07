function OnRouteController ($state, $http, NgMap, $stateParams) {
  let vm = this;
  var id = "travel_map";
  console.log($stateParams)

  vm.hero_name = $stateParams.obj.Name;
  vm.hero_phone = $stateParams.obj.Phone;
  vm.hero_lat = $stateParams.obj.Latitude;
  vm.hero_lng = $stateParams.obj.Longitude;

  console.log(vm)

  function initMap() {

    NgMap.getMap(id).then(function(map){

        navigator.geolocation.getCurrentPosition(function successFunction(position) {
            var lat = position.coords.latitude;
            var lng = position.coords.longitude;
            keep_going(lat, lng);
        });

        function keep_going(lat, lng){
            var pointA = new google.maps.LatLng(lat, lng)
            var pointB = new google.maps.LatLng(vm.hero_lat, vm.hero_lng)
            var myOptions = {
              zoom: 9,
              center: pointA
            }
            // Instantiate a directions service.
            var directionsService = new google.maps.DirectionsService
            var directionsDisplay = new google.maps.DirectionsRenderer({
              map: map
            })
            var markerA = new google.maps.Marker({
              position: pointA,
              title: "point A",
              label: "C",
              map: map
            })
            // var markerB = new google.maps.Marker({
            //   position: pointB,
            //   title: "point B",
            //   label: "T",
            //   map: map
            // });

              // get route from A to B
            calculateAndDisplayRoute(directionsService, directionsDisplay, pointA, pointB);
        }


    })


    }



    function calculateAndDisplayRoute(directionsService, directionsDisplay, pointA, pointB) {
      directionsService.route({
        origin: pointA,
        destination: pointB,
        travelMode: google.maps.TravelMode.DRIVING
      }, function(response, status) {
        if (status == google.maps.DirectionsStatus.OK) {
          directionsDisplay.setDirections(response);
        } else {
          
        }
      });
    }

    initMap();
};

OnRouteController.$inject = ['$state', '$http', 'NgMap', '$stateParams'];
export {OnRouteController};