
var MapLocation= {
    center: {lat: 40.7413549, lng: -73.99802439999996},
        zoom: 13
}
var ListMarkers= [{name:"cool place",location:{lat: 40.719526, lng: -74.0089934}}];
var MapViewModel = function(){

    map = new google.maps.Map(document.getElementById('map'),MapLocation);
    var markerOptions = {
        position: ListMarkers[0].location,
        animation: google.maps.Animation.DROP,
      };
  
    marker= new google.maps.Marker(markerOptions);
    marker.setMap(map);
}

var ViewModel = function(){
    var self = this;
}

ko.applyBindings(new ViewModel());
