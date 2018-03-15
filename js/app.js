/**
 * @description Instatiate a new google map and add a group of markers
  */
function initMap(){
    map = createMap(MapLocation);
    markersList=setMarkers(map,PlacesList);
    showMarkers(map,markersList);
}
/**
 * @description Gather and display the extar information for a given location
 * @param {string} location
 */
function createInfoContent(location){
    let place=getPlace(location,PlacesList);
    foursquarePhotoRequest(place.foursquareID);
    wikipediaDataRequest(place.name);
}
/**
 * @description call the wikipidea API and search for and article 
 * about the give location. the reult is placed in a DOM element with 
 * the id "wikidata"
 * @param {string} location
 */
function wikipediaDataRequest(location){
    var wikiRequestTimeout = setTimeout(function(){
        $('#wikidata').append('<h4>Failed to get wikipedia resources</h4>');
    }, 5000);
    var wikiUrl = 'http://en.wikipedia.org/w/api.php?action=opensearch&search='+
        location +'&format=json&callback=wikiCallback';
    $.ajax({
        url:wikiUrl,
        dataType: "jsonp",
        async: true,
        success: function( response ) {
            var article = response[2][0];
            var articlelink = response[3][0];
            $('#wikidata').append('<p>'+article+' <a href="' + articlelink+'">Wikipedia</a></p>');
            clearTimeout(wikiRequestTimeout);
        }
    });
}
/**
 * @description call the Foursquare API and get the first photo for 
 * the give venue id. the reult is placed in a DOM element with 
 * the id "foursq-img"
 * @param {string} venueId
 */
function foursquarePhotoRequest(venueId){
    var FQUrl = 'https://api.foursquare.com/v2/venues/' + venueId +'/photos';
    $.ajax({
        url:FQUrl,
        dataType: "json",
        data: 'limit=1' +
         '&client_id='+ CLIENT_ID +
         '&client_secret='+ CLIENT_SECRET +
         '&v=20180301',
        async: true,
        success: function( response ) {
            var prefix = response.response.photos.items[0].prefix;
            var suffix = response.response.photos.items[0].suffix;
            $('#foursq-img').append('<img src="'+prefix+'200x150' + suffix+'">');
        },
        error: function (e) {
            $('#foursq-img').append('<h4>Foursquare data is unavailable.</h4>');
        }
    });
}

var ViewModel = function(){
    var self = this;
    this.filter = ko.observable("");
    this.places= ko.observableArray([]);
    PlacesList.forEach(function(place){
        self.places.push(new Place(place));
    });
    this.searchList = function(){
        var searchStr= self.filter().toUpperCase();
        self.places().forEach(function(place){
            if(place.name.toUpperCase().indexOf(searchStr) >-1){
                place.visible(true);
                showMarker(map,place.name, markersList);
            }else{
                place.visible(false);
                showMarker(null,place.name, markersList);
            }
        });
    };
    this.showInfo= function(place){
        if($('#places').width()>$('#content').width()){
            self.toggleMenuDisplay();
        }
        marker= getMarker(place.name,markersList);
        markerInteration(map,marker);
    };
    this.resetFilter = function(){
        self.filter("");
        self.searchList();
    };
    this.toggleMenuDisplay = function(){
        if ($('#places').hasClass('slide-menu-on')){
            $('#places').addClass('slide-menu-off');
            $('#places').removeClass('slide-menu-on');
            $('#content').addClass('content-full');
            $('#content').removeClass('content-divide');
        }else{
            $('#places').addClass('slide-menu-on');
            $('#places').removeClass('slide-menu-off');
            $('#content').addClass('content-divide');
            $('#content').removeClass('content-full');
        }
    };
};

ko.applyBindings(new ViewModel());
