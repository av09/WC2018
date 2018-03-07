var entrants = [
    {
    	coordinates: [53.6880, 32.4279],
    	name: 'Iran', 
    	id: 'irn',
    	votes: 0
    },
    {
    	coordinates: [138.2529, 36.2048],
    	name: 'Japan', 
    	id: 'jpn',
    	votes: 0
    },
    {
    	coordinates: [45.0792, 23.8859],
    	name: 'Saudi Arabia', 
    	id: 'ksa',
    	votes: 0
    },
    {
    	coordinates: [127.7669, 35.9078],
    	name: 'South Korea', 
    	id: 'kor',
    	votes: 0
    },
    {
    	coordinates: [133.7751, -25.2744],
    	name: 'Australia', 
    	id: 'aus',
    	votes: 0
    }
];
// var map,
// 	marker;

function getVoteCount(id) {
	var modifiedVotes = entrants.find(function(entrant){
		return id == entrant.id
	}).votes;

	return String(modifiedVotes);
};

function initMap(coordinates, modifiedEntrant) {
    // Create a map. Use the Gall-Peters map type.
    var map = new google.maps.Map(document.querySelector('.js-map'), {
    	zoom: 3,
    	center: {
    		lat: coordinates && coordinates.length ? coordinates[1] : 0, 
    		lng: coordinates && coordinates.length ? coordinates[0] : 0
    	},
    	mapTypeControl: false
    });

    for (var i = 0; i < entrants.length; i++) {  
    	var marker = new google.maps.Marker({
    		title: entrants[i].name,
    		id: entrants[i].id,
    		votes: entrants[i].votes,
    		animation: (modifiedEntrant && modifiedEntrant.id === entrants[i].id) ? google.maps.Animation.DROP : null,
    		position: new google.maps.LatLng(entrants[i].coordinates[1], entrants[i].coordinates[0]),
    		icon: {
    			url: 'assets/flags/' + entrants[i].id + '.png',
			    scaledSize: new google.maps.Size(35, 23),
			    anchor: new google.maps.Point(5, -10),
			    labelOrigin: new google.maps.Point(42, -7)
			},
			label: {
				text: getVoteCount(entrants[i].id),
				fontSize: '18px',
				fontWeight: '700'
			},
			map: map
	});

    	(function(marker, i) {
    		google.maps.event.addListener(marker, 'click', function() {
    			console.log(marker);
    			var detailsDiv = document.querySelector('.js-details');
    			detailsDiv.classList.add("show");
    			detailsDiv.dataset.entrant =  marker.id;
    			detailsDiv.dataset.votes =  entrants.find(function(entrant){
					return entrant.id === detailsDiv.dataset.entrant
				}).votes;
    			document.querySelector('.js-details .js-details-title').innerHTML = marker.title;
    			document.querySelector('.js-details .js-details-img').src = 'assets/flags/' + marker.id + '.png';
    		});
    	}(marker, i));
    }
}

(function(){

	var img = document.querySelector('.js-details-img');
	var detailsDiv = document.querySelector('.js-details');
	var hammertime = new Hammer(img);
	hammertime.on('swipeleft', function(ev) {
		detailsDiv.dataset.votes--;
		closeDetails();
	});
	hammertime.on('swiperight', function(ev) {
		detailsDiv.dataset.votes++;
		closeDetails();
	});

	function closeDetails() {
		console.log(entrants);
		var modifiedEntrant = entrants.find(function(entrant){
			return entrant.id === detailsDiv.dataset.entrant
		});

		modifiedEntrant.votes = detailsDiv.dataset.votes;
		detailsDiv.classList.remove("show");
		initMap(modifiedEntrant.coordinates, modifiedEntrant);
	}
})()
