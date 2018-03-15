/* library with the functions to interact with google maps
API and the view related to the map */


/**
 * @description create a new google map obeject centered to a latitud and longitud
 * @param {object} mapLocation
 * @returns {google.maps.Map} Google map object center to a MapLocation coordinates 
 */
function createMap(mapLocation){
    return new google.maps.Map(document.getElementById('map'),mapLocation);
}
/**
 * @description Create array of Google map markers using a list of locations and
 * set a listener for a click event to each marker
 * @param {object} map
 * @param {array} list
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
/**
 * @description  place all markers from the give list in the map
 * @param {object} map
 * @param {array} markers
 */
function showMarkers(map,markers){
    markers.forEach(function(marker){
        marker.setMap(map);
    });
}
//TODO: remove this function
function clearMarkers(){
    showMarkers(null);
}
/**
 * @description Look for a marker in the list that have a title that match
 * the searching text
 * @param {string} title
 * @param {array} markers
 * @returns {object} The marker objects that match the search otherwise null
 */
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
/**
 * @description Look for a place in the list that have a title that match
 * the searching text
 * @param {string} name
 * @param {array} places
 * @returns {object} The place objects that match the search otherwise null
 */
function getPlace(name,places){
    var searchStr= name.toUpperCase();
    var place=null;
    places.forEach(function(item){
        if(item.name.toUpperCase()==searchStr){
            place= item;
        };
    });
    return place;
}
/**
 * @description set the map for the marker in the list that match the
 * title parameter
 * @param {object} map
 * @param {string} title
 * @param {array} markers
 */
function showMarker(map,title,markers){
    marker= getMarker(title,markers);
    if(marker){
        marker.setMap(map);
    };
}
/**
 * @description  add a visible reaction to the marker after a interaction
 * @param {object} map
 * @param {array} markers
 */
function markerInteration(map, marker){
    const contentStr='<h3 id="place-name">'+marker.title+'</h3><div id="foursq-img"></div><div id="wikidata"></div>';
    createInfoContent(marker.title);
    showInfoWindow(map, marker,contentStr);
    markerAnimation(marker);
}
/**
 * @description  Animate the marker for a period of time
 * @param {array} markers
 */
function markerAnimation(marker){
    marker.setAnimation(google.maps.Animation.BOUNCE);
    setTimeout(function(){
        marker.setAnimation(google.maps.Animation.NONE);
    },5000);
}
/**
 * @description  create and show a google map InfoWindow for the given marker 
 * using the contentStr parameter to set the info content
 * @param {object} map
 * @param {array} markers
 * @param {string} contentStr
 */
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
/**
 * @description Google map api error handler  
 */
function gm_authFailure() {
    alert("Somothing went worng with the map, please try later");
}
