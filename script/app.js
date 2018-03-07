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

function getVoteCount(id) {
	var modifiedVotes = entrants.find(function(entrant){
		return id == entrant.id
	}).votes;

	return String(modifiedVotes);
};

var body = document.querySelector('body');

/*
    initMap initliases the map along with creating markers
*/
function initMap(modifiedEntrant) {
    var coordinates = modifiedEntrant ? modifiedEntrant.coordinates : null,
        map = new google.maps.Map(document.querySelector('.js-map'), {
        	zoom: 2,
        	center: {
        		lat: coordinates && coordinates.length ? coordinates[1] : entrants[0].coordinates[1] - 20, 
        		lng: coordinates && coordinates.length ? coordinates[0] : entrants[0].coordinates[0] + 40
        	},
        	mapTypeControl: false
        }),
        marker;


    for (var i = 0; i < entrants.length; i++) {
    	marker = new google.maps.Marker({
    		title: entrants[i].name,
    		id: entrants[i].id,
    		votes: entrants[i].votes,
    		animation: (modifiedEntrant && modifiedEntrant.id === entrants[i].id) ? google.maps.Animation.DROP : null,
    		position: new google.maps.LatLng(entrants[i].coordinates[1], entrants[i].coordinates[0]),
    		icon: {
    			url: 'assets/flags/' + entrants[i].id + '.png',
			    scaledSize: new google.maps.Size(26.25, 17.25),
			    anchor: new google.maps.Point(5, -10),
			    labelOrigin: new google.maps.Point(32, -7)
			},
			label: {
				text: getVoteCount(entrants[i].id),
				fontSize: '16px',
				fontWeight: '700'
			},
			map: map
        });

    	(function(marker, i) {
    		google.maps.event.addListener(marker, 'click', function() {
    			var detailsDiv = document.querySelector('.js-details');
    			
                body.classList.add("is-overflow-hidden");
                detailsDiv.classList.add("show");
    			detailsDiv.dataset.entrant =  marker.id;
    			detailsDiv.dataset.votes =  entrants.find(function(entrant){
					return entrant.id === detailsDiv.dataset.entrant
				}).votes;

    			document.querySelector('.js-details-title').innerHTML = marker.title;
    			document.querySelector('.js-details-img').src = 'assets/big-flag/' + marker.id + '.jpg';
    		});
    	}(marker, i));
    }
}

(function(){

	var img = document.querySelector('.js-details-img'),
        detailsDiv = document.querySelector('.js-details'),
        detailsDivClose = document.querySelector('.js-details-close'),
        hammertime = new Hammer(img);

    detailsDivClose.addEventListener('click', function(e) {
        detailsDiv.classList.remove('show');
        body.classList.remove("is-overflow-hidden");
    });   

	hammertime.on('swipeleft', function(ev) {
		detailsDiv.dataset.votes--;
		closeDetails();
	});

	hammertime.on('swiperight', function(ev) {
		detailsDiv.dataset.votes++;
		closeDetails();
	});

	function closeDetails() {
		var modifiedEntrant = entrants.find(function(entrant){
			return entrant.id === detailsDiv.dataset.entrant
		});

		modifiedEntrant.votes = detailsDiv.dataset.votes;
		detailsDiv.classList.remove('show');
        body.classList.remove("is-overflow-hidden");

        //Initialising the map again to with newly modified Entrant
		initMap(modifiedEntrant);
	}
})()
