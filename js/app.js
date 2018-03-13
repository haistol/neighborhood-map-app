
var MapLocation= {
    center: {lat: 40.7413549, lng: -73.99802439999996},
        zoom: 13
}

var PlacesList= [{name:"cool place",location:{lat: 40.719526, lng: -74.0089934,visible: true}}];
var map= null;
var markers=[];
var Place =function(data){
    this.name= data.name;
    this.visible= ko.observable(data.visible);

}
function initMap(){
    map = new google.maps.Map(document.getElementById('map'),MapLocation);
    setMarkers(PlacesList);
    showMarkers(map);
}
function setMarkers(list){
    list.forEach(function(marker){
        var markerOptions = {
            position: marker.location,
            animation: google.maps.Animation.DROP,
            title: marker.name,
          };
        this.marker= new google.maps.Marker(markerOptions);
        this.marker.addListener('click', function(marker){
            return function(){
            markerInteration(marker);
            };
        }(this.marker));
        markers.push(this.marker);
    });
}
function showMarkers(map){
    markers.forEach(function(marker){
        marker.setMap(map);
    });
}
function getMarker(title){
    var searchStr= title.toUpperCase();
    var maker=null;
    markers.forEach(function(item){
        if(item.title.toUpperCase().indexOf(searchStr) >-1){
            maker= item;
        };
        
    });
    return maker;
}
function markerInteration(marker){
    markerAnimation(marker);
}
function markerAnimation(marker){
    marker.setAnimation(google.maps.Animation.BOUNCE);
    setTimeout(function(){
        marker.setAnimation(google.maps.Animation.NONE);
    },5000);
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
        markers.forEach(function(item){
            if(item.title.toUpperCase().indexOf(searchStr) >-1){
                console.log(self.filter());
                item.setMap(map);
            }else{
                item.setMap(null);
            };
        });
    };
    this.showInfo= function(place){
        if($('#places').width()>$('#content').width()){
            self.toggleMenuDisplay();
        }
        marker= getMarker(place.name);
        if(place.visible){
            marker.setMap(map);
            markerAnimation(marker);
            place.visible=false;
        }else{
            markerAnimation(marker);
            place.visible=true;
        }
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
