
var MapLocation= {
    center: {lat: 40.7413549, lng: -73.99802439999996},
        zoom: 13
}

var PlacesList= [{name:'cool place',location:{lat: 40.719526, lng: -74.0089934},visible: true},
{name:'cool place 2',location:{lat: 40.729526, lng: -74.0099934},visible: true}];
var map= null;
var markers=[];

var Place =function(data){
    this.name= data.name;
    this.visible= ko.observable(data.visible);

}

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
