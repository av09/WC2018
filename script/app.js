function initMap() {
    // Create a map. Use the Gall-Peters map type.
    var map = new google.maps.Map(document.querySelector('.js-map'), {
    	zoom: 3,
    	center: {lat: 0, lng: 0},
    	mapTypeControl: false
    });

    // Show the lat and lng under the mouse cursor.
    var coordsDiv = document.querySelector('.js-coords');
    map.controls[google.maps.ControlPosition.TOP_CENTER].push(coordsDiv);
    map.addListener('mousemove', function(event) {
    	coordsDiv.textContent =
    	'lat: ' + Math.round(event.latLng.lat()) + ', ' +
    	'lng: ' + Math.round(event.latLng.lng());
    });

    var infowindow = new google.maps.InfoWindow();

    var entrants = [
    {
    	coordinates: [53.6880, 32.4279],
    	name: 'Iran', 
    	id: 'irn'
    },
    {
    	coordinates: [138.2529, 36.2048],
    	name: 'Japan', 
    	id: 'jpn'
    },
    {
    	coordinates: [45.0792, 23.8859],
    	name: 'Saudi Arabia', 
    	id: 'ksa'
    },
    {
    	coordinates: [127.7669, 35.9078],
    	name: 'South Korea', 
    	id: 'kor'
    },
    {
    	coordinates: [133.7751, -25.2744],
    	name: 'Australia', 
    	id: 'aus'
    }
    ]

    var marker, 
    i;

    for (i = 0; i < entrants.length; i++) {  
    	marker = new google.maps.Marker({
    		title: entrants[i].name,
    		id: entrants[i].id,
    		position: new google.maps.LatLng(entrants[i].coordinates[1], entrants[i].coordinates[0]),
    		icon: {
    			url: 'assets/flags/' + entrants[i].id + '.png',
		    scaledSize: new google.maps.Size(35, 23), // scaled size
		    anchor: new google.maps.Point(5, -10) // anchor
		},
		map: map
	});

    	(function(marker, i) {
    		google.maps.event.addListener(marker, 'click', function() {
    			console.log(marker);
    			var detailsDiv = document.querySelector('.js-details');
    			detailsDiv.classList.add("show");
    			detailsDiv.innerHTML = marker.title;
    		});
    	}(marker, i));
    }
}