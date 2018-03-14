function initMap(){
    map = createMap(MapLocation);
    markers=setMarkers(map,PlacesList);
    showMarkers(map,markers);
}
function createInfoContent(location){
    var content=location;
    wikipediaDataRequest(location);
    return content;
}
function wikipediaDataRequest(location){
    var data='';
    var wikiRequestTimeout = setTimeout(function(){
        data='failed to get wikipedia resources';
    }, 8000);
    var wikiUrl = 'http://en.wikipedia.org/w/api.php?action=opensearch&search='+
        location +'&format=json&callback=wikiCallback';
    $.ajax({
        url:wikiUrl,
        dataType: "jsonp",
        success: function( response ) {
            console.log(response);
            var article = response[2][0];
            var articlelink = response[3][0];
            $('#wikidata').append('<p>'+article+' <a href="' + articlelink+'">Wikipedia</a></p>');
        }
    });
    return data;
}
var ViewModel = function(){
    var self = this;
    this.filter = ko.observable("");
    this.places= ko.observableArray([]);
    PlacesList.forEach(function(place){
        self.places.push(new Place(place));
    })
    this.searchList = function(){
        var searchStr= self.filter().toUpperCase();
        self.places().forEach(function(place){
            if(place.name.toUpperCase().indexOf(searchStr) >-1){
                place.visible(true);
                showMarker(map,place.name, markers);
            }else{
                place.visible(false);
                showMarker(null,place.name, markers);
            };
        });
    };
    this.showInfo= function(place){
        if($('#places').width()>$('#content').width()){
            self.toggleMenuDisplay();
        }
        marker= getMarker(place.name,markers);
        markerInteration(map,marker);
    }
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
    }
}
ko.applyBindings(new ViewModel());
