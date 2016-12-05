
const mapId = "markMap"

function MarkController (MapsService, $stateParams, $scope) {
  let vm = this;
  const blaze = false;
  const draggable = true;
  const snap = true;

  vm.placeMarker = placeMarker;
  // vm.editTrail = editTrail;
  // vm.deleteTrail = deleteTrail;
  vm.MapsService = MapsService;
  vm.savePoint = savePoint;
  vm.deletePoint = deletePoint;
  // vm.chartWidth = 600;
  // vm.chartHeight = 300;


  function init () {
    let trail_id = $stateParams.id
    vm.status = "Add Points to a Trail"
    vm.trailTitle = "Trail Title"
    vm.MapsService.delete = false;
    vm.MapsService.newMarker = true;


    MapsService.getMap(mapId).then(function (map) {
      MapsService.getTrail(trail_id, map, blaze, snap, draggable).then(function (MapInfo){
        vm.path = MapInfo.path;
        vm.trailTitle = MapInfo.title;
        vm.map = map;
        vm.map.setMapTypeId('terrain');
        $scope.$apply();
      });
    })
  }

  init();

  function placeMarker(event){
      MapsService.placeMarker(event, vm.path, vm.map, snap);
      vm.MapsService.newMarker = false;
  }

  function savePoint(){
    vm.MapsService.newMarker = true;
    console.log(vm.MapsService.waypoint)
    vm.MapsService.waypoint.trail_id = $stateParams.id
    MapsService.savePoint(vm.MapsService.waypoint).then((resp) => {
      console.log(resp)
    })
  }

  function deletePoint(){
    vm.MapsService.newMarker = true;
    vm.MapsService.currentMarker.setMap(null);
    vm.MapsService.currentMarker = null;
  }
  
  // function editTrail(){
  //   vm.status = "Trail Updating...";
  //   MapsService.editTrail(vm.path, vm.trailTitle, $stateParams.id)
  //     .then(function (resp) {
  //       vm.status = "edit Completed";
  //       $scope.$apply();
  //     })
  // }

  // function deleteTrail(){
  //   MapsService.deleteTrail($stateParams.id).then((resp) => {
  //     vm.status = "Trail Deleted!"
  //     $scope.$apply();
  //   }, (reject) => {
  //       console.log(reject)
  //     });
  // }
}

MarkController.$inject = ['MapsService', '$stateParams', '$scope'];
export {MarkController}
