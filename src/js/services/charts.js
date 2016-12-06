function ChartsService ($http, $cookies) {

	let vm = this;
	vm.chart = chart;

	const metersFeetConversion = 3.28084;
	const metersMilesConversion = 0.000621371;


	function chart(path){

	    vm.elevator = new google.maps.ElevationService;
	    var pathElevations = [];
	    var waypointElevations = [];

	   	vm.pathLength = google.maps.geometry.spherical.computeLength(path)
	    getPathElevations(path).then(function (pathElevations) {
	      getWaypointElevations(path).then(function (waypointElevations) {
	        drawChart(pathElevations, waypointElevations);
	      })
	    });
	}

	function getPathElevations(path){
	  return new Promise(function (resolve, reject) {
	  	if (path.length >1){
		    vm.elevator.getElevationAlongPath({
		      'path': path,
		      'samples': 200
		    }, function (elevations, status){
		        var pathElevations = [];
		        pathElevations[0]={x: 0, y: elevations[0].elevation*metersFeetConversion};
		        var resolution = vm.pathLength/(elevations.length-1)* metersMilesConversion;
		        for (var i=1; i<elevations.length; i++){
		          pathElevations[i] = {x: resolution * i,
		                      y: elevations[i].elevation*metersFeetConversion}
		        }
		      resolve(pathElevations);
		    });
		} else {resolve();}
	  })
	}

	function getWaypointElevations(path){
	  return new Promise(function (resolve, reject) {
	    vm.elevator.getElevationForLocations({
	    'locations': path, //change this to the set when we have it
	  }, function (elevations, status){
	      var waypointElevations = [];
	      for (var i=0; i<path.length; i++){
	      waypointElevations[i] = {x: path[i].totalDistance*metersMilesConversion,
	                  y: elevations[i].elevation*metersFeetConversion}
	    }
	      resolve(waypointElevations);
	  });
	 })
	}


	function drawChart(pathElevations, waypointElevations){
		var ctx = document.getElementById('myChart');
		ctx.width = 800;
		ctx.height = 125;
		// ctx.defaults.global.tooltipTemplate = "<%= label + '-' + %> <%= description %>";
		const campgroundImg = new Image();
		campgroundImg.src = 'http://pngimages.net/sites/default/files/camping-small-png-image-62261.png';
		const waterImg = new Image();
		waterImg.src = 'http://arcskoru.com/sites/default/files/water.png';
		if(vm.myLineChart){
	        vm.myLineChart.destroy();
	    }

		var data = {
		    datasets: [
					{
						type: 'line',
						label: 'POI Elevation',
		        data: [{x: 2, y: 3505.8}, {x: 10, y: 5500}, {x: 50, y: 50}],
		        fill: false,
		        borderColor: 'rgba(255,255,255,0)',
		        pointBorderColor: 'rgba(255, 0, 0, 1)',
		        pointBackgroundColor: 'rgba(255, 0, 0, 1)',
						pointStyle: campgroundImg,
						// description: 'This is the description from Waypoints Label',
						// title: 'hello from dataset object waypoints'


		      },
					{
						type: 'line',
						label: 'POI Elevation',
		        data: [{x: 6, y: 4130}, {x: 15, y: 5248.19}, {x: 50, y: 50}],
		        fill: false,
		        borderColor: 'rgba(255,255,255,0)',
		        pointBorderColor: 'rgba(255, 0, 0, 1)',
		        pointBackgroundColor: 'rgba(255, 0, 0, 1)',
						pointStyle: waterImg,
						// description: 'This is the description from Waypoints Label',
						// title: 'hello from dataset object waypoints'


		      },
					{
						type: 'line',
		        label: 'Elevation',
		        data: pathElevations,
		        fill: true,
		        pointBorderColor: 'rgba(0, 0, 0, 0)',
		        pointBackgroundColor: 'rgba(0, 0, 0, 0)',
		        backgroundColor : 'rgba(155,122,61, .8)',
						// description: 'This is the description from Elevation Label',
						// title: 'hello from dataset object'

		      }
		    ]
		}
		var options = {
					tooltips: {
						callbacks: {
							title: function (tooltipItem, data) {
								let tip = '';
								tooltipItem.forEach(function (item) {
									if (item.datasetIndex === 0) {
										tip = 'Campground';
										console.log('tooltipItem', tooltipItem);
										console.log('data', data);
									}
									else if (item.datasetIndex === 1) {
										tip = 'Water Source';
									}
								})
								debugger
								return tip;
								// console.log(tooltipItem[0])
								// return data.datasets[0].title;
						},
							afterTitle: function (tooltipItem, data) {
								let tipLabel ='';
								tooltipItem.forEach(function (item) {
									if (item.datasetIndex === 0) {
										tipLabel = 'This is the description for a campground'
									} else if (item.datasetIndex === 1){
										tipLabel = 'This is the description for a water source'
									}
								})
								return tipLabel;
							}
					}
				},
		      scales: {
		          xAxes: [{
		              type: 'linear',
		              position: 'bottom',
		              ticks: {
		                min: 0,
		                max: 20,
		                beginAtZero: true
		              }
		          }],
		          yAxes: [{
		              ticks: {
		                min: 0,
		                max: 6600,
		                beginAtZero: true
		              }
		          }],
		      },
					hover: {
						intersect: true,
						mode: 'point'
					}
		}
		vm.myLineChart = new Chart(ctx, {
		    type: 'bar',
		    data: data,
		    options: options
		});

	}



}

ChartsService.$inject = ['$http', '$cookies'];
export { ChartsService };
