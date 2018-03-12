
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
function marketIneraction(marke,animation){
    marker.setAnimation(animation);
    setTimeout(function(){
        marker.setAnimation(google.maps.Animation.NONE);
    },5000);
}

var ViewModel = function(){
    var self = this;
    this.filter = ko.observable("");
    this.places= ko.observableArray([]);
    this.menu= true;
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
        marker= getMarker(place.name);
        if(place.visible){
            marker.setMap(map);
            marketIneraction(marker,google.maps.Animation.BOUNCE);
            place.visible=false;
        }else{
            marketIneraction(marker,google.maps.Animation.NONE);
            place.visible=true;
        }
    }
    this.toggleMenuDisplay = function(){
        if (self.menu){
            self.menu=false;
            document.getElementById("places").style.display="none";
            document.getElementById("places").style.width="0";
            document.getElementById("content").style.width = "100%";
        }else{
            self.menu=true;
            document.getElementById("places").style.display="block";
            document.getElementById("places").style.width = "80%";
            document.getElementById("content").style.width = "20%";
        }
    }
}
ko.applyBindings(new ViewModel());
