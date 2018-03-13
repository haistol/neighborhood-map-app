/* library with the functions to interact with google maps
API and the view related to the map */

var infowindow=null;

/**
 * @description create a new google map obeject centered to a latitud and longitud
 * @param {object} mapLocation
 * @returns {google.maps.Map} Google map object center to a MapLocation coordinates 
 */
function createMap(mapLocation){
    return new google.maps.Map(document.getElementById('map'),mapLocation);
}
/**
 * @description Create array of Google map markers using a list of locations
 * @param {object} map
 * @param {object} list
 * @returns {array} Array with all the Google map marker objects 
 */
function setMarkers(map,list){
    var markers=[];
    list.forEach(function(marker){
        var markerOptions = {
            position: marker.location,
            animation: google.maps.Animation.DROP,
            title: marker.name,
          };
        this.marker= new google.maps.Marker(markerOptions);
        this.marker.addListener('click', function(marker){
            return function(){
            markerInteration(map,marker);
            };
        }(this.marker));
        markers.push(this.marker);
    });
    return markers;
}

function showMarkers(map,markers){
    markers.forEach(function(marker){
        marker.setMap(map);
    });
}

function clearMarkers(){
    showMarkers(null);
}
function getMarker(title,markers){
    var searchStr= title.toUpperCase();
    var marker=null;
    markers.forEach(function(item){
        if(item.title.toUpperCase()==searchStr){
            marker= item;
        };
    });
    return marker;
}
function showMarker(map,title,markers){
    marker= getMarker(title,markers);
    if(marker){
        marker.setMap(map);
    };
}

function markerInteration(map, marker){
    const contentStr='<div id="wikidata"></div>';
    var content=createInfoContent(marker.title);
    showInfoWindow(map, marker,contentStr);
    markerAnimation(marker);
}
function markerAnimation(marker){
    marker.setAnimation(google.maps.Animation.BOUNCE);
    setTimeout(function(){
        marker.setAnimation(google.maps.Animation.NONE);
    },5000);
}


function showInfoWindow(map,marker,contentStr){
    if(infowindow){
        infowindow.close();
    }
    infowindow = new google.maps.InfoWindow({
        maxWidth: 200,
        content: (contentStr)
      });
    infowindow.open(map, marker);
}


